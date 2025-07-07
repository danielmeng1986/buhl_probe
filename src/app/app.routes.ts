import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { MyOffice } from './pages/my-office/my-office';
import { MyClub } from './pages/my-club/my-club';
import { MyTax } from './pages/my-tax/my-tax';
import { MyLandlord } from './pages/my-landlord/my-landlord';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'my-office', component: MyOffice },
  { path: 'my-club', component: MyClub },
  { path: 'my-tax', component: MyTax },
  { path: 'my-landlord', component: MyLandlord },
  { path: '**', redirectTo: '/' },
];
