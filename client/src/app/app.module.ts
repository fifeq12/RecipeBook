import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CoreModule } from './core/core.module';
import { RecipebookModule } from './recipebook/recipebook.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    CoreModule,
    RecipebookModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
