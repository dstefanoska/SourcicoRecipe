import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { PageLayoutComponent } from './layouts/page-layout.component';
import { HomeComponent } from './views/home/home.component';
import { RecipeComponent } from './views/recipe/recipe.component';

const routes: Routes = [
  {
    path: '',
    component: PageLayoutComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'recipe/:recipe_id', component: RecipeComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [CommonModule, BrowserModule, RouterModule.forRoot(routes)],
  exports: []
})
export class AppRoutingModule {}
