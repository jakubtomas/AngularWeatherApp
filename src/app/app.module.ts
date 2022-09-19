import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InformationComponent } from './information/information.component';
import { SearchComponent } from './search/search.component';
import { HttpClientModule } from '@angular/common/http';
import { ToCelsiumPipe } from './pipes/to-celsium.pipe';
import { InfoBoxComponent } from './information/info-box/info-box/info-box.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from './pipes/filter.pipe';
import { ConvertDatePipe } from './pipes/convert-date.pipe';
import { FormatDatePipe } from './pipes/format-date.pipe';
@NgModule({
  declarations: [
    AppComponent,
    InformationComponent,
    SearchComponent,
    ToCelsiumPipe,
    InfoBoxComponent,
    FilterPipe,
    ConvertDatePipe,
    FormatDatePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    //ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
