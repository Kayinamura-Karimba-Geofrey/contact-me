const express = require('express');
const router = express.Router();
const { 
  getContacts, 
  getContact, 
  createContact, 
  updateContact, 
  deleteContact 
} = require('../controllers/contact.controller');
const auth = require('../middleware/auth.middleware');
const { validateContact } = require('../middleware/validation.middleware');

// Get all contacts for the authenticated user
router.get('/', auth, getContacts);

// Get a single contact
router.get('/:id', auth, getContact);

// Create a new contact
router.post('/', auth, validateContact, createContact);

// Update a contact
router.put('/:id', auth, validateContact, updateContact);

// Delete a contact
router.delete('/:id', auth, deleteContact);

module.exports = router; 