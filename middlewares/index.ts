import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { jourenyRequestValidators } from "../util/validators";


export const ValidateJourneyRequest = (req:Request,_res:Response,next:NextFunction) => {
    jourenyRequestValidators.validate({
        take:req.query.take,
        page:req.query.page
    }).then(_result=>{
        next();
    }).catch(err=>{
        next(err);
    });
};

export const ErrorHandler:ErrorRequestHandler = (error,_req,_res,_next)=>{
   if(error.type==='optionality'){
    return _res.status(400).send(error.message);
   }
   return _res.status(400).send('Bad Request');
};