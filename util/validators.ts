import { object,number } from "yup";

export const jourenyRequestValidators = object({
    take:number().required('property take is required').positive().integer(),
    page:number().required('property page is required').integer().positive()
});
