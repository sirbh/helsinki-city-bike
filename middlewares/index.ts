import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import {
  addStationValidators,
  jourenyRequestValidators,
  loginDetailsValidators,
  stationRequestValidators,
  stationsSearchValidator,
  userValidator,
} from "../util/validators";

export const ValidateJourneyRequest = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  jourenyRequestValidators
    .validate({
      take: req.query.take,
      page: req.query.page,
      sortBy: {
        property: req.query.sort_prop,
        order: req.query.order,
      },
      filterBy: req.query.id
        ? {
            property: req.query.filter_prop,
            id: req.query.id,
          }
        : undefined,
    })
    .then((_result) => {
      next();
    })
    .catch((err) => {
      next(err);
    });
};

export const ValidateStationsRequest = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  stationRequestValidators
    .validate({
      take: req.query.take,
      page: req.query.page,
    })
    .then((_result) => {
      next();
    })
    .catch((err) => {
      next(err);
    });
};

export const VlidateStationSearchRequest = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  stationsSearchValidator
    .validate({
      query: req.query.query,
    })
    .then((_result) => {
      next();
    })
    .catch((err) => {
      next(err);
    });
};

export const ValidateStationAddRequest = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  addStationValidators
    .validate(req.query)
    .then((_result) => {
      next();
    })
    .catch((err) => {
      next(err);
    });
};

export const ValidateCreateUserRequest = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  userValidator.validate(req.body).then((_result) => {
    next();
  }).catch(error=>{
    next(error);
  });
};

export const ValidateLoginRequest = (
  req: Request,
  _res: Response,
  next: NextFunction
)=>{
  loginDetailsValidators.validate(req.body).then(_result=>{
    next();
  }).catch(error=>{
    next(error);
  });
};

export const ErrorHandler: ErrorRequestHandler = (error, _req, _res, _next) => {
  console.log(error.type);
  if (error.type === "optionality") {
    return _res.status(403).send(error.message);
  }
  else if(error.type === "matches") {
    return _res.status(403).send(error.message);
  }
  else if(error.type === "len") {
    return _res.status(403).send(error.message);
  }
  else if(error.code === "P2002") {
    return _res.status(403).send("username must be unique");
  }
  return _res.status(400).send("server could not handle the request");
};


