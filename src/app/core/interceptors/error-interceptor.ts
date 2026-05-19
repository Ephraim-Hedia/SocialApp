import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth/services/auth.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const toastr = inject(ToastrService);

  return next(req).pipe(
    catchError((error) => {
      switch (error.status) {
        case 401:
          toastr.error('Session expired. Please log in again.', 'Unauthorized');
          authService.signOut();
          break;

        case 403:
          toastr.error('You are not allowed to do this action.', 'Forbidden');
          router.navigate(['/feed']);
          break;

        case 404:
          toastr.error('The requested resource was not found.', 'Not Found');
          break;

        case 500:
          toastr.error('Something went wrong on the server.', 'Server Error');
          break;

        case 0:
          toastr.error('Please check your internet connection.', 'No Connection');
          break;

        default:
          // let components handle their own specific errors
          toastr.error(error.error.message,'Socail App')
          break;
      }

      return throwError(() => error);
    })
  );
};