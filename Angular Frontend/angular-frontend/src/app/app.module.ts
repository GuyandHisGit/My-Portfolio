import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { CodelabsComponent } from './pages/codelabs/codelabs.component';
import { ContactComponent } from './pages/contact/contact.component';
/*import { LoaderComponent } from './components/loader/loader.component';*/

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AboutComponent,
    ProjectsComponent,
    CodelabsComponent,
    ContactComponent
    /*LoaderComponent*/
  ],
  imports: [
    BrowserModule,
    HttpClientModule,  // Added HttpClientModule to make HTTP requests
    AppRoutingModule,
    RouterModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
