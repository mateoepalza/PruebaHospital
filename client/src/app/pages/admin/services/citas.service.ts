import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { environment } from '@env/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CitasService {

  

  constructor(private http:HttpClient) { }

  getAll():Observable<Cita>{
    return this.http.get<any>(environment.API_URL)
    .pipe(catchError(this.handleError));
  }

  getById():Observable<any>{

  }

  new():Observable<any>{

  }
  
  update():Observable<any>{

  }

  delete():Observable<any>{

  }
}
