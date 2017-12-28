import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AdminComponent } from './pages/admin/admin.component';
import { ChatListComponent } from './components/chat-list/chat-list.component';
import { ChatItemComponent } from './components/chat-item/chat-item.component';
import { ChatComponent } from './pages/chat/chat.component';
import { ChatService } from './services/chat.service';
import { ServiceModule } from './services/service.module';
import { ChatInputComponent } from './components/chat-input/chat-input.component';


@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    ChatListComponent,
    ChatItemComponent,
    ChatComponent,
    ChatInputComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceModule,
    ReactiveFormsModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
