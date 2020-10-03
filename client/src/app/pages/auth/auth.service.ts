import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { roles, User, UserResponse } from '@app/shared/models/user.interface';
import { environment } from '@env/environment';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from  'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  helper = new JwtHelperService();
  private loggedIn = new BehaviorSubject<boolean>(false);
  private role = new BehaviorSubject<roles>(null);
  

  constructor(private http: HttpClient, private router:Router) {
    this.checkToken();
  }

  get isLogged():Observable<boolean>{
    return this.loggedIn.asObservable();
  }

  get isAdmin():Observable<string>{
    return this.role.asObservable();
  }

  login(authData: User):Observable<UserResponse | void>{
    return this.http.post<UserResponse>(`${environment.API_URL}/auth/login`, authData)
    .pipe(
      map((res:UserResponse) =>{
        this.saveLocalStorage(res);
        this.loggedIn.next(true);
        this.role.next(res.role);
        return res;
      }),
      catchError((err) => this.handlerError(err))
    );
  }

  logout(): void{
    /**
     * Remove the token from the localStorage
     */
    localStorage.removeItem('user');
    this.loggedIn.next(false);
    this.role.next(null);
    this.router.navigate(['/login']);
  }

  private checkToken(){
    const user = JSON.parse(localStorage.getItem('user')) || null;

    if(user){
      const isExpired = this.helper.isTokenExpired(user.token);

      if(isExpired){
        this.logout();
      }else{
        this.loggedIn.next(true);
        this.role.next(user.role);
      }
    }    
  }

  private saveLocalStorage(user:UserResponse){
    /**
     * This stores the token in the localstorage
     */
    //localStorage.setItem('token', token);
    const {id, message, ...rest} = user;
    localStorage.setItem('user', JSON.stringify(rest));
  }

  private handlerError(err): Observable<never>{
    let errorMessage = 'An error occurred retrieving data';
    if(err){
      errorMessage =`Error: code ${err.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
