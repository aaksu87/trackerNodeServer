const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middlewares/requireAuth');
const Track = mongoose.model('Track');

const router = express.Router();

router.use(requireAuth);

router.get('/tracks', async (req,res) => {
    const tracks = await Track.find({userId: req.user._id});

    res.send(tracks);
    
});

router.post('/tracks', async (req,res) => {
    
    const { name, locations} = req.body;

    if(!name || !locations){
        return res.status(422).send({error: "must name locations"});
    }
    try{
        const track = new Track({name, locations, userId: req.user._id});

        await track.save();

        res.send(track);
    }catch(err){
        return res.status(422).send({error:err.message});
    }
    
});
/*
router.post('/signin', async (req,res) => {
    const {email,password} = req.body;

    if(!email || !password){
        return res.status(422).send({error: "must email pass"});
    }

    const user = await User.findOne({email});

    if(!user){
        return res.status(404).send({error: "no user"});
    }

    try{
        await user.comparePassword(password);
        
        const token = jwt.sign({userId:user._id}, 'mykey');

        res.send({token});
    }catch(err){
        return res.status(422).send({error:"invalid email & password"});
    }
    
});*/


module.exports = router;