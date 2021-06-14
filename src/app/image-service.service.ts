import { Injectable } from '@angular/core';
import { human } from '../models/human';
import { responseauth } from '../models/responseauth';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, retry, tap } from 'rxjs/operators';
import { config } from '../models/config';
@Injectable({
  providedIn: 'root'
})
export class ImageServiceService {
  httpOptions = {
    headers: new HttpHeaders()
              .set('Authorization', 'my-auth-token')
              .set('Content-Type', 'application/json')
  };
  private apiUrl = new config().getURL();
  constructor(private http: HttpClient) { }
  getImage():Observable<any> {
    const options = {
      responseType: 'blob',
    };
    return this.http.get<any>( this.apiUrl+'/sfexternal/getImage',{headers:options}).pipe(
      tap(_ =>console.log('fetched image')),
      retry(3)
      // , // retry a failed request up to 3 times
      // catchError(this.handleError<any>('getpersonnes', []))
      );
  }
}
