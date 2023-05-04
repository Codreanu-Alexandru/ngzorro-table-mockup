import { Component, OnInit } from '@angular/core';
import { Song } from 'src/app/interfaces/song.interface';
import { SongsService } from 'src/app/services/songs-service.service';
import { SongFormComponent } from '../song-form/song-form.component';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DurationConverterPipe } from 'src/app/main-module/pipes/duration-converter.pipe';
import { ArtistsEnumerationPipe } from '../pipes/artists-enumeration.pipe';

@Component({
  selector: 'app-main-table',
  templateUrl: './main-table.component.html',
  styleUrls: ['./main-table.component.scss']
})
export class MainTableComponent implements OnInit {

  public durationConverter: DurationConverterPipe = new DurationConverterPipe;
  public artistsEnumerator: ArtistsEnumerationPipe = new ArtistsEnumerationPipe;

  public allSongs: Song[] = [];

  public CurrentSongs!: Song[];

  public formGroup!: FormGroup;

  constructor(
    private songsService: SongsService,
    private modalService: NzModalService,
  ) {
    this.songsService.songSubject.subscribe(
      {
        next: (response: Song[]) => {
          this.allSongs = response;
          this.onPageIndexChanged(1);
          console.log(response);
        }
      }
    );
  }

  ngOnInit() {
    this.songsService.songs;
  }

  onPageIndexChanged(pageIndex: number): void {
    const startIndex = (pageIndex - 1) * 8;
    this.CurrentSongs = this.allSongs.slice(startIndex, startIndex + 8);
  }

  OpenAddDialog() {
    const modalRef: NzModalRef = this.modalService.create({
      nzTitle: 'Add Song',
      nzContent: SongFormComponent,
      nzFooter: null
    });
  }

  OpenEditDialog(song: Song) {
    console.log(song);
    const modalRef: NzModalRef = this.modalService.create({
      nzTitle: 'Edit Song',
      nzContent: SongFormComponent,
      nzComponentParams: {
        replace: true,
        song: song
      },
      nzFooter: null
    });
  }
}
