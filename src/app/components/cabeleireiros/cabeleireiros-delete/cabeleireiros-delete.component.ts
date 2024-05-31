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
import { CabeleireirosService } from '../../../services/cabeleireiros.service';
import { ToastrService } from 'ngx-toastr';
import { CabeleireirosCreate } from '../../../models/Cabeleireiros-create';

@Component({
  selector: 'app-cabeleireiros-delete',
  standalone: true,
  imports: [MatCardModule, MatPseudoCheckboxModule, FormsModule, MatRadioModule,
    MatCheckboxModule, MatFormFieldModule, MatButtonModule, 
    MatInputModule, MatIconModule, RouterLink, ReactiveFormsModule, NgxMaskDirective],
  templateUrl: './cabeleireiros-delete.component.html',
  styleUrl: './cabeleireiros-delete.component.css'
})
export class CabeleireirosDeleteComponent implements OnInit {

  ngOnInit(): void {
    this.cabeleireiro.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  cabeleireiro: CabeleireirosCreate = {
    id: '',
    nome: '',
    email: '',
    telefone: '',
    cpf: ''
  }

  constructor (
    private service: CabeleireirosService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute 
         
    ) { }

    findById(): void{
      this.service.findById(this.cabeleireiro.id).subscribe(resp => {
        this.cabeleireiro = resp;
      })
    }

    delete(): void {
      this.service.delete(this.cabeleireiro.id).subscribe(() => {
        this.toast.success('Cabeleireiro deletado com sucesso!', 'Delete' );
        this.router.navigate(['cabeleireiros'])
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
