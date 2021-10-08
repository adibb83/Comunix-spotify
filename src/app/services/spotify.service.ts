import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ISong, ISongResponse } from '@models/song-list.model';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthConfig } from '../models/auth-config';
import { ScopesBuilder } from '../models/scopes-builder';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  private songList = new BehaviorSubject<ISong[]>([]);

  get songList$() {
    return this.songList.asObservable();
  }
  constructor(private http: HttpClient, private authService: AuthService) { }

  client_id = '3af5f43840144db2a5ef883b56c5fb7e';
  client_secret = '6f7ce6bad26843e885b5c2f70a1b8224';

  public login(): void {
    const scopes = new ScopesBuilder().build();
    const ac: AuthConfig = {
      client_id: '3af5f43840144db2a5ef883b56c5fb7e',
      client_secret: '6f7ce6bad26843e885b5c2f70a1b8224',
      response_type: 'code',
      redirect_uri: encodeURIComponent('http://localhost:4200/home'),
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
        'Bearer BQCQNLgncHWNhMJzRSLsubV7zZDzzKKm2xFq-bF90AEKXBCxws7UI64_KWXUNZ1lm29f3-Hoj1TaWPGAgoL_2xAhWyTtWzD2KCoaB_Ppq3m1qWf4T2CF0buQbwWTHbmyUZzhG2TasHE3Ui7R2JoLLGMf2VPO6Ac',
    });
    // execute request
    return this.http.get<any>(url, { headers }).pipe(map(item => {

      return <ISong>{
        id: item['tracks']['items']['id'],
        href: item['tracks']['items']['href'],
        name: item['tracks']['items']['name'],
        duration_ms: item['tracks']['items']['duration_ms'],
        album: item['tracks']['items']['album']['images'],
        artists: { id: item['tracks']['items']['artists'][0]['id'], name: item['tracks']['items']['artists'][0]['name'] }
      }
    })).subscribe((res) => {
      if (res && res?.tracks?.items) {
        console.log(res.tracks.items);
        this.songList.next(res.tracks.items);
      }
    });
  }

  getTokenSpotify() {
    console.log('getTokenSpotify');
    const url = 'https://accounts.spotify.com/api/token';
    const body = {
      grant_type: 'client_credentials',
    };

    console.log('getTokenSpotify', body);

    const headers = new HttpHeaders({
      'Content-Type': '	application/x-www-form-urlencoded',
      Authorization: `Basic ${this.client_id}:${this.client_secret}`,
    });

    this.http.post(url, body, { headers }).subscribe((res) => {
      console.log('getTokenSpotify', 'ok', res);
    });
  }
}
