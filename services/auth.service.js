const bcrypt= require('bcrypt')
const User= require('../database/models/users.model.js')
const { generateAuthToken } = require('../utils');

const authService = {
  signUp: async (userData) => {
    try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(userData.password, 10);

      // Create a new user
      const newUser = await User.create({
        ...userData,
        password: hashedPassword,
      });

      // Generate a JWT token for authentication
      const token = generateAuthToken(newUser.userId, newUser.role);

      return {
        status: 'success',
        user: newUser,
        token,
      };
    } catch (err) {
      throw {
        status: 'error',
        message: 'Unable to create user. Try again later',
      };
    }
  },
  signIn: async (userData) => {
    try {
      const { email, password } = userData;

      // Check if the user with the provided email exists
      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw {
          status: 'fail',
          message: 'Invalid email or password.',
        };
      }

      // Check if the password is correct
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw {
          status: 'fail',
          message: 'Invalid email or password.',
        };
      }

      // Generate a JWT token for authentication
      const token = generateAuthToken(user.userId, user.role);

      return {
        status: 'success',
        user,
        token,
      };
    }catch (error) {
      console.error('Error creating user:', error.message); 
      throw {
        status: 'error',
        message: 'Invalid email or password',
      };
    }
  },
};

module.exports = authService;