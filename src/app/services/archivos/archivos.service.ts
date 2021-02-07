import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { endpoint_archivos } from '../../configuration';
import { fileSaver } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class ArchivosService {

  constructor(private http: HttpClient) { }

  downloadTemplate(template:string){
    return this.http.get(`${endpoint_archivos}/download/plantilla/${template}`, {responseType: 'blob'}).subscribe(response => {
      let blob:any = new Blob([response], { type: 'application/octet-stream; charset=utf-8' });
      fileSaver.saveAs(blob, template);
    }), error => console.log('Error downloading the file'),
                 () => console.info('File downloaded successfully');
  }
  
}
