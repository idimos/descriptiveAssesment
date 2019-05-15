import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule }    from '@angular/forms';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
// import { TopHeaderComponent } from './_header/_header.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SchoolComponent } from './_helpers/school/school.component';
import { SubclassessComponent } from './subclassess/subclassess.component';
// import { LessonsComponent } from './lessons/lessons.component';

@NgModule({
  declarations: [
    AppComponent,
    // TopHeaderComponent,
    LoginComponent,
    HomeComponent,
    SchoolComponent,
    SubclassessComponent
    // LessonsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    SlimLoadingBarModule
  ],
  providers: [],
  bootstrap: [AppComponent] 
}) 
export class AppModule { } 
