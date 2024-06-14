import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router, RouterLink } from '@angular/router';
import { Ponto } from '../../../models/Ponto';
import { PontoService } from '../../../services/ponto.service';
import { DadosDeEntrada } from '../../../models/DadosDeEntrada';
import { FormControl, FormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { DadosDeSaida } from '../../../models/DadosDeSaida';

@Component({
  selector: 'app-ponto',
  standalone: true,
  imports: [MatPaginatorModule, MatFormFieldModule, MatButtonModule, 
    MatInputModule, MatTableModule, RouterLink, ReactiveFormsModule, NgxMaskDirective ],
  templateUrl: './ponto.component.html',
  styleUrl: './ponto.component.css',
  providers: [provideNgxMask()]
})
export class PontoComponent implements OnInit{
  ngOnInit(): void {
    this.findAll();
  }

  dados: DadosDeEntrada = {
    cpf: '',
  }

  dadosS: DadosDeSaida = {
    cpf: '',
  }

  cpf: FormControl = new FormControl(null, Validators.minLength(11))

  constructor (private service: PontoService, private toast: ToastrService, private router: Router) { }

  ELEMENT_DATA: Ponto[] = []

  displayedColumns: string[] = ['id', 'nomeCabeleireiro', 'entrada', 'saida'];
  dataSource = new MatTableDataSource<Ponto>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  entrada(): void {
    this.service.entrada(this.dados).subscribe(() => {
      this.toast.success('Ponto de Entrada batido', 'Ponto')
      this.router.navigate(['ponto'])
      this.findAll();
    }, ex => {
      console.log(this.dados);
      console.log(ex);
      if (ex.error.errors) {
        ex.error.errors.forEach(element => {
          this.toast.error(element.message);
        });
      } else {
        this.toast.error(ex.error.message);
      }
    })
  }

  saida(): void {
    this.service.saida(this.dadosS).subscribe(() => {
      this.toast.success('Ponto de Saida batido', 'Ponto')
      this.router.navigate(['ponto'])
      this.findAll();
    }, ex => {
      console.log(this.dados);
      console.log(ex);
      if (ex.error.errors) {
        ex.error.errors.forEach(element => {
          this.toast.error(element.message);
        });
      } else {
        this.toast.error(ex.error.message);
      }
    })
  }


  findAll() {
    this.service.findAll().subscribe(resp => {
      this.ELEMENT_DATA = resp;
      this.dataSource = new MatTableDataSource<Ponto>(resp);
      this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  validaCampos(): boolean {
    return this.cpf.valid }
}
