const {retrieveActivity} = require('../service/activityService')

module.exports = async (req, res) => {
    const  activityId = req.params['id'];
    const activity = await retrieveActivity(activityId)
    
    if (activity) {
        res.status(200).json(activity)
    } else {
        res.status(404).json({ message: 'no activity found' });
    }
} 