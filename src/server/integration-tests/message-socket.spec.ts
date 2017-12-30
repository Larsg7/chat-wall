import * as bodyParser from 'body-parser';
import * as sinon from 'sinon';
import express = require('express');
import supertest = require('supertest');
import { Message } from '../model/message';
import { MessageRoutes } from '../routes/message';
import { SocketService } from '../socket/socket';
import io = require('socket.io-client');

process.env.SOCKET_PORT = 5100;
const url = 'http://localhost:' + process.env.SOCKET_PORT;
const options = {
  forceNew: true,
};

describe('Test MessageRoute, SocketService integration', () => {
  let app: express.Application, request: supertest.SuperTest<supertest.Test>, route;
  let server: SocketService;
  let clients: SocketIOClient.Socket[] = [];

  const mockMessages = [];

  const mockMessage = {
    author: 'Test', content: 'Test1', votes: 1
  };

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
    route = new MessageRoutes.create(app);
    request = supertest(app);
  });

  beforeEach(done => {
    clients = [];
    server = SocketService.getInstance();
    server.connect().then(done);
  });

  afterEach(done => {
    clients.forEach(c => c.disconnect());
    setTimeout(() => {
      server.disconnect().then(() => {
        // SocketService.removeInstance();
        done();
      });
    }, 100);
  });

  it ('should notify on message creation', done => {
    clients.push(io.connect(url, options));

    clients[0].on('connect', () => {
      clients[0].on('new message', message => {
        expect(message).toEqual(mockMessage);
        done();
      });
      request
      .post('/api/message')
      .send(mockMessage)
      .expect(200, (err, res) => {
      });
    });
  });

  it ('should notify on message update', done => {
    clients.push(io.connect(url, options));

    clients[0].on('connect', () => {
      clients[0].on('updated message', message => {
        expect(message).toEqual(mockMessage);
        done();
      });
      request
      .put('/api/message/1')
      .send(mockMessage)
      .expect(200, (err, res) => {
      });
    });
  });
})
