import { Routes } from '@angular/router';

export const routes: Routes = [

  { path: "",loadComponent: ()=>import('./app.component').then(row => row.AppComponent)},
  { path: "login",loadComponent: ()=>import('./pages/login-page/login-page.component').then(row => row.LoginPageComponent)},
  { path: "sectionTypeListPage",loadComponent: ()=>import('./pages/section-type-list/section-type-list-page/section-type-list-page.component').then(row => row.SectionTypeListPageComponent)},
  
  

];
