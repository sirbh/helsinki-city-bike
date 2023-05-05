import { RequestHandler, Router } from "express";
import { db } from "../../prisma";
import { ValidateJourneyRequest } from "../../middlewares";
import { jourenyRequestValidators } from "../../util/validators";

const journeyRouter = Router();

journeyRouter.get("/", ValidateJourneyRequest, (async (req, res, next) => {
  const { take, page, sortBy, filterBy } = jourenyRequestValidators.cast({
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
  });

  const _sortBy: { [key: string]: string } = {};
  const _where: { [key: string]: number } = {};

  _sortBy[sortBy.property] = sortBy.order;

  if (filterBy) {
    _where[filterBy.property] = filterBy.id;
  }

  try {
    const journeyDetails = await db.$transaction([
      db.journeys.findMany({
        take: take,
        skip: take * (page - 1),
        orderBy: [_sortBy, { id: "asc" }],
        where: _where,
      }),
      db.journeys.count({
        where: _where,
      }),
    ]);


    res.status(200).send({
      count: journeyDetails[1],
      details: journeyDetails[0],
    });
  } catch (e) {
    next(e);
  }
}) as RequestHandler);

export default journeyRouter;
