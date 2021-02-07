import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ArchivosService } from '../../services/archivos/archivos.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.sass']
})
export class InicioComponent implements OnInit {
  authUser:any;
  constructor(private authService: AuthService, private router: Router
    , private archivosService: ArchivosService){

  }
  ngOnInit(): void {
    this.authUser = this.authService.isAutenticate();
    $('#sidebar').toggleClass('active');

    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
    });
  }

  salir(){
    console.log("salir")
    this.authService.removeSession();
    this.router.navigate(['/login']);
  }

  descargarTemplates(template){
    console.log("entro")
    this.archivosService.downloadTemplate(template);

  }
  
}
