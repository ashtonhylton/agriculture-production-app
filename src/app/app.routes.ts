import { Routes } from '@angular/router';
import { CassavaComponent } from './routes/cassava/cassava.component';
import { HomeComponent } from './routes/home/home.component';

export const routes: Routes = [
  { path: 'cassava', component: CassavaComponent },
  { path: '**', component: HomeComponent },
];
