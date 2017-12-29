import * as express from 'express';
import { MessageRoutes } from './message';
import { Message } from '../model/message';
import * as sinon from 'sinon';
import * as bodyParser from 'body-parser';
import supertest = require('supertest');

describe('MessageRoutes', () => {
  let app: express.Application, request: supertest.SuperTest<supertest.Test>, route;

  const mockMessages = [
    { author: 'Test', content: 'Test1' },
    { author: 'Test2', content: 'Test3' },
  ];

  const mockMessage = {
    author: 'Test', content: 'Test1'
  };

  beforeAll(() => {
    app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
      extended: true
    }));
    sinon.stub(Message, 'retrieve').returns(mockMessages);
    sinon.stub(Message, 'create').returns(mockMessage);
    route = new MessageRoutes.create(app);
    request = supertest(app);
  });

  it('get all messages', async done => {
    request
    .get('/api/message')
    .expect(200, (err, res) => {
      expect(res.body).toEqual(mockMessages);
      done();
    });
  });

  it('create one message', async done => {
    request
    .post('/api/message')
    .send(mockMessage)
    .expect(200, (err, res) => {
      expect(res.body).toEqual(mockMessage);
      done();
    });
  });
})
