import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthConfig } from '../models/auth-config';
import { ScopesBuilder } from '../models/scopes-builder';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  public login(): void {
    const scopes = new ScopesBuilder().build();
    const ac: AuthConfig = {
      client_id: '3af5f43840144db2a5ef883b56c5fb7e', // WebPortal App Id. Shoud be config
      response_type: 'token',
      redirect_uri: 'http://localhost:4040', // My URL
      state: '',
      show_dialog: true,
      scope: scopes,
    };
    this.authService.configure(ac).authorize();
  }

  public getQuery(query: string) {
    // define common url
    const url: string = ` 'https://api.spotify.com/v1/me'`;

    // define header to specify token
    const headers = new HttpHeaders({
      Authorization:
        'Bearer BQAr2XNaHkRgSxk-lWKIUEjHTPT1pG7qj696yYQgdpTLKSuVL9oMGcENth0yynhRilrfN_FjFxtGd3f9poE',
    });

    // execute request
    return this.http.get(url);
  }
}
