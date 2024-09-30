module.exports = async (req, res) => {
    const  activityId = req.params['id'];
    const activity = await deleteActivityFromFile2(activityId)
    if(activity) {
    res.status(200).json(activity)
    } else {
    res.status(500).json({message:'server error'})
    }
}