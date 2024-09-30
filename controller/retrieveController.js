module.exports = async (req, res) => {
    const  activityId = req.params['id'];
    const activity = await getActivity(activityId)
    if(activity) {
    res.status(200).json(activity)
    } else {
    res.status(404).json({message:'no activity found'});
    }	
} 