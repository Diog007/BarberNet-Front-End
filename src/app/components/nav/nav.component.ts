import { Component, OnInit } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {  Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [MatSidenavModule, MatListModule, MatIconModule,RouterOutlet,
     RouterLink, MatSidenavModule, MatIconModule, MatButtonModule, MatMenuModule, MatExpansionModule ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit {

  constructor(private router: Router, private serviceAuth: AuthService, private toast: ToastrService  ) { }

  ngOnInit(): void {
    this.router.navigate(['agendamentos'])
  }

  logout(): void {
    this.router.navigate(['login'])
    this.serviceAuth.logout();
    this.toast.info("Logout com sucesso", "Logout")
  }

}
