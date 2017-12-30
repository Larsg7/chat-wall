import { Injectable } from '@angular/core';
import { Message } from '../models/message';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import { MessageModel } from '../../server/model/message';
import { ApiService } from './api.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { SocketService } from './socket.service';

const mock: MessageModel[] = [
  <MessageModel>{
    id: 0,
    author: 'Test',
    content: 'Content',
    votes: 1,
    flagged: 0
  },
  <MessageModel>{
    id: 0,
    author: 'Test',
    content: 'Content',
    votes: 1,
    flagged: 0
  },
  <MessageModel>{
    id: 0,
    author: 'Test',
    content: 'Content',
    votes: 1,
    flagged: 0
  },
];

@Injectable()
export class ChatService {

  public messages = new BehaviorSubject<Message[]>([]);
  public participants = new BehaviorSubject<string[]>([]);

  constructor(private api: ApiService, private socketService: SocketService) {
    this.socketService.newMessage.subscribe(message => {
      this.messages.next(this.messages.getValue().concat(message));
    });

    this.socketService.participantEntered.subscribe(user => {
      this.participants.next(this.participants.getValue().concat(user));
    });

    this.socketService.participantLeft.subscribe(user => {
      const users = this.participants.getValue();
      const index = users.indexOf(user);
      if (index > -1) {
        users.splice(index, 1);
        this.participants.next(users);
      }
    });
  }

  /**
   * getAll
   */
  public getAllMessages() {
    this.api.get('message').map(m => m.map(_ => Message.fromApi(_))).subscribe(messages => {
      this.messages.next(messages);
    });
  }

  public getAllParticipants() {
    this.api.get('participants').subscribe(users => {
      this.participants.next(users);
    });
  }

  public postMessage(message: Message): Observable<Message> {
    return this.api.post('message', message.toApi()).map(m => Message.fromApi(m));
  }

}
