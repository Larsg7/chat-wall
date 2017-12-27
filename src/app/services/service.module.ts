import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from './api.service';
import { ChatService } from './chat.service';
import { SocketService } from './socket.service';
import { UserService } from './user.service';

@NgModule({
  providers: [
    ApiService,
    ChatService,
    SocketService,
    UserService
  ]
})
export class ServiceModule { }
