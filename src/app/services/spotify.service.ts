import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthConfig } from '../models/auth-config';
import { ScopesBuilder } from '../models/scopes-builder';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  constructor(private http: HttpClient, private authService: AuthService) { }

  public login(): void {
    const scopes = new ScopesBuilder().build();
    const ac: AuthConfig = {
      client_id: '3af5f43840144db2a5ef883b56c5fb7e',
      response_type: 'token',
      redirect_uri: 'http://localhost:4040',
      state: '',
      show_dialog: true,
      scope: scopes,
    };
    this.authService.configure(ac).authorize();
  }

  public getQuery(query: string) {
    // define common url
    const url: string = `https://api.spotify.com/v1/search?q=${query}&type=track%2Cartist&market=US&limit=10&offset=5`;
    // define header to specify token
    const headers = new HttpHeaders({
      Authorization:
        'Bearer BQBcno4muPORaBFzbBt6-ONia6QRqs-v0EwZmyR2pJxJRS82ooHBULp-dQq5mwHw0Vi-Mots7-ZZ9Q4OrLx6ICSSObI2r2CwbhW4mjaHncvoHXQZVSZFzVaiiwP4KQmAI0Pr-9mFbn3V7-jxyiWuWgOyeAGFEH4',
    });
    // execute request
    return this.http.get(url, { headers });
  }
}
