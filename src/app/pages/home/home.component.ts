import { Component, OnInit } from '@angular/core';
import { ISong } from '@models/song-list.model';
import { SpotifyService } from '@services/spotify.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  songList$!: Observable<ISong[]>;

  constructor(private spotifyService: SpotifyService) {}

  ngOnInit(): void {
    this.spotifyService.getQuery('queen');
    this.songList$ = this.spotifyService.songList$;
  }
}
