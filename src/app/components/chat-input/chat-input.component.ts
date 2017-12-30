import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms/src/model';
import { Validators } from '@angular/forms';
import { ChatService } from '../../services/chat.service';
import { Message } from '../../models/message';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.sass']
})
export class ChatInputComponent implements OnInit {

  chatForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private chatService: ChatService, private userService: UserService) {
    this.chatForm = formBuilder.group({
      message: ['', Validators.required],
      name: ['', Validators.required],
    });
  }

  ngOnInit() {
  }

  submit() {
    if (this.chatForm.invalid) {
      return;
    }

    console.log(this.chatForm);
    const name = this.chatForm.get('name').value;
    this.userService.user.next(name);

    const message = new Message(
      0,
      'lars',
      this.chatForm.get('message').value,
      0,
      0,
      null,
      null
    );
    this.chatService.postMessage(message).subscribe(() => {
      this.chatForm.reset();
    });
  }

}
