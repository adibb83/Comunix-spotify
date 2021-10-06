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
    client_id: '3af5f43840144db2a5ef883b56c5fb7e', // WebPortal App Id. Shoud be config
    response_type: 'token',
    redirect_uri: 'http://localhost:4040', // My URL
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
