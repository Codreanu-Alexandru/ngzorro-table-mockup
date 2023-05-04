import { Injectable } from '@angular/core';
import { Song } from '../interfaces/song.interface';
import songData from './songs.json';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SongsService {

  private allSongs: Song[] = [];
  songSubject = new Subject<Song[]>();

  constructor() {
    this.allSongs = songData;
    this.songSubject.next(this.allSongs);
  }

  get songs(): Song[] {
    this.songSubject.next(this.allSongs);
    return this.allSongs;
  }

  set songs(songsToSet: Song[]) {
    this.allSongs = songsToSet;
    this.songSubject.next(songsToSet);
  }

  addSong(song: Song) {
    this.allSongs.push(song);
    this.songSubject.next(this.allSongs);
  }

  replaceSong(songA: Song, songB: Song) {
    const index = this.allSongs.indexOf(songA);
    if (index !== -1) {
      this.allSongs.splice(index, 1, songB);
      this.songSubject.next(this.allSongs);
    }
  }
}