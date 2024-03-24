const jwt = require('jsonwebtoken');
require('dotenv').config();

const tokenKey = process.env.TOKEN_SECRET;

function authenticator(req, res, next) {
  const token = req.headers.authorization;
  if(!token) return res.status(401).send({message:"Missing Token",status:0})
  jwt.verify(token,tokenKey,(err,decode)=>{
    if(err) return res.status(401).send({message:"Invalid Token",status:0})
    if(decode){
      req.users = decode;
      next()
    } else{
      res.send({message:"Unauthorize Token",status:2}) //if status is 2 we compare that we have to login
    }
  })
}
module.exports = authenticator; 