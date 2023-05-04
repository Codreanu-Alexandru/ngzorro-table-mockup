import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Song } from 'src/app/interfaces/song.interface';
import { SongsService } from 'src/app/services/songs-service.service';
import { CustomValidators } from 'src/app/validators/customValidators';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-song-form',
  templateUrl: './song-form.component.html',
  styleUrls: ['./song-form.component.scss']
})
export class SongFormComponent implements OnInit {
  @Input() song: Song | undefined;
  songForm!: FormGroup;

  public newSong!: Song;
  public replace: boolean;

  public added: Boolean;
  public rejected: Boolean;

  constructor(private fb: FormBuilder, private songService: SongsService, private modalRef: NzModalRef) {
    this.initializeForm();

    this.added = false;
    this.rejected = false;
    this.replace = false;
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  setArtists(artists: string[]) {
    const artistFGs = artists.map(artist => this.fb.group({ name: artist }));
    const artistFormArray = this.fb.array(artistFGs);
    this.songForm.setControl('artists', artistFormArray);
  }

  initializeForm(): void {
    if (this.song != undefined) {
      this.songForm = this.fb.group({
        title: new FormControl(this.song.title, [Validators.required]),
        album: new FormControl(this.song.album, [Validators.required]),
        duration: new FormControl(this.song.duration, [Validators.required, CustomValidators.secondsValidator]),
        artists: this.fb.array(this.song.artists.map(artist => this.fb.group({
          name: [artist, Validators.required]
        }))),
        genres: new FormControl(this.song.genres, [Validators.required])
      });
    } else {
      this.songForm = new FormGroup({
        title: new FormControl(null, [Validators.required]),
        album: new FormControl(null, [Validators.required]),
        duration: new FormControl(null, [Validators.required]),
        artists: new FormArray([], Validators.required),
        genres: new FormControl(null, [Validators.required])
      });
    }
  }

  get title(): FormControl {
    return this.songForm.get('title') as FormControl;
  }

  get album(): FormControl {
    return this.songForm.get('album') as FormControl;
  }

  get duration(): FormControl {
    return this.songForm.get('duration') as FormControl;
  }

  get artists(): FormArray {
    return this.songForm.get('artists') as FormArray;
  }

  get genres(): FormControl {
    return this.songForm.get('genres') as FormControl;
  }

  addArtist() {
    this.artists.push(this.fb.group({
      name: ['', Validators.required],
    }));
  }

  addSong() {
    if (!this.title.invalid && !this.album.invalid && !this.artists.invalid && !this.duration.invalid && !this.genres.invalid) {
      this.newSong = {
        title: this.title.value,
        album: this.album.value,
        duration: this.duration.value,
        artists: [],
        genres: this.genres.value
      };

      for (var artist of this.artists.value) {
        this.newSong.artists.push(artist.name);
      }
      if (this.song) {
        this.songService.replaceSong(this.song, this.newSong);
      }
      else {
        this.songService.addSong(this.newSong);
      }
      this.added = true;
      this.rejected = false;
    }
    else {
      this.added = false;
      this.rejected = true;
    }

  }

  closeModal() {
    this.modalRef.close();
  }
}