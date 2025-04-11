import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Interceptor is working! Request URL:', req.url);
    let t=localStorage.getItem("Authorization");
    let h:any;
    if(t){
      h= {
        Authorization:
        `Bearer ${t}`
      }
    }


    // افزودن هدر جدید
    const modifiedReq = req.clone({
      setHeaders:h
    });

    console.log('Modified Request:', modifiedReq);

    return next.handle(modifiedReq);
  }
}
