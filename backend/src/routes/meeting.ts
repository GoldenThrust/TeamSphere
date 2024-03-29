import {Request, Response, Router} from 'express';
const {WebsocketServer} =require( 'ws');

const Meeting = require('../models/meeting');
const router = Router();
const sockserver = new WebsocketServer({ port: 443 })

const create = async(req: Request, res: Response)=>{
    try{
        const meeting = new Meeting(req.body);
        await meeting.save()
        .then((result: any)=>{
            console.log('meeting created');
            res.status(200).json(result);
        })
        .catch((err: any)=>{
            console.log(`Error on creating a meething ${err}`);
            res.status(500).json({error: `Error on creating a meething ${err}`});
        });
    }catch(err){
        console.log(`Error on creating a meething ${err}`);
        res.status(500).json({error: `Error on creating a meething ${err}`});
    }
}

const join = async (req: Request, res: Response)=>{
    try{
        
    }
    catch(err){

    }
}


// create a meeting
router.post('/create', create);
// join a meeting
router.get('/join', join);

export default router;