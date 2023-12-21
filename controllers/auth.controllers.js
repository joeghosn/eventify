const { validationResult} = require('express-validator');
const authService = require('../services/auth.service');
const {signUpSchema, signInSchema} = require('../schemas/auth');
const catchAsync = require('../utils/catchAsync');

exports.signUp = catchAsync( async (req, res) => {

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
    res.cookie('token', result.token, {
      httpOnly: true,
    })

    res.redirect('/api/v1/events')
});


exports.signIn = catchAsync(async (req, res) => {
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
    res.cookie('token', result.token, {
      httpOnly: true,
    })
    res.redirect('/api/v1/events')
});

exports.logout = catchAsync(async (req, res) => {

  //Clear cookie from the browser
  res.clearCookie('token').redirect('/api/v1/auth/sign-in');
});
