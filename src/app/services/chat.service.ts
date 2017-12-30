import { Injectable } from '@angular/core';
import { Message } from '../models/message';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import { MessageModel } from '../../server/model/message';
import { ApiService } from './api.service';

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

  constructor(private api: ApiService) { }

  /**
   * getAll
   */
  public getAll(): Observable<Message[]> {
    return this.api.get('message').map(m => m.map(_ => Message.fromApi(_)));
  }

  public postMessage(message: Message): Observable<Message> {
    return this.api.post('message', message.toApi()).map(m => Message.fromApi(m));
  }

}
