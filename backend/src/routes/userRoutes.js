import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { getProfile, updateProfile } from '../controllers/userController.js';

const router = express.Router();

// Comment out the global protect middleware
// router.use(protect);

// Add protection to specific routes if needed
router.route('/profile')
  .get(getProfile)  // Remove protect if you want to test without authentication
  .put(updateProfile);

export default router;
