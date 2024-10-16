import {register} from '../../service/userService.js'
import userNormalizer from '../../normalizer/userNormalizer.js';

export default async (req,res) => {
    try {
        const user = await register(req.body)
        res.status(201).json(userNormalizer(user));
    } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message})
    }
}


