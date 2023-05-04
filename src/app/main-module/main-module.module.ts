import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainModuleRoutingModule } from './main-module-routing.module';
import { MainTableComponent } from './main-table/main-table.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { SongFormComponent } from './song-form/song-form.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { ArtistsEnumerationPipe } from './pipes/artists-enumeration.pipe';

@NgModule({
  declarations: [
    MainTableComponent,
    SongFormComponent,
    ArtistsEnumerationPipe,
  ],
  imports: [
    CommonModule,
    MainModuleRoutingModule,
    NzTableModule,
    NzPaginationModule,
    NzButtonModule,
    NzIconModule,
    NzModalModule,
    ReactiveFormsModule,
    NzFormModule
  ]
})
export class MainModuleModule { }
