/**
 * Validates user input for the registration form.
 */

import { body } from 'express-validator'

export const validate = [
	body('fname')
    .trim()
    .notEmpty().withMessage('First name required')
    .isLength({ max: 50 }).withMessage('First name cannot be longer than 50 chars'),

  body('lname')
    .trim()
    .notEmpty().withMessage('Last name required')
    .isLength({ max: 50 }).withMessage('Last name cannot be longer than 50 chars'),

  body('address')
    .trim()
    .notEmpty().withMessage('Address required')
    .isLength({ max: 50 }).withMessage('Address cannot be longer than 50 chars'),

  body('city')
    .trim()
    .notEmpty().withMessage('City required')
    .isLength({ max: 30 }).withMessage('City cannot be longer than 30 chars'),

  body('zip')
		.customSanitizer(value => value.replace(/\s+/g, ''))
    .notEmpty().withMessage('ZIP code required')
		.isPostalCode('SE').withMessage('Invalid ZIP code')
		.toInt(),

  body('phone')
    .optional()
    .trim()
    .isMobilePhone().withMessage('Invalid phone number')
    .isLength({ max: 15 }).withMessage('Phone number cannot be longer than 15 chars'),

  body('email')
    .trim()
    .notEmpty().withMessage('Email required')
    .isEmail().withMessage('Invalid email address')
    .isLength({ max: 40 }).withMessage('Email cannot be longer than 40 chars')
    .normalizeEmail(),

  body('password')
    .notEmpty().withMessage('Password required')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
    .isLength({ max: 200 }).withMessage('Password cannot be longer than 200 chars'),
]