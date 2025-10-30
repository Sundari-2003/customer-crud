import { Routes } from '@angular/router';
import { CustomerCrud } from './customer-crud/customer-crud';   

export const routes: Routes = [
  {
    path: 'cust-crud',
    component: CustomerCrud
  }
];
