import {confirmRegistration} from '../../service/userService.js'

export default async (req, res) => {
    const  userId = req.params['id'];
    const  registrationToken = req.params['registrationToken'];
    const  registeredUser = await confirmRegistration(userId,registrationToken)
    
    if (registeredUser) {
        res.status(200).json(registeredUser)
    } else {
        res.status(404).json({ message: 'no user found' });
    }
} 