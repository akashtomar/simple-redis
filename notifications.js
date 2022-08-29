const {createClient} = require('redis');

function Notification(){
    _self = this;
    _self.client = null;
    const establishConnection = async function(){
        try{
            _self.client = createClient({url: "redis://localhost:6379"});
            _self.client.on('connect', ()=>{
                console.log("*".repeat(10),"Event: Notification connect", "*".repeat(10));
            });
            await _self.client.connect();
        }catch(ex){
            _self.client=null;
            console.error("Error while connecting");
            console.error(ex.message);
        }
    }

    _self.subscribe = async function(channel, callback){
        if(_self.client){
            try{
                let sub = _self.client.duplicate();
                await sub.connect();
                let r = await sub.subscribe(channel, callback);
                console.log(`subscribed to ${channel}`);
                return r;
            }catch(ex){
                console.error("Error while creating subscriber");
                console.error(ex.message);
                return null;
            }
        }else{
            console.error("Couldn't return subscriber [no client]")
            return null;
        }
    }

    _self.publish = async function(channel, message){
        try{
            if(_self.client){
                let r = await _self.client.publish(channel, message);
                return r;
            }else{
                console.error("Couldn't publish message [no client]")
                return null;
            }
        }catch(ex){
            console.error("Error while publishing");
            console.error(ex.message);
            return null;
        }
    }
    establishConnection();   
}

module.exports = Notification;