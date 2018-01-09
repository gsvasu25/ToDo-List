import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {HeaderComponent} from './header/header.component';
import {SigninComponent} from './auth/signin/signin.component';
import {AuthService} from './auth/auth.service';
import {AppRoutingModule} from './app-routing.module';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoEditComponent } from './todo-list/todo-edit/todo-edit.component';
import {TodoListService} from './todo-list/todo-list.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SigninComponent,
    TodoListComponent,
    TodoEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [AuthService, TodoListService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
