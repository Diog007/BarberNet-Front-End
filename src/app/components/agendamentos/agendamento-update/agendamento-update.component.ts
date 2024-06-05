import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { MatDatetimepickerModule, MatNativeDatetimeModule } from '@mat-datetimepicker/core';

@Component({
  selector: 'app-agendamento-update',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule,
    MatInputModule, MatSelectModule,
     MatButtonModule, ReactiveFormsModule, 
     CommonModule, RouterLink,  MatDatetimepickerModule, MatNativeDatetimeModule],
  templateUrl: './agendamento-update.component.html',
  styleUrl: './agendamento-update.component.css'
})
export class AgendamentoUpdateComponent {

}
