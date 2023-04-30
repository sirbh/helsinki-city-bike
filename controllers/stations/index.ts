import { Router } from "express";
import { db } from "../../prisma";
import { ValidateStationsRequest } from "../../middlewares";
import { stationRequestValidators } from "../../util/validators";

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
      console.log(resp);
      return res.status(200).send(resp);
    })
    .catch((e) => {
      next(e);
    });
});

export default stationsRouter;
