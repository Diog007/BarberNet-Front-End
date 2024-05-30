import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Cabeleireiros } from '../../../models/Cabeleireiros';
import { CabeleireirosService } from '../../../services/cabeleireiros.service';

@Component({
  selector: 'app-cabeleireiros-list',
  standalone: true,
  imports: [MatPaginatorModule, MatFormFieldModule, MatButtonModule, MatInputModule, MatTableModule, RouterLink],
  templateUrl: './cabeleireiros-list.component.html',
  styleUrl: './cabeleireiros-list.component.css'
})
export class CabeleireirosListComponent {
  ngOnInit(): void {
    this.findAll();
  }

  ELEMENT_DATA: Cabeleireiros[] = []

  displayedColumns: string[] = ['id', 'nome', 'telefone', 'email', 'acoes'];
  dataSource = new MatTableDataSource<Cabeleireiros>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor (private service: CabeleireirosService) { }

  findAll () {
    this.service.findAll().subscribe(resp => {
      this.ELEMENT_DATA = resp;
      this.dataSource = new MatTableDataSource<Cabeleireiros>(resp);
      this.dataSource.paginator = this.paginator;
    })
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
