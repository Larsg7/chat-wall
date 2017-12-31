import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantsComponent } from './participants.component';
import { ChatService } from '../../services/chat.service';
import { ApiService } from '../../services/api.service';
import { UserService } from '../../services/user.service';
import { SocketService } from '../../services/socket.service';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '../../pipes/pipes.module';
import { LoadingService } from '../../services/loading.service';

describe('ParticipantsComponent', () => {
  let component: ParticipantsComponent;
  let fixture: ComponentFixture<ParticipantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParticipantsComponent ],
      imports: [HttpClientModule, TranslateModule.forRoot(), PipesModule],
      providers: [ChatService, ApiService, UserService, SocketService, LoadingService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
