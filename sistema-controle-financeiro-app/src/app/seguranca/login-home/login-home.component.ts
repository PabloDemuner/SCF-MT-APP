import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login-home',
  templateUrl: './login-home.component.html',
  styleUrls: ['./login-home.component.css']
})
export class LoginHomeComponent implements OnInit {

  constructor(
    private authService : AuthService,
  ) { }

  ngOnInit(): void {
  }

  login(usuario: string, senha: string) {
    this.authService.login(usuario, senha);
  }
}
