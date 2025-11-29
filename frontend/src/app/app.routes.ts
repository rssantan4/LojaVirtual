import { Home } from './home/home/home';


import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import {HomeModule} from './home/home-module';


export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: Home },

];




