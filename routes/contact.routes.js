const express = require('express');
const router = express.Router();
const { 
  getContacts, 
  getContact, 
  createContact, 
  updateContact, 
  deleteContact,
  toggleFavorite,
  uploadImageToContact,
  exportContacts
} = require('../controllers/contact.controller');
const auth = require('../middleware/auth.middleware');
const upload = require('../middleware/upload.middleware');
const { validateContact } = require('../middleware/validation.middleware');

// Get all contacts for the authenticated user
router.get('/', auth, getContacts);

// Export contacts to CSV
router.get('/export', auth, exportContacts);

// Get a single contact
router.get('/:id', auth, getContact);

// Create a new contact
router.post('/', auth, validateContact, createContact);

// Update a contact
router.put('/:id', auth, validateContact, updateContact);

// Toggle favorite status
router.patch('/:id/favorite', auth, toggleFavorite);

// Upload profile image
router.post('/:id/upload', auth, upload.single('image'), uploadImageToContact);

// Delete a contact
router.delete('/:id', auth, deleteContact);

module.exports = router; 