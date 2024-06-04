import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-agendamento-create',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule,
    MatInputModule, MatSelectModule,
     MatButtonModule, ReactiveFormsModule, 
     CommonModule, RouterLink],
  templateUrl: './agendamento-create.component.html',
  styleUrl: './agendamento-create.component.css'
})
export class AgendamentoCreateComponent {

}
