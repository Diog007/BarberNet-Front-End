import { Routes } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './auth/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { CabeleireirosListComponent } from './components/cabeleireiros/cabeleireiros-list/cabeleireiros-list.component';
import { CabeleireirosCreateComponent } from './components/cabeleireiros/cabeleireiros-create/cabeleireiros-create.component';
import { CabeleireirosDeleteComponent } from './components/cabeleireiros/cabeleireiros-delete/cabeleireiros-delete.component';

export const routes: Routes = [
    {path: 'login', component: LoginComponent},
        {path: '', component: NavComponent, canActivate: [authGuard], children: [
            
            {path: 'home', component: HomeComponent},
            {path: 'cabeleireiros', component: CabeleireirosListComponent},
            {path: 'cabeleireiros/create', component: CabeleireirosCreateComponent},
            {path: 'cabeleireiros/delete/:id', component: CabeleireirosDeleteComponent}


        ]
    }

];
