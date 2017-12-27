import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AdminComponent } from './pages/admin/admin.component';
import { ChatListComponent } from './components/chat-list/chat-list.component';
import { ChatItemComponent } from './components/chat-item/chat-item.component';
import { ChatComponent } from './pages/chat/chat.component';
import { ChatService } from './services/chat.service';


@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    ChatListComponent,
    ChatItemComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    ChatService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
