import * as express from 'express';
import { MessageRoutes } from './message';
import { Message } from '../model/message';
import * as sinon from 'sinon';
import * as bodyParser from 'body-parser';
import supertest = require('supertest');
import { SocketService } from '../socket/socket';

describe('MessageRoutes', () => {
  let app: express.Application, request: supertest.SuperTest<supertest.Test>, route;

  const mockMessages = [
    { author: 'Test', content: 'Test1' },
    { author: 'Test2', content: 'Test3' },
  ];

  const mockMessage = {
    author: 'Test', content: 'Test1', votes: 1
  };

  const mockParticipants = [
    'Test1',
    'Test2',
    'Test3',
  ];

  beforeAll(() => {
    app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
      extended: true
    }));
    sinon.stub(Message, 'retrieve').resolves(mockMessages);
    sinon.stub(Message, 'create').resolves(mockMessage);
    sinon.stub(Message, 'update').resolves(mockMessage);
    sinon.stub(Message, 'delete').resolves({ text: 'deleted'});
    sinon.stub(Message, 'retrieveById').callsFake(id => {
      if (id === '1') {
        return new Promise(res => res(mockMessage));
      }
      return new Promise(res => res(null));
    });
    sinon.stub(SocketService.prototype, 'getUsers').returns(mockParticipants);
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

  it('throws error when creating if author or content is missing', async done => {
    request
    .post('/api/message')
    .send({ author: 'Test' })
    .expect(400, done);
  });

  it('deletes one message', async done => {
    request
    .delete('/api/message/1')
    .expect(200, (err, res) => {
      expect(res.body).toEqual({ text: 'deleted'});
      done();
    });
  });

  it('throws error when deleting if no message was found', async done => {
    request
    .delete('/api/message/0')
    .expect(400, done);
  });

  it('update one message', async done => {
    request
    .put('/api/message/1')
    .send(mockMessage)
    .expect(200, (err, res) => {
      expect(res.body).toEqual(mockMessage);
      done();
    });
  });

  it('returns the participants', async done => {
    request
    .get('/api/participants')
    .expect(200, (err, res) => {
      expect(res.body).toEqual(mockParticipants);
      done();
    });
  });
})
