import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { useState } from 'react';

export function PaymentForm({ amount, currency, onSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);
    setError(null);

    try {
      const { error: submitError, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment-success`,
        },
        redirect: 'if_required',
      });

      if (submitError) {
        throw submitError;
      }

      if (paymentIntent.status === 'succeeded') {
        // Update exchange transaction
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/payment/confirm-exchange`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            paymentIntentId: paymentIntent.id,
            amount: amount,
            currency: currency
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to confirm exchange');
        }

        onSuccess && onSuccess(paymentIntent);
      }
    } catch (err) {
      console.error('Payment error:', err);
      setError(err.message);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      {error && (
        <div className="mt-4 text-red-500 text-sm">
          {error}
        </div>
      )}
      <button
        type="submit"
        disabled={!stripe || processing}
        className={`
          mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg
          hover:bg-blue-700 transition-colors
          ${(!stripe || processing) ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        {processing ? 'Processing...' : 'Pay Now'}
      </button>
    </form>
  );
}
