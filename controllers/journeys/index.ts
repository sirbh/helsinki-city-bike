import {Router} from 'express';
import {db} from '../../prisma';
import { ValidateJourneyRequest } from '../../middlewares';
import { jourenyRequestValidators } from '../../util/validators';

const journeyRouter = Router();

journeyRouter.get('/',ValidateJourneyRequest,(req,res,next)=>{
    
    const {take,page} = jourenyRequestValidators.cast(req.query);
    db.journeys.findMany({
        take:take,
        skip:take*(page-1)
    }).then(resp=>{
        return res.status(200).send(resp);
    }).catch(e=>{
        next(e);
    });
    
});

export default journeyRouter;