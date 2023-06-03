import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import {
  addStationValidators,
  jourenyRequestValidators,
  loginDetailsValidators,
  stationRequestValidators,
  stationsSearchValidator,
  userValidator,
} from "../util/validators";
import jwt from "jsonwebtoken";
import { db } from "../prisma";

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
      username:req.query.username
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
    .validate(req.body)
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
  userValidator
    .validate(req.body)
    .then((_result) => {
      next();
    })
    .catch((error) => {
      next(error);
    });
};

export const ValidateLoginRequest = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  loginDetailsValidators
    .validate(req.body)
    .then((_result) => {
      next();
    })
    .catch((error) => {
      next(error);
    });
};

export const ErrorHandler: ErrorRequestHandler = (error, _req, _res, _next) => {
  if (
    error.type === "required" ||
    error.type === "min" ||
    error.type === "typeError" ||
    error.type === "integer"
  ) {
    return _res.status(403).send(error.errors[0]);
  } else if (
    error.type === "matches" ||
    error.type === "len" ||
    error.type === "optionality"
  ) {
    return _res.status(403).send(error.message);
  } else if (error.code === "P2002") {
    return _res.status(403).send("username already exits");
  }
  return _res.status(400).send("server could not handle the request");
};

export const TokenExtractor = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.get("Authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    const decodedToken = jwt.verify(
      authorization.replace("Bearer ", ""),
      process.env.SECRET || "secret"
    ) as { username: string; id: string };


    db.users
      .findFirst({
        where: {
          username: decodedToken.username,
        },
      })
      .then((data) => {
        if (data) {
          req.params.username = data.username;
          req.params.userid = data.id.toString();
          next();
        } else {
          return res.status(401).send("invalid credentials");
        }
      })
      .catch((err) => {
        next(err);
      });
  } else {
    next();
  }
};
