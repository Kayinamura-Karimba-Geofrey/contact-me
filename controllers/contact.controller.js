const Contact = require('../models/contact.model');
const { Parser } = require('json2csv');

// Get all contacts for the authenticated user
const getContacts = async (req, res) => {
  try {
    const { search, page = 1, limit = 10, sort = '-createdAt' } = req.query;
    
    const query = { user: req.user._id };
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (page - 1) * limit;
    
    const contacts = await Contact.find(query)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));
      
    const total = await Contact.countDocuments(query);

    res.json({
      contacts,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contacts' });
  }
};

// Get a single contact
const getContact = async (req, res) => {
  try {
    const contact = await Contact.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contact' });
  }
};

// Create a new contact
const createContact = async (req, res) => {
  try {
    const contact = new Contact({
      ...req.body,
      user: req.user._id
    });

    await contact.save();
    res.status(201).json(contact);
  } catch (error) {
    res.status(500).json({ message: 'Error creating contact' });
  }
};

// Update a contact
const updateContact = async (req, res) => {
  try {
    const contact = await Contact.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: 'Error updating contact' });
  }
};

// Delete a contact
const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.json({ message: 'Contact deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting contact' });
  }
};

// Toggle favorite status
const toggleFavorite = async (req, res) => {
  try {
    const contact = await Contact.findOne({ _id: req.params.id, user: req.user._id });
    
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    contact.isFavorite = !contact.isFavorite;
    await contact.save();

    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: 'Error toggling favorite' });
  }
};

// Upload contact image
const uploadImageToContact = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload an image' });
    }

    const contact = await Contact.findOne({ _id: req.params.id, user: req.user._id });
    
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    contact.profileImage = req.file.path;
    await contact.save();

    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: 'Error uploading image' });
  }
};

// Export contacts to CSV
const exportContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user._id });
    
    if (!contacts || contacts.length === 0) {
      return res.status(404).json({ message: 'No contacts found to export' });
    }

    const fields = ['name', 'email', 'phone', 'address', 'notes', 'isFavorite', 'createdAt'];
    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(contacts);

    res.header('Content-Type', 'text/csv');
    res.attachment('contacts.csv');
    return res.send(csv);
  } catch (error) {
    res.status(500).json({ message: 'Error exporting contacts' });
  }
};


module.exports = {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
  toggleFavorite,
  uploadImageToContact,
  exportContacts
};