import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ShowcaseComponent } from './components/showcase';

@NgModule({
  declarations: [ShowcaseComponent],
  imports: [CommonModule, FlexLayoutModule],
  exports: [ShowcaseComponent, FlexLayoutModule],
})
export class SharedModule {}
