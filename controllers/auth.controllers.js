const { validationResult, Result } = require('express-validator');
const authService = require('../services/auth.service');
const {signUpSchema, signInSchema} = require('../schemas/auth');

exports.signUp = async (req, res) => {
  try {
    // Validate request data using express-validator
    await Promise.all(signUpSchema.map(validationRule => validationRule.run(req)));

    // Use validationResult after ensuring all validation promises are resolved
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation Failed',
        errors: errors.array(),
      });
    }

    // If validation passes, proceed with signUp logic
    const result = await authService.signUp(req.body);

    res.status(201).json(result);
  } catch ({status, message}) {

    // Handle other errors, such as errors from authService.signUp
    res.status(status | 500).json({
      message: message | 'error',
      errors:'Internal Server Error',
    });
  }
};


exports.signIn = async (req, res) => {
  try {
    // Validate request data using express-validator
    await Promise.all(signInSchema.map(validationRule => validationRule.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.array(),
      });
    }

    const result= await authService.signIn(req.body);
    res.status(200).json(result);


  } catch (err) {
    res.status(500).json({
      message: 'Internal Server Error',
      errors: err,
    });
  }
};