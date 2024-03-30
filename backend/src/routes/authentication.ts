import { Request, Response, Router } from 'express';
import UserModel from '../models/user';
import validate from '../utils/validate';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = Router();

const registration = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
  
      // Validate email and password
      const errors = validate(req.body);
      if (errors) return res.status(400).json({ errors });
  
      // Check if there is a user with the same email
      const existingUser = await UserModel.findOne({ email });
      if (existingUser) return res.status(400).json({ message: 'Email already exists' });
  
      // Hash the password before saving it to the database
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const user = new UserModel({ email, password: hashedPassword });
      await user.save();
  
      res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: 'Server error' });
    }
};

const login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
  
      // Validate email and password
      const errors = validate(req.body);
      if (errors) return res.status(400).json({ errors });
  
      // Find user by email
      const user = await UserModel.findOne({ email });
      if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  
      // Compare passwords
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });
  
      // Generate JWT
      const token = jwt.sign({ id: user._id }, 'your-secret-key');
  
      res.status(200).json({ message: 'Login successful', token });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: 'Server error' });
    }
};

router.post('/create', registration);
router.post('/login', login);

export default router;
