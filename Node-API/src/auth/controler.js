const jwt = require('./JWTconf');

exports.verifyToken = (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    console.log(token);
    if (!token) {
        return res.status(403).send('No token provided');
    }

    if(jwt.controllerToken(token))
    {
        // console.log("Token is valid");
        res.status(200).send("token valid");
    }
    else
    {
        // console.log("Token is invalid");
        res.status(401).send('Failed to authenticate token');
    }
}