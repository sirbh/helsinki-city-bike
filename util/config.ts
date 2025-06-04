import * as dotenv from 'dotenv';

dotenv.config();

export const DATABASE_URL = process.env.DATABASE_URL;

export const PORT = process.env.PORT || 3000;
export const BASE_URL = process.env.BASE_URL;
