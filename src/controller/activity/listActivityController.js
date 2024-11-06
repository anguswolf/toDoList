import {listActivities} from '../../service/activityService.js'
import activityNormalizer from '../../normalizer/activityNormalizer.js';

export default async (req, res) => {
    console.log("listUserActivities")
    const listUserActivities = await listActivities();
    res.status(200).json([])
} 