import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Agendamentos } from '../../../models/Agendamentos';
import { AgendamentoService } from '../../../services/agendamento.service';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-agendamento-list',
  standalone: true,
  imports: [MatPaginatorModule, MatFormFieldModule, MatButtonModule,
    MatInputModule, MatTableModule, RouterLink,
     MatCheckboxModule, MatRadioModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  templateUrl: './agendamento-list.component.html',
  styleUrl: './agendamento-list.component.css'
})
export class AgendamentoListComponent implements OnInit{
  ngOnInit(): void {
    this.findAll();
  }

  ELEMENT_DATA: Agendamentos[] = []
  FILTERED_DATA: Agendamentos[] = []

  displayedColumns: string[] = ['id', 'criacao', 'nomeCabeleireiro', 'nomeCliente', 'observacao',  'data',  'precoEstimado', 'statusAgendamento', 'metodoPagamento', 'acoes'];
  dataSource = new MatTableDataSource<Agendamentos>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor (private service: AgendamentoService) { }



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

}
