import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-ponto',
  standalone: true,
  imports: [MatPaginatorModule, MatFormFieldModule, MatButtonModule, MatInputModule, MatTableModule, RouterLink],
  templateUrl: './ponto.component.html',
  styleUrl: './ponto.component.css'
})
export class PontoComponent {

}
