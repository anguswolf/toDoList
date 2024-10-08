import {confirmRegistration} from '../service/userService.js'

export default async (req, res) => {
    const  userId = req.params['id'];
    const  userToken = req.params['registrationToken'];
    const user = await confirmRegistration(userId,userToken)
    
    if (user) {
        res.status(200).json(user)
    } else {
        res.status(404).json({ message: 'no user found' });
    }
} 