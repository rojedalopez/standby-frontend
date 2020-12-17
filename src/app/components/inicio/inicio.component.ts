import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.sass']
})
export class InicioComponent implements OnInit {
  authUser:any;
  constructor(private authService: AuthService, private router: Router){

  }
  ngOnInit(): void {
    this.authUser = this.authService.isAutenticate();
  }

  salir(){
    console.log("salir")
    this.authService.removeSession();
    this.router.navigate(['/login']);
  }
  
}
