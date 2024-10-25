import activityNormalizer from '../../normalizer/activityNormalizer.js';
import {completeActivity} from '../../service/activityService.js'

export default async (req, res) => {
    try {
        const activity = completeActivity(req.params['id'], req.userId)
        
        res.status(404).json({message: 'Activity not found', code: 200100})    
    } catch (error) {
        console.log(error.message + " - Response Status: " + error.status);
        res.status(error.status || 500).json({ message: error.message })
    }
}