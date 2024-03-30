import { Request, Response, Router } from 'express';
import UserModel from '../models/user';
import validate from '../utils/validate';

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

    const user = new UserModel({ email, password });
    await user.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

const login= async (req:Request, res: Response) =>{
    try {
        const {password, email } = req.body;
        UserModel.findOne({email, password})
        .then((result:any)=>{
            if(result == null){
                res.status(500).json({error:'Invalid email or password'});
            }
            else{
                res.status(200).json(result);
            }
        })
    }
    catch( err ){
        res.status(500).json({error: err});
    }
}

router.post('/create', registration);
router.post('/login', login);

export default router;
