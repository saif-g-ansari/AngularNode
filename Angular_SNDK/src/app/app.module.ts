import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ApiServiceService } from './services/api-service.service';
import { CommonService } from './services/common.service';
import { RepositoryService } from './services/repository.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    ConfirmDialogModule,
  ],
  providers: [
    HttpClient,
    ApiServiceService,
    CommonService,
    RepositoryService,
    ConfirmationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
