import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  baseUrl: string = environment.baseUrl;

  headers = new HttpHeaders()
      .set('Content-type' , 'application/json')

  constructor(private http:HttpClient) { }

  getData(endPoint:string, params:HttpParams = new HttpParams())
  {
    return this.http.get(this.baseUrl+endPoint, {'params' : params , 'headers' : this.headers});
  }

  postData(endPoint:string, requestBody:any)
  {
    return this.http.post(this.baseUrl+endPoint , requestBody , {'headers' : this.headers})
  }


}
