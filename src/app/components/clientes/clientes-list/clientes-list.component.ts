import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Clientes } from '../../../models/Clientes';
import { ClientesService } from '../../../services/clientes.service';

@Component({
  selector: 'app-clientes-list',
  standalone: true,
  imports: [MatPaginatorModule, MatFormFieldModule, MatButtonModule, MatInputModule, MatTableModule, RouterLink],
  templateUrl: './clientes-list.component.html',
  styleUrl: './clientes-list.component.css'
})
export class ClientesListComponent {
  ngOnInit(): void {
    this.findAll();
  }

  ELEMENT_DATA: Clientes[] = []

  displayedColumns: string[] = ['id', 'nome', 'telefone', 'email', 'acoes'];
  dataSource = new MatTableDataSource<Clientes>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor (private service: ClientesService) { }

  findAll () {
    this.service.findAll().subscribe(resp => {
      this.ELEMENT_DATA = resp;
      this.dataSource = new MatTableDataSource<Clientes>(resp);
      this.dataSource.paginator = this.paginator;
    })
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
