import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { InboundComponent } from './components/inbound/inbound.component';
import { OutboundComponent } from './components/outbound/outbound.component';
import { ProductListComponent } from './components/product/product.component';
import { AddProductComponent } from './components/add-product/add-product';
import { Home } from './components/home/home';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  // TODO: enable guards later for production
  { 
    path: 'dashboard', 
    component: Home
  },
  // TODO: enable guards later for production
  { 
    path: 'inbound', 
    component: InboundComponent
  },
  // TODO: enable guards later for production
  { 
    path: 'outbound', 
    component: OutboundComponent
  },
  // TODO: enable guards later for production
  { 
    path: 'products', 
    component: ProductListComponent
  },
  // TODO: enable guards later for production
  { 
    path: 'products/add', 
    component: AddProductComponent
  },
  // TODO: enable guards later for production
  { 
    path: 'home', 
    component: Home
  },
  { path: '**', redirectTo: 'login' }
];


