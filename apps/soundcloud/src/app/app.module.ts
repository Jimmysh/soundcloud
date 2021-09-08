import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  imports: [BrowserModule.withServerTransition({ appId: 'serverApp' }), AppRoutingModule, HttpClientModule],
  declarations: [AppComponent, HeaderComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
