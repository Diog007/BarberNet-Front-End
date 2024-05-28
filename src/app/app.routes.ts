import { Routes } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    
    {path: '', component: NavComponent},

];
