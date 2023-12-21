const express = require('express');
const router = express.Router();
const { signUp, signIn, logout } = require('../controllers/auth.controllers');

router.get('/sign-up', (req, res) => {
  res.render('pages/sign-up');
});

router.post('/sign-up', signUp);

router.get('/sign-in', (req, res) => {
  res.render('pages/sign-in',{errors: error}); 
});

router.post('/sign-in', signIn);
router.post('/logout', logout)

module.exports = router;

