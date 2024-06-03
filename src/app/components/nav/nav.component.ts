import { Component, OnInit } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {  Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [MatSidenavModule, MatListModule, MatIconModule,RouterOutlet,
     RouterLink, MatSidenavModule, MatIconModule ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit {

  constructor(private router: Router, private serviceAuth: AuthService, private toast: ToastrService  ) { }

  ngOnInit(): void {
    this.router.navigate(['clientes'])
  }

  logout(): void {
    this.router.navigate(['login'])
    this.serviceAuth.logout();
    this.toast.info("Logout com sucesso", "Logout")
  }

}
