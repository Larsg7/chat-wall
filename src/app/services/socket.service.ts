import { Injectable } from '@angular/core';
import * as socketClient from 'socket.io-client';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs/Subject';
import { MessageModel } from '../../server/model/message';
import { Message } from '../models/message';
import { UserService } from './user.service';

@Injectable()
export class SocketService {

  private client: SocketIOClient.Socket;

  public newMessage = new Subject<Message>();
  public participantEntered = new Subject<string>();
  public participantLeft = new Subject<string>();

  constructor(private userService: UserService) {
    this.client = socketClient.connect(environment.socketUrl);
    this.setup();
  }

  private setup() {
    this.client.on('new message', message => {
      this.newMessage.next(Message.fromApi(message));
    });

    this.client.on('new user', user => {
      this.participantEntered.next(user);
    });

    this.client.on('user left', user => {
      this.participantLeft.next(user);
    });

    this.userService.user.subscribe(user => {
      if (user) {
        this.client.emit('user name', user);
      }
    });
  }

}
