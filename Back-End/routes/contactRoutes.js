const express = require('express');
const { sendContactEmail, getAllContacts } = require('../controllers/contactController');

const router = express.Router();

router.post('/send-email', sendContactEmail);
router.get('/all', getAllContacts);

module.exports = router;