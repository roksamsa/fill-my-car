import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'Napolni moj avto';

  constructor() {
  }

  onNotify(isUserMenuOpen: boolean): void {
    alert(isUserMenuOpen);
  }

}
