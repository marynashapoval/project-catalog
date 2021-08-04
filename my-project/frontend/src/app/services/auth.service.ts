import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class AuthorizationService {
    apiBaseUrl = '/auth/local';

    constructor(private http: HttpClient) { }

    sendAuthRequest(login: string, password: string): Observable<Object> {
        return this.http.request('post', environment.apiUrl + this.apiBaseUrl,
        { body: { identifier: login, password: password }, headers: (new HttpHeaders()).append('content-type', 'application/json') });
    }

    getToken(): any {
        return localStorage.getItem('token');
    }

    public isAuthenticated(): boolean {
        const token = this.getToken();
        if (token) {
            return true;
        } else {
            return false;
        }
    }
}