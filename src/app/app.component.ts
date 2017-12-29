import { Component, transition } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  constructor(translate: TranslateService) {
    translate.setDefaultLang('de');
    translate.use('de');
  }
}
