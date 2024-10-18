import activityNormalizer from '../../normalizer/activityNormalizer.js';
import {removeActivity} from '../../service/activityService.js'

export default async (req, res) => {
    try {
        const activityId = req.params['id'];
        const activity = await removeActivity(activityId)
        res.status(200).json(activityNormalizer(activity))
    } catch (error) {
        console.log(error.message + " - Response Status: " + error.status);
        res.status(error.status || 500).json({ message: error.message })
    }
}