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
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';
import { PipesModule } from './pipes/pipes.module';
import { ParticipantsComponent } from './components/participants/participants.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    ChatListComponent,
    ChatItemComponent,
    ChatComponent,
    ChatInputComponent,
    ParticipantsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceModule,
    PipesModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
