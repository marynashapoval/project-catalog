import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './pages/categories/categories.component';
import { LoginComponent } from './pages/login/login.component';
import { ProductInfoComponent } from './pages/product-info/product-info.component';
import { ProductsComponent } from './pages/products/products.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'categories', component: CategoriesComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'products', component: ProductsComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'categories/:id', component: CategoriesComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'products/product-info/:id', component: ProductInfoComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: '**',
    redirectTo: 'categories'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
