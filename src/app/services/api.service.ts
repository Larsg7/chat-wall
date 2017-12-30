import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { environment } from '../../environments/environment';
import { LoadingService } from './loading.service';
import 'rxjs/add/operator/share';

/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class ApiService {
  url: string = environment.apiUrl;

  constructor(public http: HttpClient, private loadingService: LoadingService) {
  }

  get(endpoint: string, params?: any, reqOpts?: any): Observable<any> {
    if (!reqOpts) {
      reqOpts = {
        params: new HttpParams()
      };
    }

    // Support easy query params for GET requests
    if (params) {
      reqOpts.params = new HttpParams();
      for (const k of params) {
        reqOpts.params = reqOpts.params.set(k, params[k]);
      }
    }
    console.log(reqOpts);

    return this.loadingService.add(this.http.get(this.url + '/' + endpoint, reqOpts).share());
  }

  post(endpoint: string, body: any, reqOpts?: any): Observable<any> {
    return this.loadingService.add(this.http.post(this.url + '/' + endpoint, body, reqOpts).share());
  }

  put(endpoint: string, body: any, reqOpts?: any): Observable<any> {
    return this.loadingService.add(this.http.put(this.url + '/' + endpoint, body, reqOpts).share());
  }

  delete(endpoint: string, reqOpts?: any): Observable<any> {
    return this.http.delete(this.url + '/' + endpoint, reqOpts);
  }

  patch(endpoint: string, body: any, reqOpts?: any): Observable<any> {
    return this.http.put(this.url + '/' + endpoint, body, reqOpts);
  }
}
