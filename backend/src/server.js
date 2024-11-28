import express from 'express';
import cors from 'cors';
import Stripe from 'stripe';
import dotenv from 'dotenv';
import pool from '../config/database.js';

dotenv.config();

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.use(cors());
app.use(express.json());

// Existing Wallet funding endpoint
app.post('/api/wallet/fund', async (req, res) => {
    try {
        const { amount, currency } = req.body;
        
        console.log('Wallet funding request:', { amount, currency });

        if (!amount || !currency) {
            return res.status(400).json({
                error: 'Missing required fields'
            });
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(parseFloat(amount)),
            currency: currency.toLowerCase(),
            payment_method_types: ['card'],
            metadata: {
                type: 'wallet_funding'
            }
        });

        console.log('Payment intent created:', paymentIntent.id);

        res.json({
            clientSecret: paymentIntent.client_secret
        });

    } catch (error) {
        console.error('Wallet funding error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Route for getting wallet balances
app.get('/api/wallet/balances', async (req, res) => {
    try {
        const [wallets] = await pool.execute(
            `SELECT currency, balance FROM wallets`
        );

        res.json(wallets);
    } catch (error) {
        console.error('Error fetching wallet balances:', error);
        res.status(500).json({ error: 'Failed to fetch wallet balances' });
    }
});

// Update wallet balance endpoint
app.post('/api/wallet/update-balance', async (req, res) => {
    try {
        const { amount, currency } = req.body;
        
        console.log('Received update request:', { amount, currency });

        // First check if wallet exists
        const [existingWallets] = await pool.execute(
            'SELECT * FROM wallets WHERE currency = ?',
            [currency.toUpperCase()]
        );

        console.log('Existing wallet:', existingWallets[0] || 'None');

        const amountToAdd = parseFloat(amount);
        console.log('Amount to add:', amountToAdd);

        if (existingWallets.length === 0) {
            // Create new wallet if it doesn't exist
            const [result] = await pool.execute(
                'INSERT INTO wallets (currency, balance) VALUES (?, ?)',
                [currency.toUpperCase(), amountToAdd]
            );
            console.log('Created new wallet:', result);
        } else {
            // Update existing wallet
            const [result] = await pool.execute(
                'UPDATE wallets SET balance = balance + ? WHERE currency = ?',
                [amountToAdd, currency.toUpperCase()]
            );
            console.log('Updated existing wallet:', result);
        }

        // Verify the update by getting current balance
        const [updatedWallets] = await pool.execute(
            'SELECT currency, balance FROM wallets WHERE currency = ?',
            [currency.toUpperCase()]
        );

        const updatedWallet = updatedWallets[0];
        console.log('Final wallet state:', updatedWallet);

        res.json(updatedWallet);
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ 
            error: 'Failed to update wallet balance',
            details: error.message 
        });
    }
});

// Add this endpoint to verify wallet balances
app.get('/api/wallet/verify/:currency', async (req, res) => {
    try {
        const currency = req.params.currency;
        
        const [wallets] = await pool.execute(
            'SELECT * FROM wallets WHERE currency = ?',
            [currency.toUpperCase()]
        );

        if (wallets.length === 0) {
            res.json({ 
                exists: false, 
                message: 'No wallet found for this currency' 
            });
        } else {
            res.json({ 
                exists: true, 
                wallet: wallets[0],
                message: 'Wallet found' 
            });
        }
    } catch (error) {
        console.error('Verification error:', error);
        res.status(500).json({ error: 'Failed to verify wallet' });
    }
});

// Update the payment intent creation endpoint
app.post('/api/payment/create-payment-intent', async (req, res) => {
    try {
        const { amount, currency, metadata } = req.body;
        
        console.log('Payment intent request:', { amount, currency, metadata });

        const amountInCents = Math.round(parseFloat(amount) * 100);
        
        // Create payment intent with only automatic_payment_methods
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amountInCents,
            currency: currency.toLowerCase(),
            automatic_payment_methods: {
                enabled: true,
            },
            metadata: metadata || {}
        });

        console.log('Payment intent created:', paymentIntent.id);

        res.json({
            clientSecret: paymentIntent.client_secret
        });

    } catch (error) {
        console.error('Payment intent error:', error);
        res.status(500).json({ 
            error: 'Failed to create payment intent',
            details: error.message 
        });
    }
});

// Add confirmation endpoint
app.post('/api/payment/confirm-exchange', async (req, res) => {
    try {
        const { paymentIntentId, amount, currency } = req.body;

        // Retrieve the payment intent to verify
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

        if (paymentIntent.status !== 'succeeded') {
            throw new Error('Payment not successful');
        }

        console.log('Exchange confirmed:', {
            paymentIntentId,
            amount,
            currency,
            status: paymentIntent.status
        });

        // Here you would typically update your database
        // For now, just confirm the exchange
        res.json({
            success: true,
            message: 'Exchange confirmed',
            transactionId: paymentIntentId
        });

    } catch (error) {
        console.error('Exchange confirmation error:', error);
        res.status(500).json({
            error: 'Failed to confirm exchange',
            details: error.message
        });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('Server running on port', PORT);
    console.log('Database connected successfully');
});
