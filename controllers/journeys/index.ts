import {Router} from 'express';
import {db} from '../../prisma';

const journeyRouter = Router();

journeyRouter.get('/',(req,res)=>{
    db.journeys.findMany().then(resp=>{
        console.log(resp);
        return res.status(200).send(resp);
    }).catch(e=>{
        console.log(e);
        return res.status(400).send('something went wrong');
    });
    
});

export default journeyRouter;