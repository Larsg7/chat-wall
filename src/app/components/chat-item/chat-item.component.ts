import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../../models/message';

@Component({
  selector: 'app-chat-item',
  templateUrl: './chat-item.component.html',
  styleUrls: ['./chat-item.component.sass']
})
export class ChatItemComponent implements OnInit {

  @Input()
  message: Message;

  constructor() { }

  ngOnInit() {
  }

}
