import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { jourenyRequestValidators } from "../util/validators";



export const ValidateJourneyRequest = (req:Request,_res:Response,next:NextFunction) => {
    jourenyRequestValidators.validate({
        take:req.query.take,
        page:req.query.page,
        sortBy:{
            property:req.query.property,
            order:req.query.order
        }
    }).then(_result=>{
        console.log(_result);
        next();
    }).catch(err=>{
        console.log(err);
        next(err);
    });
};

export const ErrorHandler:ErrorRequestHandler = (error,_req,_res,_next)=>{
   if(error.type==='optionality'){
    return _res.status(403).send(error.message);
   }
   return _res.status(400).send('server could not handle the request');
};