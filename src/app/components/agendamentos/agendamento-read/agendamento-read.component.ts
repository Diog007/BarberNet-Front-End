import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatDatetimepickerModule, MatNativeDatetimeModule } from '@mat-datetimepicker/core';
import { Agendamentos } from '../../../models/Agendamentos';
import { AgendamentoService } from '../../../services/agendamento.service';
import { ToastrService } from 'ngx-toastr';


@Component({
selector: 'app-agendamento-read',
standalone: true,
imports: [MatFormFieldModule, FormsModule,
MatInputModule, MatSelectModule,
MatButtonModule, RouterLink 
],
templateUrl: './agendamento-read.component.html',
styleUrl: './agendamento-read.component.css'
})
export class AgendamentoReadComponent implements OnInit{

ngOnInit(): void {
  this.agendamento.id = this.route.snapshot.paramMap.get('id');
  this.findById();
}
       
    agendamento: Agendamentos = {
    id: '',
    cabeleireiro: '',
    cliente: '',
    nomeCabeleireiro: '',
    nomeCliente: '',
    criacao: '',
    data: '',
    precoEstimado: '',
    statusAgendamento: '',
    metodoPagamento: '',
  }

  constructor(
      private agendamentoService: AgendamentoService,
      private toastService: ToastrService,
      private route: ActivatedRoute 
    ) { }

    findById(): void {
      this.agendamentoService.findById(this.agendamento.id).subscribe(resp => {
        this.agendamento = resp;
      }, ex => {
        this.toastService.error(ex.error.error);
      })
    }


}
