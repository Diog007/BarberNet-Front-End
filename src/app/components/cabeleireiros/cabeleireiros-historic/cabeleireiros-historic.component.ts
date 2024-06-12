import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cabeleireiros-historic',
  standalone: true,
  imports: [MatPaginatorModule,MatInputModule, MatTableModule, RouterLink, 
     MatCheckboxModule, MatRadioModule, MatFormFieldModule, MatSelectModule,
      FormsModule, CommonModule, MatButtonModule, MatMenuModule],
  templateUrl: './cabeleireiros-historic.component.html',
  styleUrl: './cabeleireiros-historic.component.css'
})
export class CabeleireirosHistoricComponent {

}
