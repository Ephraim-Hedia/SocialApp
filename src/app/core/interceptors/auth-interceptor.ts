import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');

  // If no token, pass the request as-is (login/register calls)
  if (!token) return next(req);

  // Clone the request and add the token header
  const authReq = req.clone({
    setHeaders: { token },
  });

  return next(authReq);
};
