import { Router } from "express";
import { db } from "../../prisma";
import { ValidateJourneyRequest } from "../../middlewares";
import { jourenyRequestValidators } from "../../util/validators";

const journeyRouter = Router();

journeyRouter.get("/", ValidateJourneyRequest, (req, res, next) => {

  const { take, page, sortBy,filterBy } = jourenyRequestValidators.cast({
    take:req.query.take,
    page:req.query.page,
    sortBy:{
        property:req.query.sort_prop,
        order:req.query.order
    },
    filterBy: req.query.id
    ? {
        property: req.query.filter_prop,
        id: req.query.id,
      }
    : undefined,
  });

  const _sortBy:{[key:string]:string} = {};
  const _where:{[key:string]:number}= {};

  _sortBy[sortBy.property] = sortBy.order;

  if(filterBy){
    _where[filterBy.property]=filterBy.id;
  }

  db.journeys
    .findMany({
      take: take,
      skip: take * (page - 1),
      orderBy: _sortBy,
      where:_where
    })
    .then((resp) => {
      return res.status(200).send(resp);
    })
    .catch((e) => {
      next(e);
    });
});

export default journeyRouter;
