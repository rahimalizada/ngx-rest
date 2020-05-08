import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AbstractRestService } from './abstract-rest.service';

export abstract class AbstractGetByPathResolver<T> implements Resolve<T> {
  constructor(private service: AbstractRestService<T>) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): T | Observable<T> | Promise<T> {
    return this.service.getByPath(route.params.id);
  }
}