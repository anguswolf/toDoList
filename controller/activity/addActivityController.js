import {addActivity} from '../../service/activityService.js'

export default async (req,res) => {
    try {
        const data = {...req.body, userId: req.userId};
        const result = await addActivity(data) // promise
        res.status(201).json(result);
    } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message})
    }
}


