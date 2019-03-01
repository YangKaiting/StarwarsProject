import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { ItemComponent } from './item/item.component';
import { DetailComponent } from './detail/detail.component';

const routes: Routes = [
  { path: '', component: CategoryComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'item/:category', component: ItemComponent },
  { path: 'detail/:category/:id', component: DetailComponent },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
