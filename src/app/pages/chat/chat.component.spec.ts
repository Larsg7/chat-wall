import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatComponent } from './chat.component';
import { ChatListComponent } from '../../components/chat-list/chat-list.component';
import { ChatItemComponent } from '../../components/chat-item/chat-item.component';
import { ChatService } from '../../services/chat.service';
import { ChatInputComponent } from '../../components/chat-input/chat-input.component';
import { TranslateModule } from '@ngx-translate/core';
import { ParticipantsComponent } from '../../components/participants/participants.component';
import { ServiceModule } from '../../services/service.module';

describe('ChatComponent', () => {
  let component: ChatComponent;
  let fixture: ComponentFixture<ChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ChatComponent,
        ChatListComponent,
        ChatItemComponent,
        ChatInputComponent,
        ParticipantsComponent,
       ],
      imports: [ TranslateModule.forRoot(), ServiceModule ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
