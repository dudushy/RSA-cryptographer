import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

import { HomeComponent } from './pages/home/home.component';
import { TestComponent } from './pages/test/test.component';

import { SvgRendererComponent } from './components/svg-renderer/svg-renderer.component';
import { CreateKeysComponent } from './pages/create-keys/create-keys.component';
import { EncryptComponent } from './pages/encrypt/encrypt.component';
import { DecryptComponent } from './pages/decrypt/decrypt.component';

@NgModule({
  declarations: [
    AppComponent,

    HomeComponent,
    TestComponent,

    SvgRendererComponent,

    CreateKeysComponent,
    EncryptComponent,
    DecryptComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
