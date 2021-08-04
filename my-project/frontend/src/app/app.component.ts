import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  userLogin!: string;
  userPassword!: string;
  showNavbar: boolean = false;
  refreshing: boolean = false;

  constructor(private router: Router) {
    this.router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (event['url'] == '/login') {
          this.showNavbar = false;
        } else {
          this.showNavbar = true;
        }
      }
    })
  }
}
