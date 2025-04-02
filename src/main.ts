import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';

import { AppComponent } from './app/app.component';
import { HomeComponent } from './app/components/home/home.component';
import { MissionListComponent } from './app/components/mission-list/mission-list.component';
import { MissionDetailsComponent } from './app/components/mission-details/mission-details.component';

const routes = [
  { path: '', component: HomeComponent },
  { path: 'missions', component: MissionListComponent },
  { path: 'mission/:id', component: MissionDetailsComponent },
  { path: '**', redirectTo: '' }
];

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideAnimations(),
    provideRouter(routes)
  ]
}).catch(err => console.error(err));