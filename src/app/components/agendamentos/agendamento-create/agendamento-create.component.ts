import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterLink } from '@angular/router';
import { Agendamentos } from '../../../models/Agendamentos';
import { Clientes } from '../../../models/Clientes';
import { Cabeleireiros } from '../../../models/Cabeleireiros';
import { AgendamentoService } from '../../../services/agendamento.service';
import { ClientesService } from '../../../services/clientes.service';
import { CabeleireirosService } from '../../../services/cabeleireiros.service';
import { ToastrService } from 'ngx-toastr';
import { MatDatetimepickerModule, MatNativeDatetimeModule } from '@mat-datetimepicker/core';

@Component({
  selector: 'app-agendamento-create',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule,
    MatInputModule, MatSelectModule,
     MatButtonModule, ReactiveFormsModule, 
     CommonModule, RouterLink,  MatDatetimepickerModule, MatNativeDatetimeModule],
  templateUrl: './agendamento-create.component.html',
  styleUrl: './agendamento-create.component.css'
})
export class AgendamentoCreateComponent implements OnInit{

  ngOnInit(): void {
    this.findAllClientes();
    this.findAllCabele();
  }

  agendamento: Agendamentos = {
    cabeleireiro: '',
    cliente: '',
    nomeCabeleireiro: '',
    nomeCliente: '',
    criacao: '',
    data: '',
    precoEstimado: '',
    statusAgendamento: '',
    metodoPagamento: '',
    observacao: ''
  }

  clientes:       Clientes[] = []
  cabeleireiros:  Cabeleireiros [] = []

  cabeleireiro:       FormControl = new FormControl(null, [Validators.required])
  cliente:            FormControl = new FormControl(null, [Validators.required])
  data:               FormControl = new FormControl(null, [Validators.required])
  precoEstimado:      FormControl = new FormControl(null, [Validators.required])
  statusAgendamento:  FormControl = new FormControl(null, [Validators.required])
  metodoPagamento:    FormControl = new FormControl(null, [Validators.required])
  observacao:         FormControl = new FormControl(null, [Validators.required])

  constructor(
    private agendamentoService:   AgendamentoService,
    private clienteService:       ClientesService,
    private cabeleireirosService: CabeleireirosService,
    private toastService:         ToastrService,
    private router:               Router
  ) { }

  convertDateToLocalISOString(date: Date): string {
    const tzOffset = -date.getTimezoneOffset() * 60000; // offset in milliseconds
    const localISOTime = new Date(date.getTime() + tzOffset).toISOString().slice(0, -1);
    return localISOTime;
  }

  create(): void {
    const dateValue = new Date(this.data.value);
    this.agendamento.data = this.convertDateToLocalISOString(dateValue);
    this.agendamentoService.create(this.agendamento).subscribe(resp => {
      this.toastService.success('Agendamento realizado com sucesso!', "Agendamento");
      this.router.navigate(['agendamentos']);
      console.log(this.agendamento);
    }, ex => {
      console.log(ex);
      if (ex.error.errors) {
        ex.error.errors.forEach(element => {
          this.toastService.error(element.message);
        });
      } else {
        this.toastService.error(ex.error.message);
      }
    });
  }

  findAllClientes(): void {
    this.clienteService.findAll().subscribe(respostaCliente => {
      this.clientes = respostaCliente;
    })
  }

  findAllCabele(): void {
    this.cabeleireirosService.findAll().subscribe(respostaCabele => {
      this.cabeleireiros = respostaCabele;
    })
  }

  validaCampos(): boolean {
    return this.cabeleireiro.valid && this.cliente.valid &&
      this.data.valid && this.precoEstimado.valid &&
      this.statusAgendamento.valid && this.metodoPagamento.valid 
      && this.observacao.valid 
  }
}
