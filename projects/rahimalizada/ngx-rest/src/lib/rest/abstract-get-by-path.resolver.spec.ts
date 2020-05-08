import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, Observer } from 'rxjs';
import { AbstractGetByPathResolver } from './abstract-get-by-path.resolver';
import { AbstractRestService } from './abstract-rest.service';

@Injectable({ providedIn: 'root' })
class TestResolver<T> extends AbstractGetByPathResolver<T> {
  constructor(r: AbstractRestService<T>) {
    super(r);
  }
}

const routeSnapshot: ActivatedRouteSnapshot = jasmine.createSpyObj('ActivatedRouteSnapshot', ['']);
routeSnapshot.params = { id: 1 };
const routeState: RouterStateSnapshot = null;
let restService: jasmine.SpyObj<AbstractRestService<any>>;
let resolver: TestResolver<any>;
let result: Observable<string>;

function sharedSetup() {
  beforeEach(() => {
    restService = jasmine.createSpyObj('AbstractRestService', ['getByPath']);
    resolver = new TestResolver(restService);
    result = new Observable((observer: Observer<string>) => {
      observer.next('a');
      observer.complete();
    });

    restService.getByPath.and.returnValue(result);
  });
}

describe('AbstractGetByPathResolver', () => {
  sharedSetup();

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });

  it('resolve properly', () => {
    (resolver.resolve(routeSnapshot, routeState) as Observable<string>).subscribe((res) => expect(res).toEqual('a'));
  });
});
