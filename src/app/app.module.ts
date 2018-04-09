import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { FeedComponent } from './feed/feed.component';

const appRoutes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'feed', component: FeedComponent},  
  {path: '', component: HomeComponent},
  {path: 'post-login', component: FeedComponent},
  {path: '',   redirectTo: 'home', pathMatch: 'full'},  
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    FeedComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
