import {test} from '@jest/globals';
import supertest from 'supertest';
import app from '../app';

const api = supertest(app);

test('if /ping respond with 200',async ()=>{
  await api.get('/ping')
           .expect(200)
           .expect('pong');
});