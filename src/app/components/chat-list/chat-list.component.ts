import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Message } from '../../models/message';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.sass']
})
export class ChatListComponent implements OnInit {

  messages: Message[] = [];

  constructor(public chatService: ChatService) { }

  ngOnInit() {
    this.chatService.getAllMessages();
  }

}
