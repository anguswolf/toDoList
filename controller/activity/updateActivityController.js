import {updateActivity} from '../../service/activityService.js'

export default async (req, res) => {
    const  activityId = req.params['id'];
    const activity = await updateActivity(activityId, req.body)
    
    if (activity) {
        res.status(200).json(activity)
    } else {
        res.status(404).json({ message: 'no activity found' })
    }
}