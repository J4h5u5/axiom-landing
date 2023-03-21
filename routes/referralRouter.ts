const express = require('express');
const referralController = require('./../controllers/referralController');

export const referralRouter = express.Router();

referralRouter
  .route('/')
  .get(referralController.getAllReferrals)
//   .post(referralController.createReferral);

// referralRouter
//   .route('/:id')
//   .get(referralController.getReferralsById);

