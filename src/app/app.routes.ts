import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { MyOffice } from './pages/my-office/my-office';
import { MyClub } from './pages/my-club/my-club';
import { MyTax } from './pages/my-tax/my-tax';
import { MyLandlord } from './pages/my-landlord/my-landlord';
import { ShoppingCart } from './pages/shopping-cart/shopping-cart';
import { CustomerCenter } from './pages/customer-center/customer-center';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'my-office', component: MyOffice },
  { path: 'my-club', component: MyClub },
  { path: 'my-tax', component: MyTax },
  { path: 'my-landlord', component: MyLandlord },
  { path: 'shopping-cart', component: ShoppingCart },
  {
    path: 'customer-center',
    component: CustomerCenter,
    canActivate: [authGuard],
  },
  { path: '**', redirectTo: '/' },
];
