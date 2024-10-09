import {login} from '../../service/userService.js'
import userNormalizer from '../../normalizer/userNormalizer.js';

export default async (req, res) => {
  try {
    const user = await login(req.body.email, req.body.password)
    res.status(200).json(userNormalizer(user))
  } catch(err) {
    res.status(err.status || 500)
      .json({message: err.message, code:err.code} )
  }
}