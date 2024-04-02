const jwt = require('jsonwebtoken');


const secretKey = "shhhhh"
// Options for the token (optional)
const options = {
    expiresIn: '1h' // Token expiration time
};
////-----------------------------------------------

exports.createToken = (payload) => {
  return jwt.sign(payload, secretKey, options);
}


exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(403).send('No token provided');
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).send('Failed to authenticate token');
    }

    // Token is valid, attach the decoded payload to the request object
    req.decoded = decoded;
    next();
  });
}


exports.controllerToken = (token) => {
  
  if (!token) {
    return false;
  }
  resultat = false;
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      console.log(err);
      resultat = false;

    }
    console.log("decoded : ");
    console.log(decoded);
    resultat = true;

  });
  return resultat;
}