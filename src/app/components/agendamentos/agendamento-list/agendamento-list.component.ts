import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router, RouterLink } from '@angular/router';
import { Agendamentos } from '../../../models/Agendamentos';
import { AgendamentoService } from '../../../services/agendamento.service';
import { MatSelectModule } from '@angular/material/select';
import { AgendamentosStatus } from '../../../models/AgendamentosStatus';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {MatMenuModule} from '@angular/material/menu';
import {MatDatepickerModule} from '@angular/material/datepicker';
import moment from 'moment';


@Component({
  selector: 'app-agendamento-list',
  standalone: true,
  imports: [MatPaginatorModule, MatFormFieldModule, MatButtonModule,
    MatInputModule, MatTableModule, RouterLink, 
     MatCheckboxModule, MatRadioModule, MatFormFieldModule, MatInputModule, MatSelectModule, FormsModule, CommonModule, MatButtonModule, MatMenuModule],
  templateUrl: './agendamento-list.component.html',
  styleUrl: './agendamento-list.component.css'
})
export class AgendamentoListComponent implements OnInit{

  daysOfWeek = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];

  ngOnInit(): void {
    this.findAll();
  }

  agendamentoStatus: AgendamentosStatus = {
    id: '',
    status: '',
  }

  ELEMENT_DATA: Agendamentos[] = []
  FILTERED_DATA: Agendamentos[] = []

  displayedColumns: string[] = ['id', 'criacao', 'nomeCabeleireiro', 'nomeCliente', 'observacao',  'data',  'precoEstimado', 'statusAgendamento', 'metodoPagamento', 'acoes'];
  dataSource = new MatTableDataSource<Agendamentos>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor (private service: AgendamentoService, private toastService: ToastrService, private router: Router) { }

  updateStatus(agendamento: Agendamentos): void {
    this.agendamentoStatus.id = agendamento.id;
    this.agendamentoStatus.status = agendamento.statusAgendamento;

    this.service.updateStatus(this.agendamentoStatus).subscribe(resp => {
      this.toastService.info('Status atualizado com sucesso!', "Status");
      this.findAll();
    }, ex => {
      this.toastService.error(ex.error.error);
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  findAll(): void {
    this.service.findAll().subscribe(resp => {
      this.ELEMENT_DATA = resp;
      this.dataSource = new MatTableDataSource<Agendamentos>(resp);
      this.dataSource.paginator = this.paginator;
    })
  }

  orderByStatus(status: string): void {
    let list: Agendamentos[] = [];
    this.ELEMENT_DATA.forEach(element => {
      if (element.statusAgendamento === status) {
        list.push(element);
      }
    });
    this.FILTERED_DATA = list;
    this.dataSource = new MatTableDataSource<Agendamentos>(list);
    this.dataSource.paginator = this.paginator;
  }

  filterByDayOfWeek(day: string): void {
    const dayIndex = this.daysOfWeek.indexOf(day);
    const list: Agendamentos[] = [];
    this.ELEMENT_DATA.forEach(element => {
      const elementDay = moment(element.data, 'DD/MM/YYYY HH:mm:ss').day();
      if (elementDay === dayIndex) {
        list.push(element);
      }
    });
    this.FILTERED_DATA = list;
    this.dataSource = new MatTableDataSource<Agendamentos>(list);
    this.dataSource.paginator = this.paginator;
  }

}
