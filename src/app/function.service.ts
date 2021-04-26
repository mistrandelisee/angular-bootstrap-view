import { Injectable } from '@angular/core';
import { role } from '../models/role';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, retry, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class FunctionService {
  httpOptions = {
    headers: new HttpHeaders()
              .set('Authorization', 'my-auth-token')
              .set('Content-Type', 'application/json')
  };
  // private apiUrl = `http://127.0.0.1:3000`;//https://learn-node-postgres.herokuapp.com/
  private apiUrl = `https://learn-node-postgres.herokuapp.com`;//https://learn-node-postgres.herokuapp.com/

  constructor(private http: HttpClient) { }
  newRole(roleData : any) {//ok
    return this.http.post<role>( this.apiUrl+'/persone/newobj', JSON.stringify(roleData), this.httpOptions).pipe(
      tap(_ =>console.log('add a role processing...')),
      //catchError(this.handleError<any>('add Member Err', []))
    );
  }
  getAllRoles():Observable<role> {
    return this.http.get<role>( this.apiUrl+'/role/').pipe(
      tap(_ =>console.log('fetched roles')),
      retry(3)
      // , // retry a failed request up to 3 times
      // catchError(this.handleError<any>('getpersonnes', []))
      );
  }
  updatePerson(roleNewData : any) {//ok
    return this.http.post<role>( this.apiUrl+'/role/update', JSON.stringify(roleNewData), this.httpOptions).pipe(
      tap(_ =>console.log('update a member processing...')),
      //catchError(this.handleError<any>('update menber Err', []))
      );
  }

}
