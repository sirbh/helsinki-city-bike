import {test} from '@jest/globals';
import supertest from 'supertest';
import app from '../app';
import { db } from '../prisma';

const api = supertest(app);

beforeEach(async () => {
    await db.journeys.deleteMany();
    await db.journeys.create({
        data:{
            covered_distance:30,
            departure_station_id:12,
            departure_station_name:'Tampere',
            departure_time:new Date(),
            duration:30,
            return_station_id:21,
            return_station_name:'Helsinki',
            return_time:new Date(),
        }
    });
  });

test('if /api/journeys returns journey',async ()=>{
  await api.get('/api/journeys')
           .expect(200);
});