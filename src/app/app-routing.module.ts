import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LevelOneComponent } from './level-one/level-one.component';
import {UserComponent} from "./user/user.component";

const routes: Routes = [
  { path:'home', component:UserComponent},
  { path:'bus-routes', component:LevelOneComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
