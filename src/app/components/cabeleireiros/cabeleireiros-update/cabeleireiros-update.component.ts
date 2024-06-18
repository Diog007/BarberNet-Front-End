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
import { CabeleireirosCreate } from '../../../models/Cabeleireiros-create';
import { CabeleireirosService } from '../../../services/cabeleireiros.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cabeleireiros-update',
  standalone: true,
  imports: [MatCardModule, MatPseudoCheckboxModule, FormsModule, MatRadioModule,
    MatCheckboxModule, MatFormFieldModule, MatButtonModule, 
    MatInputModule, MatIconModule, RouterLink, ReactiveFormsModule, NgxMaskDirective],
  templateUrl: './cabeleireiros-update.component.html',
  styleUrl: './cabeleireiros-update.component.css',
  providers: [provideNgxMask()]
})
export class CabeleireirosUpdateComponent implements OnInit {

  ngOnInit(): void {
    this.cabeleireiro.id = this.route.snapshot.paramMap.get('id')
    this.findById();
  }

  constructor (
    private service: CabeleireirosService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute 
         
    ) { }

    cabeleireiro: CabeleireirosCreate = {
      nome: '',
      telefone: '',
      email: '',
      cpf: '',
      endereco: {
        logradouro: '',
        bairro: '',
        cep: '',
        cidade: '',
        uf: '',
        numero: ''
      }
    }

    nome: FormControl = new FormControl(null, Validators.minLength(3))
    telefone: FormControl = new FormControl(null, Validators.minLength(11))
    email: FormControl = new FormControl(null, Validators.email)
    cpf: FormControl = new FormControl(null, Validators.minLength(11))

    logradouro: FormControl = new FormControl(null, Validators.required)
    bairro: FormControl = new FormControl(null, Validators.required)
    cep: FormControl = new FormControl(null, Validators.required)
    cidade: FormControl = new FormControl(null, Validators.required)
    uf: FormControl = new FormControl(null, Validators.required)
    numero: FormControl = new FormControl(null, Validators.required)

  findById(): void {
    this.service.findById(this.cabeleireiro.id).subscribe(resp => {
      this.cabeleireiro = resp;
    })
  }

  update(): void {
    this.service.update(this.cabeleireiro).subscribe(() => {
      this.toast.success('Cabeleireiro atualizado com sucesso!', 'Update')
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
    && this.email.valid && this.cpf.valid && this.logradouro.valid 
    && this.cep.valid && this.cidade.valid && this.uf.valid 
    && this.numero.valid
  }
}
