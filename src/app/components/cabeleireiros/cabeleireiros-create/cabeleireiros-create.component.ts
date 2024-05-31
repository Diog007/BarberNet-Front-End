import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatPseudoCheckboxModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { Cabeleireiros } from '../../../models/Cabeleireiros';
import { CabeleireirosCreate } from '../../../models/Cabeleireiros-create';
import { ToastrService } from 'ngx-toastr';
import { CabeleireirosService } from '../../../services/cabeleireiros.service';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';


@Component({
  selector: 'app-cabeleireiros-create',
  standalone: true,
  imports: [MatCardModule, MatPseudoCheckboxModule, FormsModule, MatRadioModule,
    MatCheckboxModule, MatFormFieldModule, MatButtonModule, 
    MatInputModule, MatIconModule, RouterLink, ReactiveFormsModule, NgxMaskDirective],
  templateUrl: './cabeleireiros-create.component.html',
  styleUrl: './cabeleireiros-create.component.css',
  providers: [provideNgxMask()]
})
export class CabeleireirosCreateComponent implements OnInit {
  ngOnInit(): void {
  }

    cabeleireiro: CabeleireirosCreate = {
      id: "",
      nome: "",
      telefone: "",
      email: "",
      cpf: "",
    }

    nome: FormControl = new FormControl(null, Validators.minLength(3))
    telefone: FormControl = new FormControl(null, Validators.minLength(11))
    email: FormControl = new FormControl(null, Validators.email)
    cpf: FormControl = new FormControl(null, Validators.minLength(11))

    constructor (private service: CabeleireirosService, private toast: ToastrService, private router: Router ) { }

    create(): void {
      this.service.create(this.cabeleireiro).subscribe(() => {
        this.toast.success('Cadastrado com sucesso!', 'Cadastro')
        this.router.navigate(['cabeleireiros'])
      }, ex => {
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


    validaCampos(): boolean {
      return this.nome.valid && this.telefone.valid 
      && this.email.valid && this.cpf.valid;
    }

}
