import {retrieveActivity} from '../../service/activityService.js'
import activityNormalizer from '../../normalizer/activityNormalizer.js';

export default async (req, res) => {
    console.log(req.params['id']);
    const  activityId = req.params['id'];

        
        const activity = await retrieveActivity(activityId)
        if (activity) {
            const ifNoneMatch = req.headers['if-none-match'];
            const eTag = activity.updatedAt.toUTCString(); // Esempio: usa il campo `updatedAt` per l'ETag
            if (ifNoneMatch === eTag) {
                res.status(304).end(); // Risorsa non modificata (chached)
                return;
            }
            res.set({
                "Cache-Control": "max-age=3600", // Memorizza per 1 ora
                "ETag": eTag,               // Identificatore univoco della risorsa
                "Last-Modified": eTag, // Ultima modifica
            });
            console.log(activity.updatedAt.toUTCString());


            
            res.status(200).json(activityNormalizer(activity))
        } else {
            res.status(404).json({ message: 'no activity found' });
        }
} 