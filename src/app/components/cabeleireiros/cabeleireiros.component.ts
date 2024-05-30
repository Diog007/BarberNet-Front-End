import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import {  MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';


@Component({
  selector: 'app-cabeleireiros',
  standalone: true,
  imports: [MatPaginatorModule, MatFormFieldModule, MatButtonModule, MatInputModule, MatTableModule, RouterLink],
  templateUrl: './cabeleireiros.component.html',
  styleUrl: './cabeleireiros.component.css'
})
export class CabeleireirosComponent {

}
