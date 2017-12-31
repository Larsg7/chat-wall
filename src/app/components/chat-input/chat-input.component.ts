import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms/src/model';
import { Validators } from '@angular/forms';
import { ChatService } from '../../services/chat.service';
import { Message } from '../../models/message';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/switchMap';
import { ValidatorFn } from '@angular/forms/src/directives/validators';

function nameValidation(namesTakenSub: BehaviorSubject<string[]>): ValidatorFn {
  return function(control: FormControl): Promise<object | null> {
    const name = control.value;
    return new Promise(res => namesTakenSub.subscribe(namesTaken => {
      console.log(namesTaken, name, namesTaken.find(_ => _ === name));
      res(namesTaken.find(_ => _ === name) ? {
          nameValidation: {
            name: name
          }
        } : null);
    }));
  };
}

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.sass']
})
export class ChatInputComponent implements OnInit {

  chatForm: FormGroup;
  userForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private chatService: ChatService,
    public userService: UserService) {
    this.chatForm = formBuilder.group({
      message: ['', Validators.required],
    });
    this.userForm = formBuilder.group({
      name: ['', Validators.required, nameValidation(chatService.participants)],
    });
  }

  ngOnInit() {
  }

  submit() {
    if (this.chatForm.invalid) {
      return;
    }

    console.log(this.chatForm);
    const message = new Message(
      0,
      this.userService.user.getValue(),
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

  login() {
    if (this.userForm.invalid) {
      return;
    }

    const name = this.userForm.get('name').value;
    this.userService.user.next(name);
  }

}
