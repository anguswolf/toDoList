import {retrieveActivity} from '../../service/activityService.js'
import activityNormalizer from '../../normalizer/activityNormalizer.js';

export default async (req, res) => {
    console.log(req.params['id']);
    const  activityId = req.params['id'];
    const activity = await retrieveActivity(activityId)

    const eTag = activity.updatedAt.toUTCString(); // Esempio: usa il campo `updatedAt` per l'ETag
    const ifNoneMatch = req.headers['if-none-match'];

    if (ifNoneMatch === eTag) {
        res.status(304).end(); // Risorsa non modificata
        return;
    }

    
    if (activity) {
        res.set({
            "Cache-Control": "max-age=3600", // Memorizza per 1 ora
            "ETag": eTag,               // Identificatore univoco della risorsa
            "Last-Modified": activity.updatedAt.toUTCString(), // Ultima modifica
        });
        res.status(200).json(activityNormalizer(activity))
    } else {
        res.status(404).json({ message: 'no activity found' });
    }
} 