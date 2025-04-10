import {listActivities} from '../../service/activityService.js'
import activityNormalizer,{list} from '../../normalizer/activityNormalizer.js';

export default async (req, res) => {
    try {
        const listUserActivities = await listActivities(req.userId);
        res.status(200).json(list(listUserActivities))
        
    } catch (error) {
        console.log(error)
    }
} 