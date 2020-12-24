import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AbstractRestService } from './abstract-rest.service';

export abstract class AbstractGetManyByPathResolver<T> implements Resolve<T[]> {
  constructor(private service: AbstractRestService<T>) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): T[] | Observable<T[]> | Promise<T[]> {
    return this.service.getManyByPath(route.params.id);
  }
}
