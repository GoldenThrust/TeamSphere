const User = require('../models/User');

exports.register = async (req, res) => {
  try {
    const errors = validate(req.body);
    if (errors) return res.status(400).json({ errors });

    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already exists' });

    const user = new User({ email, password });
    await user.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};
