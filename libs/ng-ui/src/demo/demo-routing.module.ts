import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ButtonShowcaseComponent } from './showcases/button-showcase';

const routes: Routes = [
  {
    path: 'button',
    component: ButtonShowcaseComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class DemoRoutingModule {}
