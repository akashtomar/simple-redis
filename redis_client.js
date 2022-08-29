const {createClient} = require('redis');

function RedisClient(){
    _self = this;
    _self.client = null;
    const establishConnection = async function(){
        try{
            _self.client = createClient({url: "redis://localhost:6379"});
            _self.client.on('connect', ()=>{
                console.log("*".repeat(10),"Event: redis_client connect", "*".repeat(10));
            });
            await _self.client.connect();
        }catch(ex){
            _self.client=null;
            console.error("Error while connecting");
            console.error(ex.message);
        }
    }

    _self.setValue = async function(key, value){
        if(_self.client){
            console.log('inside client check setValue');
            return await _self.client.set(key, value);
        }else{
            return null;
        }
    }

    _self.getValue = async function(key){
        if(_self.client){
            return await _self.client.get(key);
        }else{
            return null;
        }
    }

    _self.disconnect = async function(){
        if(_self.client){
            await _self.client.disconnect();
        }
    }

    establishConnection();

}

module.exports = RedisClient;