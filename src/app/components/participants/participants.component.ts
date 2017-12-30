import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.sass']
})
export class ParticipantsComponent implements OnInit {

  constructor(public chatService: ChatService) {}

  ngOnInit() {
    this.chatService.getAllParticipants();
  }

}
