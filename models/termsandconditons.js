const mongoose = require('mongoose');

const termsAndConditionsSchema = new mongoose.Schema(
  {
    termsAndConditions: {
      type: String,
      required: true,
      trim: true
    }
  },
  { timestamps: true }
);

const TermsAndConditions = mongoose.model('TermsAndConditions', termsAndConditionsSchema);

module.exports = TermsAndConditions;
