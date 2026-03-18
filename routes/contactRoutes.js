const express = require('express');
const router = express.Router();

router.route('/')
  .get((req, res) => {
    res.status(200).json({
      message: 'Contacts API is working'
    });
  })
  .post((req, res) => {
    res.status(200).json({
      message: 'create API is working'
    });
  });

router.route('/:id')
  .put((req, res) => {
    res.status(200).json({
      message: `update API is working for ${req.params.id}`
    });
  })
  .delete((req, res) => {
    res.status(200).json({
      message: `delete API is working for ${req.params.id}`
    });
  });

module.exports = router;
