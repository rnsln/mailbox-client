import {
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest
} from '@angular/common/http';
import {StorageService} from '../services/storage.service';
import {catchError, Observable} from 'rxjs';

export const httpCredentialInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn)=> {
  const storageService = new StorageService()
  req = req.clone({
    setHeaders: {
      'Authorization': `Bearer ${storageService.getToken()}`
    }
  })

  return next(req)
}

export const httpLogoutInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  return next(req).pipe(catchError(err => {
    console.log(err.status)
    if(err.status==403) {
      console.log(err);
      sessionStorage.clear()
      window.location.reload()
    }

    return next(req)
  }))
}

export const httpCredentialInterceptors = [
  httpCredentialInterceptor,
  httpLogoutInterceptor
]
