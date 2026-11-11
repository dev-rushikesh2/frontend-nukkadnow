import { HttpInterceptorFn } from '@angular/common/http';

export const correlationIdInterceptor: HttpInterceptorFn = (req, next) => {
  const correlationId = crypto.randomUUID ? crypto.randomUUID() : 'cid-' + Date.now();
  const cloned = req.clone({
    setHeaders: {
      'x-correlation-id': correlationId
    }
  });
  return next(cloned);
};
