import { Router } from "express";
import { db } from "../../prisma";
import { ValidateStationsRequest, VlidateStationSearchRequest } from "../../middlewares";
import { stationRequestValidators, stationsSearchValidator } from "../../util/validators";

const stationsRouter = Router();

stationsRouter.get("/", ValidateStationsRequest, (req, res, next) => {
  const { take, page } = stationRequestValidators.cast({
    take: req.query.take,
    page: req.query.page,
  });

  db.stations
    .findMany({
      take: take,
      skip: take * (page - 1),
    })
    .then((resp) => {
      return res.status(200).send(resp);
    })
    .catch((e) => {
      next(e);
    });
});

stationsRouter.get("/search",VlidateStationSearchRequest,(req, res, next) => {
  const {query} = stationsSearchValidator.cast({
    query:req.query.query
  });

  db.stations
    .findMany({
      where:{
        name:{
          startsWith:query,
          mode:'insensitive'
        }
      },
      take:5
    })
    .then((resp) => {
      return res.status(200).send(resp);
    })
    .catch((e) => {
      next(e);
    });
});

export default stationsRouter;
