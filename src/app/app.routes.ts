import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { InboundComponent } from './components/inbound/inbound.component';
import { OutboundComponent } from './components/outbound/outbound.component';
import { ProductListComponent } from './components/product/product.component';// import { DashboardComponent } from './pages/dashboard/.component';
import { AddProductComponent  } from './components/add-product/add-product';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'inbound', component: InboundComponent },
  { path: 'outbound', component: OutboundComponent },
  { path: 'products', component: ProductListComponent },
    { path: 'products/add', component: AddProductComponent  },

  { path: '**', redirectTo: 'login' }
];
