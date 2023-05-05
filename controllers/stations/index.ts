import { RequestHandler, Router } from "express";
import { db } from "../../prisma";
import {
  ValidateStationAddRequest,
  ValidateStationsRequest,
  VlidateStationSearchRequest,
} from "../../middlewares";
import {
  addStationValidators,
  stationRequestValidators,
  stationsSearchValidator,
} from "../../util/validators";


const stationsRouter = Router();

stationsRouter.get("/", ValidateStationsRequest, (async (req, res, next) => {
  const { take, page } = stationRequestValidators.cast({
    take: req.query.take,
    page: req.query.page,
  });

  try {
    const stationDetails = await db.$transaction([
      db.stations.findMany({
        take: take,
        skip: take * (page - 1),
        select: {
          id: true,
          name: true,
        },
      }),
      db.stations.count({}),
    ]);

    res.status(200).send({
      count: stationDetails[1],
      details: stationDetails[0],
    });
  } catch (e) {
    next(e);
  }

}) as RequestHandler);




stationsRouter.get("/search", VlidateStationSearchRequest, (req, res, next) => {
  const { query } = stationsSearchValidator.cast({
    query: req.query.query,
  });

  db.stations
    .findMany({
      where: {
        name: {
          startsWith: query,
          mode: "insensitive",
        },
      },
      take: 5,
      select: {
        id: true,
        name: true,
      },
    })
    .then((resp) => {
      return res.status(200).send(resp);
    })
    .catch((e) => {
      next(e);
    });
});

stationsRouter.get("/:id", (async (req, res, next) => {
 
  const id = req.params.id;
  const station_id = parseInt(id);
  if(!station_id){
     return res.status(403).send('invalid id');
  }

  try {
    const stationDetails = await db.$transaction([
      db.stations.findFirst({
        where:{
          id:station_id
        },
      }),
      db.journeys.count({
        where:{
          departure_station_id:station_id
        }
      }),
      db.journeys.count({
        where:{
          return_station_id:station_id
        }
      }),
      db.journeys.aggregate({
        _avg:{
          covered_distance:true
        },
        where:{
          departure_station_id:station_id
        }
      }),
      db.journeys.aggregate({
        _avg:{
          covered_distance:true
        },
        where:{
          return_station_id:station_id
        }
      }),
      db.journeys.groupBy({
        by: ["departure_station_id", "departure_station_name"],
        _count: {
          return_station_id: true,
        },
        where: {
          return_station_id: station_id,
        },
        orderBy: {
          _count: {
            return_station_id: "desc",
          },
        },
        take: 5,
      }),
      db.journeys.groupBy({
        by: ["return_station_id", "return_station_name"],
        _count: {
          departure_station_id: true,
        },
        where: {
          departure_station_id: station_id,
        },
        orderBy: {
          _count: {
            departure_station_id: "desc",
          },
        },
        take: 5,
      })
    ]);

    res.status(200).send({
     details:stationDetails[0],
     total_departures:stationDetails[1],
     total_return:stationDetails[2],
     avg_departure_distance:stationDetails[3]._avg.covered_distance,
     avg_return_distance:stationDetails[4]._avg.covered_distance,
     popular_departure_stations:stationDetails[5],
     popular_return_station:stationDetails[6]
    });
  } catch (e) {
    next(e);
  }

}) as RequestHandler);

stationsRouter.post('/',ValidateStationAddRequest,(req,res,next)=>{
   const stationDetails = addStationValidators.cast(req.query);
   db.stations.create({
    data:stationDetails
   }).then(resp=>{
     res.status(200).send(resp);
   }).catch(err=>{
     next(err);
   });
});

export default stationsRouter;
