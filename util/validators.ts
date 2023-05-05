import { object, number, mixed, string } from "yup";

export const jourenyRequestValidators = object({
  take: number().required("property take is required").positive().integer(),
  page: number().required("property page is required").integer().positive(),
  sortBy: object({
    property: mixed<
      | "duration"
      | "covered_distance"
      | "departure_station_name"
      | "return_station_name"
    >()
      .oneOf([
        "duration",
        "covered_distance",
        "departure_station_name",
        "return_station_name",
      ])
      .required()
      .default("departure_station_name"),
    order: mixed<"asc" | "desc">()
      .oneOf(["asc", "desc"])
      .required()
      .default("asc"),
  }).required(),
  filterBy: object({
    property: mixed<"departure_station_id" | "return_station_id">()
      .oneOf(["departure_station_id", "return_station_id"])
      .required()
      .default("departure_station_id"),
    id: number().required().integer().positive(),
  }).default(undefined),
});

export const addStationValidators = object({
  name:string().required('name is required is field').test('len', 'should be more than 3 characters', (val) => val.length > 3),
  address:string().required('address is required field').test('len', 'should be more than 3 characters', (val) => val.length > 3),
  city:string().required('city is required field').test('len', 'should be more than 3 characters', (val) => val.length > 3),
  operator:string().required('operator is required field').test('len', 'should be more than 3 characters', (val) => val.length > 3),
  capacity:number().integer().min(1,"should more than 0").required('capacity is required field'),
  x:number().required('lat is required'),
  y:number().required('long is required')
});

export const stationRequestValidators = object({
  take: number().required("property take is required").positive().integer(),
  page: number().required("property page is required").integer().positive(),
});

export const stationsSearchValidator = object({
   query:string().required("property query is required")
});
