import { SocketService } from './socket';
import io = require('socket.io-client');
import * as sinon from 'sinon';
import { MessageModel } from '../model/message';
import { setTimeout } from 'timers';

process.env.SOCKET_PORT = 5000;
const url = 'http://localhost:' + process.env.SOCKET_PORT;
const options = {
  forceNew: true,
};

describe('Socket', () => {
  let server: SocketService;
  let clients: SocketIOClient.Socket[] = [];

  const mockMessage: MessageModel = <MessageModel>{
    author: 'Test',
    content: 'TestContent',
    votes: 1,
    flagged: 1
  };

  beforeAll(() => {
  });

  afterAll(() => {
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

  it('should connect', done => {
    expect(server.numConnections).toBe(0);
    clients.push(io.connect(url, options));
    clients[0].on('connect', data => {
      expect(server.numConnections).toBe(1);
      done();
    });
  });

  it('should broadcast new message', done => {
    clients.push(io.connect(url, options));
    clients[0].on('connect', data => {
      clients[0].on('new message', message => {
        expect(message).toEqual(mockMessage);
        done();
      });
      server.newMessage.next(mockMessage);
    });
  });

  it('should broadcast updated message', done => {
    clients.push(io.connect(url, options));
    clients[0].on('connect', data => {
      clients[0].on('updated message', message => {
        expect(message).toEqual(mockMessage);
        done();
      });
      server.updatedMessage.next(mockMessage);
    });
  });

  it('should broadcast active users', done => {
    clients.push(io.connect(url, options));
    let numClients = 1;
    clients[0].on('connect', data => {
      clients[0].on('active users', users => {
        expect(users).toEqual(numClients);
        if (numClients === 2) {
          done();
        }
        numClients++;
        clients.push(io.connect(url, options));
      });
    });
  });

  it('should broadcast new user names', done => {
    clients.push(io.connect(url, options));
    const names = ['Test1', 'Test2'];
    clients[0].on('connect', data => {
      clients[0].on('new user', name => {
        expect(name).toEqual(names[0]);
        done();
      });
      clients[0].emit('user name', names[0]);
    });
  });

  it('should broadcast names of leaving users', done => {
    clients.push(io.connect(url, options));
    const names = ['Test1', 'Test2'];
    clients[0].on('connect', data => {
      clients[0].on('user left', name => {
        expect(name).toEqual(names[1]);
        done();
      });
      clients[0].emit('user name', names[0]);
      const client = io.connect(url, options);
      client.on('connect', () => {
        client.emit('user name', names[1]);
        client.disconnect();
      });
    });
  });
});
