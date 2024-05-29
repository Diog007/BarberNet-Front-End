import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

import {  HttpClientModule } from '@angular/common/http';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import {  RouterLink } from '@angular/router';
import { Credenciais } from '../../models/Credenciais';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  
  ngOnInit(): void {
  }

  creds: Credenciais  = {
    login: '',
    senha: ''
  };

  login = new FormControl(null, Validators.minLength(3))
  senha = new FormControl(null, Validators.minLength(3))


  validaCampos(): boolean{
    return this.login.valid && this.senha.valid;
  }

  constructor(private service: AuthService, private toast: ToastrService) { }


  logar(){
    this.service.authenticate(this.creds).pipe().subscribe(res => {
      let token = JSON.parse(JSON.stringify(res)).token
      this.toast.success(token, "certo")
    })
  }

}
