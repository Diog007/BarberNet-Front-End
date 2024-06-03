import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPseudoCheckboxModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { ClientesService } from '../../../services/clientes.service';
import { ToastrService } from 'ngx-toastr';
import { Clientes } from '../../../models/Clientes';

@Component({
  selector: 'app-clientes-update',
  standalone: true,
  imports: [MatCardModule, MatPseudoCheckboxModule, FormsModule, MatRadioModule,
    MatCheckboxModule, MatFormFieldModule, MatButtonModule, 
    MatInputModule, MatIconModule, RouterLink, ReactiveFormsModule, NgxMaskDirective],
  templateUrl: './clientes-update.component.html',
  styleUrl: './clientes-update.component.css',
  providers: [provideNgxMask()]
})
export class ClientesUpdateComponent implements OnInit {

  ngOnInit(): void {
    this.cliente.id = this.route.snapshot.paramMap.get('id')
    this.findById();
  }

  constructor (
    private service: ClientesService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute 
         
    ) { }

  cliente: Clientes= {
    id: '',
    nome: '',
    telefone: '',
    email: '',
  }

  nome: FormControl = new FormControl(null, Validators.minLength(3))
  telefone: FormControl = new FormControl(null, Validators.minLength(3))
  email: FormControl = new FormControl(null, Validators.minLength(3))
  cpf: FormControl = new FormControl(null, Validators.minLength(3))

  findById(): void {
    this.service.findById(this.cliente.id).subscribe(resp => {
      this.cliente = resp;
    })
  }

  update(): void {
    this.service.update(this.cliente).subscribe(() => {
      this.toast.success('Cabeleireiro atualizado com sucesso!', 'Update')
      this.router.navigate(['clientes'])
    })
  }


  validaCampos(): boolean {
    return this.nome.valid && this.telefone.valid 
    && this.email.valid && this.cpf.valid
  }
}
