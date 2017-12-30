import { Injectable } from '@angular/core';
import * as socketClient from 'socket.io-client';
import { environment } from '../../environments/environment';
import { Subject } from 'rx';
import { MessageModel } from '../../server/model/message';

@Injectable()
export class SocketService {

  private client: SocketIOClient.Socket;

  public newMessage: Subject<MessageModel> = new Subject();

  constructor() {
    this.client = socketClient.connect(environment.socketUrl);
  }

}
