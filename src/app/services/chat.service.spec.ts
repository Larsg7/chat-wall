import { TestBed, inject } from '@angular/core/testing';

import { ChatService } from './chat.service';
import { ApiService } from './api.service';
import { LoadingService } from './loading.service';
import { HttpClientModule } from '@angular/common/http';
import { SocketService } from './socket.service';
import { UserService } from './user.service';

describe('ChatService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
      providers: [ChatService, ApiService, LoadingService, SocketService, UserService]
    });
  });

  it('should be created', inject([ChatService], (service: ChatService) => {
    expect(service).toBeTruthy();
  }));
});
