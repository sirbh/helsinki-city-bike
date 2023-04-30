import { Router } from "express";
import { db } from "../../prisma";
import { ValidateJourneyRequest } from "../../middlewares";
import { jourenyRequestValidators } from "../../util/validators";

const journeyRouter = Router();

journeyRouter.get("/", ValidateJourneyRequest, (req, res, next) => {
  const { take, page, sortBy } = jourenyRequestValidators.cast({
    take:req.query.take,
    page:req.query.page,
    sortBy:{
        property:req.query.property,
        order:req.query.order
    }
  });
  const _sortBy:{[key:string]:string} = {};
  _sortBy[sortBy.property] = sortBy.order;
  db.journeys
    .findMany({
      take: take,
      skip: take * (page - 1),
      orderBy: _sortBy,
    })
    .then((resp) => {
      return res.status(200).send(resp);
    })
    .catch((e) => {
      next(e);
    });
});

export default journeyRouter;
