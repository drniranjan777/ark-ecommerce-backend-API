// middlewares/validate.js

module.exports = (schema, source = 'body') => {
  return (req, res, next) => {
    const { error } = schema.validate(req[source], { abortEarly: false });

    if (error) {
      const messages = error.details.map(err => err.message);
      return res.status(400).json({ message: messages[0] });
    }

    next();
  };
};
