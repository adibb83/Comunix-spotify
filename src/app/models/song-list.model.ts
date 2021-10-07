export interface ISongResponse {
  artists: object;
  tracks: { items: ISong[] };
}

export interface ISong {
  id: string;
  href: string;
  name: string;
  duration_ms: number;
  album: IAlbum;
  artists: IArtists[];
}

export interface IAlbum {
  images: IImages[];
}

export interface IArtists {
  id: string;
  name: string;
}

export interface IImages {
  height: number;
  width: number;
  url: string;
}
