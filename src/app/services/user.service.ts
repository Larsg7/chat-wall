import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class UserService {

  public user = new BehaviorSubject<string>(null);

  constructor() { }
}
