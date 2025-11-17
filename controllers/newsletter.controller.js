const { NewsletterService } = require('../services/index');
const catchAsync = require('../utils/catchAsync');

// Create newsletter subscription
const createNewsletter = catchAsync(async (req, res) => {
  const result = await NewsletterService.createNewsletter(req);

  return res.status(201).json({
    status: true,
    message: 'Subscribed to newsletter successfully',
    data: result,
  });
});

// Get all newsletter subscribers
const getNewsletters = catchAsync(async (req, res) => {
  const result = await NewsletterService.getNewsletters(req);

  return res.status(200).json({
    status: true,
    message: 'Subscribers fetched successfully',
    data: result,
  });
});

// Get subscriber by ID
const getNewsletterById = catchAsync(async (req, res) => {
  const result = await NewsletterService.getNewsletterById(req);

  return res.status(200).json({
    status: true,
    message: 'Subscriber fetched successfully',
    data: result,
  });
});

// Update subscriber email
const updateNewsletter = catchAsync(async (req, res) => {
  const result = await NewsletterService.updateNewsletter(req);

  return res.status(200).json({
    status: true,
    message: 'Subscriber updated successfully',
    data: result,
  });
});

// Delete subscriber
const deleteNewsletter = catchAsync(async (req, res) => {
  const result = await NewsletterService.deleteNewsletter(req);

  return res.status(200).json({
    status: true,
    message: 'Subscriber deleted successfully',
    data: result,
  });
});

const sendNewsletter = catchAsync(async (req, res) => {
    const result = await NewsletterService.sendNewsletter(req);
    res.status(200).json({
        status: true,
        message: 'Newsletter sent successfull',
    });
});

module.exports = {
  createNewsletter,
  getNewsletters,
  getNewsletterById,
  updateNewsletter,
  deleteNewsletter,
  sendNewsletter
};
