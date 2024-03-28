import {Request, Response, Router} from 'express';
const UserModel = require('../models/user');

const router = Router();

const registration = async ( req:Request, res: Response) =>{
    try {
        const user = new UserModel(req.body);
        // todo check if there is a user with the same email.
        await user.save()
        .then((result:any)=>{
            console.log(result.json);
            res.status(200).json(result);
        })
        .catch((err: any)=>{
            console.log('could not post............');
            res.status(500).json({ error: `Something went wrong! ${err}` });
        });
        
    } catch (err) {
        console.log('something happended');
        console.error(err);
        res.status(500).json({ error: `Something went wrong! ${err}` });
    }
}

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
