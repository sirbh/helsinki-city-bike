import axios from "axios";
import { AuthDetails, LoginAPIResponse, User } from "../../types";
import { NewUserResponse } from "../stations";

export const createUser = async (newUser: User) => {
    const { data } = await axios.post<NewUserResponse>(
      '/api/auth/register',
      newUser
    );
    return data;
  };
  
  export const login = async (authDetails: AuthDetails) => {
    const { data } = await axios.post<LoginAPIResponse>(
      '/api/auth/login',
      authDetails
    );
    return data;
  };