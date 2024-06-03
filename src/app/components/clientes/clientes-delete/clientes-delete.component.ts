import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPseudoCheckboxModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgxMaskDirective } from 'ngx-mask';
import { ClientesService } from '../../../services/clientes.service';
import { ToastrService } from 'ngx-toastr';
import { Clientes } from '../../../models/Clientes';

@Component({
  selector: 'app-clientes-delete',
  standalone: true,
  imports: [MatCardModule, MatPseudoCheckboxModule, FormsModule, MatRadioModule,
    MatCheckboxModule, MatFormFieldModule, MatButtonModule, 
    MatInputModule, MatIconModule, RouterLink, ReactiveFormsModule, NgxMaskDirective],
  templateUrl: './clientes-delete.component.html',
  styleUrl: './clientes-delete.component.css'
})
export class ClientesDeleteComponent implements OnInit {

  ngOnInit(): void {
    this.cliente.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  cliente: Clientes = {
    id: '',
    nome: '',
    email: '',
    telefone: '',
  }

  constructor (
    private service: ClientesService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute 
         
    ) { }

    findById(): void{
      this.service.findById(this.cliente.id).subscribe(resp => {
        this.cliente = resp;
      })
    }

    delete(): void {
      this.service.delete(this.cliente.id).subscribe(() => {
        this.toast.success('Cliente deletado com sucesso!', 'Delete' );
        this.router.navigate(['clientes'])
      }, ex => {
        if (ex.error.errors) {
          ex.error.errors.forEach(element => {
            this.toast.error(element.message);
          });
        } else {
          this.toast.error(ex.error.message);
        }
      })
    }

}
