import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthorizationService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {
    constructor(
        public auth: AuthorizationService,
        public router: Router) { }
    canActivate(): boolean {
        if (this.auth.getToken()) {
            return true;
        } else {
            this.router.navigateByUrl('/login');
            return false;
        }
    }
}
