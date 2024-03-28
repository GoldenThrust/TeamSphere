const express = require('express');
const router = express.Router();
const UserModel = require('../models/user');


const registration = (req, res)=>{
    const user = new UserModel(req.body);
    user.save()
    .then((result)=>{
        res.status(200).json(result);
    })
    .catch((err)=>{
        console.log(err)
        res.status(500).json({error:'Something went wrong! `${err}`'})
    })
}

router.post('/create', registration);

module.exports = router;