import { Routes } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './auth/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { CabeleireirosListComponent } from './components/cabeleireiros/cabeleireiros-list/cabeleireiros-list.component';
import { CabeleireirosCreateComponent } from './components/cabeleireiros/cabeleireiros-create/cabeleireiros-create.component';
import { CabeleireirosDeleteComponent } from './components/cabeleireiros/cabeleireiros-delete/cabeleireiros-delete.component';
import { CabeleireirosUpdateComponent } from './components/cabeleireiros/cabeleireiros-update/cabeleireiros-update.component';
import { ClientesListComponent } from './components/clientes/clientes-list/clientes-list.component';
import { ClientesDeleteComponent } from './components/clientes/clientes-delete/clientes-delete.component';
import { ClientesCreateComponent } from './components/clientes/clientes-create/clientes-create.component';
import { ClientesUpdateComponent } from './components/clientes/clientes-update/clientes-update.component';
import { AgendamentoListComponent } from './components/agendamentos/agendamento-list/agendamento-list.component';
import { AgendamentoCreateComponent } from './components/agendamentos/agendamento-create/agendamento-create.component';
import { AgendamentoUpdateComponent } from './components/agendamentos/agendamento-update/agendamento-update.component';
import { AgendamentoReadComponent } from './components/agendamentos/agendamento-read/agendamento-read.component';
import { CabeleireirosHistoricComponent } from './components/cabeleireiros/cabeleireiros-historic/cabeleireiros-historic.component';
import { ClientesHistoricComponent } from './components/clientes/clientes-historic/clientes-historic.component';

export const routes: Routes = [
    {path: 'login', component: LoginComponent},
        {path: '', component: NavComponent, canActivate: [authGuard], children: [
            
            {path: 'home', component: HomeComponent},
            {path: 'cabeleireiros', component: CabeleireirosListComponent},
            {path: 'cabeleireiros/create', component: CabeleireirosCreateComponent},
            {path: 'cabeleireiros/delete/:id', component: CabeleireirosDeleteComponent},
            {path: 'cabeleireiros/update/:id', component: CabeleireirosUpdateComponent},
            {path: 'cabeleireiros/historic/:id', component: CabeleireirosHistoricComponent},

            {path: 'clientes', component: ClientesListComponent},
            {path: 'clientes/create', component: ClientesCreateComponent},
            {path: 'clientes/delete/:id', component: ClientesDeleteComponent},
            {path: 'clientes/update/:id', component: ClientesUpdateComponent},
            {path: 'clientes/historic/:id', component: ClientesHistoricComponent},


            {path: 'agendamentos', component: AgendamentoListComponent},
            {path: 'agendamentos/create', component: AgendamentoCreateComponent},
            {path: 'agendamentos/update/:id', component: AgendamentoUpdateComponent},
            {path: 'agendamentos/read/:id', component: AgendamentoReadComponent},

        ]
    }

];
