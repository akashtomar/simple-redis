function checkBody(req, res, next){
    if(req.body){ next();}
    else{next({"status": 400, "message":"Missing req.body"});}
}

function handleError(err, req, res, next){
    res.status(err.status).json({"message": err.message});
}


module.exports = {checkBody, handleError};