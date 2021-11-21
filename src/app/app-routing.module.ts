import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LevelOneComponent } from './level-one/level-one.component';

const routes: Routes = [
  { path:'bus-routes', component:LevelOneComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
