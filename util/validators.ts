import { object, number, mixed } from "yup";

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
});
