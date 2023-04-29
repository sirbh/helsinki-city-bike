import {Router} from 'express';
import {db} from '../../prisma';
import { ValidateJourneyRequest } from '../../middlewares';
import { jourenyRequestValidators } from '../../util/validators';

const journeyRouter = Router();

journeyRouter.get('/',ValidateJourneyRequest,(req,res)=>{
    
    const {take,page} = jourenyRequestValidators.cast(req.query);
    db.journeys.findMany({
        take:take,
        skip:take*(page-1)
    }).then(resp=>{
        return res.status(200).send(resp);
    }).catch(e=>{
        console.log(e);
        return res.status(400).send('something went wrong');
    });
    
});

export default journeyRouter;