import {addActivity} from '../../service/activityService.js'
import activityNormalizer from '../../normalizer/activityNormalizer.js';

export default async (req,res) => {
    try {
        const data = {...req.body, userId: req.userId};
        const result = await addActivity(data) // promise
        res.status(201).json(activityNormalizer(result));
    } catch (error) {
        console.log(error.message + " - Response Status: " + error.status);
        res.status(500).json({message: error.message})
    }
}


