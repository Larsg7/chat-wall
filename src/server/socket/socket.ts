import Socket = require('socket.io');
import { createServer, Server } from 'http';
import * as express from 'express';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { MessageModel } from '../model/message';
const debug = require('debug')('chat:socket');

interface SocketName {
  name: string;
  socket: SocketIO.Socket;
}

export class SocketService {
  private static instance: SocketService;
  private io: SocketIO.Server;
  private server: Server;

  private sockets: SocketName[] = [];

  private userEntered = new Subject();
  private userLeft = new Subject();
  private activeConnections = new BehaviorSubject(0);

  public newMessage = new Subject<MessageModel>();
  public updatedMessage = new Subject<MessageModel>();

  private constructor() {
    this.server = createServer(express());
    this.io = Socket(this.server);
    this.setup();
  }

  static getInstance(): SocketService {
    if (this.instance) {
      return this.instance;
    }
    return this.instance = new SocketService();
  }

  static removeInstance() {
    this.instance = null;
  }

  public disconnect() {
    return new Promise((res) => {
      this.activeConnections.next(0);
      this.server.close(res);
    });
  }

  public connect() {
    const port = process.env.SOCKET_PORT || 3100;
    return new Promise((res) => {
      if (this.server.listening) {
        res();
      }
      this.server.listen(port, () => {
        debug('Socket connected to port %d', port);
        res();
      });
    });
  }

  public get numConnections(): number {
    return Object.keys(this.io.sockets.connected).length;
  }

  public getUsers(): string[] {
    return this.sockets.map(s => s.name);
  }

  private setup(): void {
    this.io.on('connect', socket => {
      debug('Client connected');

      socket.on('user name', userName => {
        if (!this.sockets.find(s => s.socket === socket)) {
          this.sockets.push({
            name: userName,
            socket: socket
          });
          this.userEntered.next(userName);
        }
      });
      this.activeConnections.next(this.activeConnections.getValue() + 1);

      socket.on('disconnect', () => {
        debug('Client disconnected');
        const index = this.sockets.findIndex(s => s.socket === socket);
        if (index > -1) {
          this.userLeft.next(this.sockets[index].name);
          this.sockets.splice(index, 1);
        }
        this.activeConnections.next(this.activeConnections.getValue() - 1);
      });
    });

    this.newMessage.subscribe(message => {
      debug('new message %o', message);
      this.io.emit('new message', message);
    });

    this.updatedMessage.subscribe(message => {
      debug('updated message %o', message);
      this.io.emit('updated message', message);
    });

    this.activeConnections.subscribe(connections => {
      debug('active users %d', connections);
      this.io.emit('active users', connections);
    });

    this.userEntered.subscribe(user => {
      debug('user %s entered', user);
      this.io.emit('new user', user);
    });

    this.userLeft.subscribe(user => {
      debug('user %s left', user);
      this.io.emit('user left', user);
    });
  }
}
