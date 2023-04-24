import {test} from '@jest/globals';
import supertest from 'supertest';
import app from '../app';

const api = supertest(app);

test('if /api/info respond with 200',async ()=>{
  await api.get('/api/info')
           .expect(200);
});