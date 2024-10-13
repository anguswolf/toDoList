import {retrieveActivity} from '../../service/activityService.js'

export default async (req, res) => {
    console.log(req.params['id']);
    const  activityId = req.params['id'];
    const activity = await retrieveActivity(activityId)
    
    if (activity) {
        res.status(200).json(activity)
    } else {
        res.status(404).json({ message: 'no activity found' });
    }
} 