import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'ui';
import { SharedModule } from '../shared/shared.module';
import { AppComponent } from './app.component';
import { DemoRoutingModule } from './demo-routing.module';
import { ButtonShowcaseComponent } from './showcases/button-showcase';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    DemoRoutingModule,
    MatSidenavModule,
    MatListModule,
    SharedModule,
    ButtonModule,
    ButtonModule,
  ],
  declarations: [AppComponent, ButtonShowcaseComponent],
  bootstrap: [AppComponent],
})
export class DemoModule {}
