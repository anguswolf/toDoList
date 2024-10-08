import {addActivity} from '../../service/activityService.js'

export default async (req,res) => {
    try {
        const result = await addActivity(req.body) // promise
        res.status(201).json(result);
    } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message})
    }
}


