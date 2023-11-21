const {body}= require('express-validator')

const signUpSchema = [
  body('firstName').notEmpty().withMessage('First name is required'),
  body('lastName').notEmpty().withMessage('Last name is required'),
  body('dateOfBirth').notEmpty().withMessage('Date of birth is required'),
  body('email').isEmail().withMessage('Invalid email').notEmpty().withMessage('Email is required'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters').notEmpty().withMessage('Password is required'),
  body('role').notEmpty().withMessage('Role is required'),
];

const signInSchema = [
    body('email').isEmail().withMessage('Invalid email').notEmpty().withMessage('Email is required'),
    body('password').notEmpty().withMessage('Password is required'),
  ];

module.exports={
  signUpSchema,
  signInSchema
};  