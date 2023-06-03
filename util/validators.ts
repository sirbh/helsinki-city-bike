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
  name: string()
    .required("name is required field")
    .test(
      "len",
      "name should be more than 3 characters",
      (val) => val.length >= 3
    ),
  address: string()
    .required("address is required field")
    .test(
      "len",
      "address should be more than 3 characters",
      (val) => val.length >= 3
    ),
  city: string()
    .required("city is required field")
    .test(
      "len",
      "city should be more than 3 characters",
      (val) => val.length >= 3
    ),
  operator: string()
    .required("operator is required field")
    .test(
      "len",
      "operator should be more than 3 characters",
      (val) => val.length >= 3
    ),
  capacity: number()
    .typeError("capacity should be a number")
    .integer("capacity should be a integer")
    .min(1, "capacity should be more than 0")
    .required("capacity is required field"),
  x: number().typeError("lat should be a number").required("lat is required"),
  y: number().typeError("long should be a number").required("long is required"),
});

export const stationRequestValidators = object({
  take: number().required("property take is required").positive().integer(),
  page: number().required("property page is required").integer().positive(),
  username: string().optional(),
});

export const stationsSearchValidator = object({
  query: string().required("property query is required"),
});

export const userValidator = object({
  name: string()
    .required()
    .test("len", "name must be more than 2 chars", (val) => val.length >= 3),
  username: string()
    .required()
    .test(
      "len",
      "username must be more than 2 chars",
      (val) => val.length >= 3
    ),
  password: string()
    .required("Please Enter your password")
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&]).{8,}$/,
      "Password Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
});

export const loginDetailsValidators = object({
  username: string().required("username is required"),
  password: string().required("password is required"),
});
