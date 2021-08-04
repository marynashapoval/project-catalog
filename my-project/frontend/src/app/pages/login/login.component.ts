import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username!: string;
  password!: string;

  constructor(private auth: AuthorizationService,
              private router: Router) { }

  login() {
    this.auth.sendAuthRequest(this.username, this.password).subscribe((res: any) => {
      this.router.navigateByUrl('/products')
      localStorage.setItem('token', (res as any).jwt);
    });
  }

}
