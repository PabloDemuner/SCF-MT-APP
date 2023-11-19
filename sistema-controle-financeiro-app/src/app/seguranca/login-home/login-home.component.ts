import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-home',
  templateUrl: './login-home.component.html',
  styleUrls: ['./login-home.component.css']
})
export class LoginHomeComponent implements OnInit {

  constructor(
    private authService : AuthService,
    private errorHandler: ErrorHandlerService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  login(usuario: string, senha: string) {
    this.authService.login(usuario, senha)
    .then(() =>  this.router.navigate(['/dashboard']))
      .catch(error => {
        this.errorHandler.handle(error);
      });
  }
}
