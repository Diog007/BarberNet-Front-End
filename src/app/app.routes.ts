import { Routes } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
    {path: 'login', component: LoginComponent},
        {path: '', component: NavComponent, canActivate: [authGuard], children: [


        ]

    }

];
