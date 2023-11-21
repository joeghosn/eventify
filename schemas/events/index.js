const {body}= require('express-validator')

const createEventSchema = [
    body('name').notEmpty().withMessage('Event name is required'),
    body('description').notEmpty().withMessage('Event description is required'),
    body('city').notEmpty().withMessage('City is required'),
    body('street').notEmpty().withMessage('Street is required'),
    body('building').notEmpty().withMessage('Building is required'),
    body('seats').optional().isInt({ min: 0 }).withMessage('Seats must be a positive integer'),
    body('minimumAge').notEmpty().isInt({ min: 0 }).withMessage('Minimum age must be a non-negative integer'),
    body('dressCode').optional(),
    body('price').notEmpty().isFloat({ min: 0 }).withMessage('Price must be a non-negative number'),
  ];

  const updateEventSchema = [
    body('name').optional(),
    body('description').optional(),
    body('city').optional(),
    body('street').optional(),
    body('building').optional(),
    body('seats').optional().isInt({ min: 0 }).withMessage('Seats must be a positive integer'),
    body('minimumAge').optional().isInt({ min: 0 }).withMessage('Minimum age must be a non-negative integer'),
    body('dressCode').optional(),
    body('price').optional().isFloat({ min: 0 }).withMessage('Price must be a non-negative number'),
  ];

module.exports= {
  createEventSchema,
  updateEventSchema
};