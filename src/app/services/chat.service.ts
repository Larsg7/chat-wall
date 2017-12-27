import { Injectable } from '@angular/core';
import { Message, MessageApi } from '../models/message';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

const mock: MessageApi[] = [
  {
    id: 0,
    author: 'Test',
    content: 'Content',
    votes: 1
  },
  {
    id: 0,
    author: 'Test',
    content: 'Content',
    votes: 1
  },
  {
    id: 0,
    author: 'Test',
    content: 'Content',
    votes: 1
  },
];

@Injectable()
export class ChatService {

  constructor() { }

  /**
   * getAll
   */
  public getAll(): Observable<Message[]> {
    return Observable.of(mock).map(m => m.map(_ => Message.fromApi(_)));
  }

}
