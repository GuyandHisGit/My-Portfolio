import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { CodelabsComponent } from './pages/codelabs/codelabs.component';
import { ContactComponent } from './pages/contact/contact.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent }, // Home page now at "/home"
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Default route
  { path: 'about', component: AboutComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'codelabs', component: CodelabsComponent },
  { path: 'contact', component: ContactComponent },
  { path: '**', redirectTo: '/home' } // Redirect unknown routes to home
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
