import { AuthService } from './../../seguranca/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  exibirMenu = false;
  usuarioLogado: string = ''

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.usuarioLogado = this.authService.jwtPayLoad?.nome;
    console.log(this.usuarioLogado);
  }

}
