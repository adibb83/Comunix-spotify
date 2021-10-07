import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthConfig } from '../models/auth-config';
import { ScopesBuilder } from '../models/scopes-builder';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private requestAuthUrl = 'https://accounts.spotify.com/authorize';
  private authorized$ = new BehaviorSubject<boolean>(false);

  private authConfig: AuthConfig = {
    client_id: '54694fa8cf9a44ce84c9d1a778ac9b6c',
    client_secret: '6f7ce6bad26843e885b5c2f70a1b8224',
    response_type: 'code',
    redirect_uri: encodeURIComponent('http://localhost:4200/home'),
    state: '',
    show_dialog: true,
    scope: new ScopesBuilder().build(),
  };

  public authorize() {
    window.location.href = this.buildAuthUrl();
  }

  //Signal someone, that router can navigate somewhere
  public authorized(): void {
    console.log('Called auth');
    this.authorized$.next(true);
  }

  public get authorizedStream(): Observable<boolean> {
    return this.authorized$.asObservable();
  }

  public configure(config: AuthConfig): AuthService {
    // Validate Config
    this.authConfig = config;
    return this;
  }

  private buildAuthUrl(): string {
    let params = [];
    for (const [key, value] of Object.entries(this.authConfig)) {
      if (typeof value == 'object') {
        params.push(`${key}=${(value as string[]).join(' ')}`);
      } else {
        params.push(`${key}=${value}`);
      }
    }

    return `${this.requestAuthUrl}?${params.join('&')}`;
  }
}
