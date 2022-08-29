const router = require('express').Router();
const {checkBody} = require('./middleware');
const RedisClient = require('./redis_client');
const Notification = require('./notifications');
const redis = new RedisClient();
const notifier = new Notification();


router.post('/set', checkBody, async (req, res)=>{
    await redis.setValue(req.body.key, req.body.value);
    res.json({"message": "Success"});
});

router.post('/get', checkBody, async (req, res)=>{
    let value = await redis.getValue(req.body.key);
    res.json({"message": `Value is ${value}`});
});

router.post('/subscribe', checkBody, async (req, res)=>{
    let value = await notifier.subscribe(req.body.channel, (message)=>{
        console.log("inside subscribed method");
        console.log(message);
    });
    res.json({"message": `subscribed to ${req.body.channel}`});
});

router.post('/publish', checkBody, async (req, res)=>{
    let value = await notifier.publish(req.body.channel, req.body.message);
    console.log(value);
    res.json({"message": `published to ${req.body.channel}`});    
});


module.exports = router;