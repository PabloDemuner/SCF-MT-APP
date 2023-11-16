import { Router } from '@angular/router';
import { AuthService } from './../../seguranca/auth.service';
import { Component, OnInit } from '@angular/core';
import { ErrorHandlerService } from '../error-handler.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  exibirMenu = false;
  usuarioLogado: string = ''

  constructor(
    private router: Router,
    public authService: AuthService,
    private errorHandler: ErrorHandlerService 
    ) { }

  ngOnInit(): void {
    this.usuarioLogado = this.authService.jwtPayLoad?.nome;
    console.log(this.usuarioLogado);
  }

  logout() {
    this.authService.logout()
    .then(() => {
      this.router.navigate(['/login'])
    })
    .catch(error => this.errorHandler.handle(error));
  }

}
