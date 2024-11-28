import express from 'express';
import Stripe from 'stripe';
import { pool } from '../database/db';

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Route for getting wallet balances - no auth required temporarily
router.get('/balances', async (req, res) => {
    try {
        // Get all wallets for testing
        const [wallets] = await pool.execute(
            `SELECT currency, balance FROM wallets`
        );

        res.json(wallets);
    } catch (error) {
        console.error('Error fetching wallet balances:', error);
        res.status(500).json({ error: 'Failed to fetch wallet balances' });
    }
});

// Route for creating payment intent - no auth required temporarily
router.post('/fund', async (req, res) => {
    try {
        const { amount, currency } = req.body;
        
        console.log('Wallet funding request:', { amount, currency });

        if (!amount || !currency) {
            return res.status(400).json({
                error: 'Missing required fields',
                required: ['amount', 'currency']
            });
        }

        // Create payment intent with Stripe
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount),
            currency: currency.toLowerCase(),
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
        res.status(500).json({ 
            error: 'Failed to process payment intent',
            details: error.message 
        });
    }
});

export default router;
