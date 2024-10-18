import jwtUtils from '../utils/cryptoUtils.js'
export default async (req, res, next) => {
  const authorizationHeader = req.headers.authorization;
  if (authorizationHeader) {
    const token = req.headers.authorization.split(' ')[1]; // Bearer <token>
    //console.log(req.headers.authorization);
    try{
      const jwtDecoded = jwtUtils.verifyJWT(token);
      if(!jwtDecoded) {
        res.status(401).send('Authentication error. Invalid token.');
      }
      req.userId = jwtDecoded.subject;
      next();
    } catch(e) {
      res.status(401).send('Authentication error. Invalid token.' + e.message);
    }
  } else {
    res.status(401).send('Authentication error. Token required.');
  }
}