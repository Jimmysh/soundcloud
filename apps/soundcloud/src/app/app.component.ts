import { Component } from '@angular/core';

import { StyleService } from './shared/style.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'soundcloud';
  constructor(private styleService: StyleService) {
    this.styleService.setLink('theme', 'theme.dark.css');
  }
}
