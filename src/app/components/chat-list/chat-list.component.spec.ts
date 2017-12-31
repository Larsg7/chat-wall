import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatListComponent } from './chat-list.component';
import { ChatItemComponent } from '../chat-item/chat-item.component';
import { ChatService } from '../../services/chat.service';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '../../pipes/pipes.module';
import { SocketService } from '../../services/socket.service';
import { LoadingService } from '../../services/loading.service';
import { UserService } from '../../services/user.service';
import { ApiService } from '../../services/api.service';

describe('ChatListComponent', () => {
  let component: ChatListComponent;
  let fixture: ComponentFixture<ChatListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatListComponent ],
      imports: [HttpClientModule, TranslateModule.forRoot(), PipesModule],
      providers: [ChatService, ApiService, UserService, SocketService, LoadingService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
