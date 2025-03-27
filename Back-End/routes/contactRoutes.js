const express = require('express');
const { 
  sendContactEmail, 
  getAllContacts,
  updateResolutionStatus,
  getContactById
} = require('../controllers/contactController');

const router = express.Router();

router.post('/send-email', sendContactEmail);
router.get('/all', getAllContacts);
router.get('/:id', getContactById);
router.patch('/:id/resolve', updateResolutionStatus);

module.exports = router;