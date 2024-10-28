import activityNormalizer from '../../normalizer/activityNormalizer.js';
import {archiveActivity} from '../../service/activityService.js'

export default async (req, res) => {
    try {
        const activity = await archiveActivity(req.params['id'], req.userId)
        if (activity) {
            res.status(200).json(activityNormalizer(activity))       
        }else {
         res.status(404).json({message: 'Activity not found', code: 200100}) 
        }    
    } catch (error) {
        console.log(error.message + " - Response Status: " + error.status);
        res.status(error.status || 500).json({ message: error.message })
    }
}