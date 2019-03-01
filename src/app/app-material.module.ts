import { MatInputModule, MatFormFieldModule, MatPaginatorModule, MatButtonModule, MatListModule, MatIconModule, MatToolbarModule, MatMenuModule, MatSidenavModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

const MATS = [
    MatInputModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatMenuModule,
    BrowserAnimationsModule,
    MatSidenavModule
];

@NgModule({
    imports: MATS,
    exports: MATS
})
export class AppMaterialModule { }