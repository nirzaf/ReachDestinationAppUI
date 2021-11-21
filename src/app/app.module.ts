import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import {ReactiveFormsModule} from "@angular/forms";
import { LevelOneComponent } from './level-one/level-one.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    LevelOneComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
