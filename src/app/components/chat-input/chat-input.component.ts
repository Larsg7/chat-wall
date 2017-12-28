import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms/src/model';
import { Validators } from '@angular/forms';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.sass']
})
export class ChatInputComponent implements OnInit {

  chatForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private chatService: ChatService) {
    this.chatForm = formBuilder.group({
      message: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  submit() {
    if (this.chatForm.invalid) {
      return;
    }

    console.log(this.chatForm);
    // TODO send message
  }

}
