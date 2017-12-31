import { TestBed, inject } from '@angular/core/testing';

import { SocketService } from './socket.service';
import { UserService } from './user.service';

describe('SocketService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SocketService, UserService]
    });
  });

  it('should be created', inject([SocketService], (service: SocketService) => {
    expect(service).toBeTruthy();
  }));
});
