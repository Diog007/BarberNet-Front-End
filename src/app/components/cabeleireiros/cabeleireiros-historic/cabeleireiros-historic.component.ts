import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Agendamentos } from '../../../models/Agendamentos';
import { AgendamentoService } from '../../../services/agendamento.service';
import { ToastrService } from 'ngx-toastr';
import moment from 'moment';
import { Agendamentos1 } from '../../../models/Agendamentos1';

@Component({
  selector: 'app-cabeleireiros-historic',
  standalone: true,
  imports: [MatPaginatorModule,MatInputModule, MatTableModule, RouterLink, 
     MatCheckboxModule, MatRadioModule, MatFormFieldModule, MatSelectModule,
      FormsModule, CommonModule, MatButtonModule, MatMenuModule],
  templateUrl: './cabeleireiros-historic.component.html',
  styleUrl: './cabeleireiros-historic.component.css'
})
export class CabeleireirosHistoricComponent implements OnInit{

  ngOnInit(): void {
    this.agendaId.id = this.router.snapshot.paramMap.get('id');
    this.findAll();
  }

  nomeCabeleireiro: string = '';

agendaId: Agendamentos1 = {
  id: '',
}

  ELEMENT_DATA: Agendamentos[] = []
  FILTERED_DATA: Agendamentos[] = []

  displayedColumns: string[] = ['id', 'criacao', 'nomeCabeleireiro', 'nomeCliente', 'observacao',  'data',  'precoEstimado', 'statusAgendamento', 'metodoPagamento'];
  dataSource = new MatTableDataSource<Agendamentos>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor (private service: AgendamentoService, private toastService: ToastrService, private router: ActivatedRoute) { }


  findAll():void {
    this.service.findAll1(this.agendaId.id).subscribe(resp => {
      this.ELEMENT_DATA = resp;
      this.dataSource = new MatTableDataSource<Agendamentos>(resp);
      this.dataSource.paginator = this.paginator;
      this.nomeCabeleireiro = resp[0]?.nomeCabeleireiro || '';
    })
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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

  daysOfWeek = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];

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
