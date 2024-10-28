import {retrieveActivities, retrieveActivity} from '../../service/activityService.js'
import activityNormalizer from '../../normalizer/activityNormalizer.js';

export default async (req, res) => {
    const activities = await retrieveActivities();
    //console.log(activities)
    if (activities) {
        res.status(200).json(activities)
    } else {
        res.status(404).json({ message: 'no activity found' });
    }
} 