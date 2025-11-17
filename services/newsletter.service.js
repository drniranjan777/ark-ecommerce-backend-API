const Newsletter = require('../models/newsletter');
const AppError = require('../utils/AppError');
const transporter = require('../config/mailer')

// Check if email already exists
const checkEmail = async (email) => {
  const emailExists = await Newsletter.findOne({ email })

  if (emailExists) throw new AppError('Email already subscribed', 409)

  return;
};

// Create newsletter subscription
const createNewsletter = async (req) => {
  const { email } = req.body;

  if (!email) throw new AppError('Email is required', 400)

  await checkEmail(email)

  const newSubscriber = await Newsletter.create({ email })

  return newSubscriber;
};

// Get newsletter subscriptions (with pagination)
const getNewsletters = async (req) => {
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  const skip = (page - 1) * limit

  const totalSubscribers = await Newsletter.countDocuments()

  const subscribers = await Newsletter.find().skip(skip).limit(limit).lean()

  const totalPages = Math.ceil(totalSubscribers / limit)

  return {
    subscribers,
    totalPages,
    currentPage: page,
    totalSubscribers,
  };
};

// Get newsletter subscriber by ID
const getNewsletterById = async (req) => {
  const { subscriberId } = req.params

  const subscriber = await Newsletter.findById(subscriberId)

  if (!subscriber) throw new AppError('Subscriber not found', 404)

  return subscriber
};

// Update subscriber email
const updateNewsletter = async (req) => {
  const { subscriberId } = req.params;
  const { email } = req.body;

  if (!email) throw new AppError('Email is required', 400);

  await checkEmail(email)

  const updatedSubscriber = await Newsletter.findByIdAndUpdate(
    subscriberId,
    { $set: { email } },
    { new: true }
  );

  if (!updatedSubscriber) throw new AppError('Subscriber not found', 404)

  return updatedSubscriber
}

// Delete subscriber
const deleteNewsletter = async (req) => {
  const { subscriberId } = req.params

  const deletedSubscriber = await Newsletter.findByIdAndDelete(subscriberId)

  if (!deletedSubscriber) throw new AppError('Subscriber not found', 404)

  return deletedSubscriber
}


// Send newsletter
const sendNewsletter = async (req) => {
  const {subject, message} = req.body

    const subscribers = await Newsletter.find({}, { email: 1, _id: 0 });
    const emails = subscribers.map(sub => sub.email);

    if (!emails.length) throw new AppError('No subscribers to send newsletter', 404);

    await transporter.sendMail({
        from: `"Your Company" <${process.env.EMAIL_USER}>`,
        to: emails.join(','),
        subject,
        html: message
    });

    return 
};

module.exports = {
  createNewsletter,
  getNewsletters,
  getNewsletterById,
  updateNewsletter,
  deleteNewsletter,
  sendNewsletter
};
