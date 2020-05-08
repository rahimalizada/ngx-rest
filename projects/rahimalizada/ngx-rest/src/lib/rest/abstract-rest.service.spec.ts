import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';
import { PagerRequestFiltersType } from '../model/pager/pager-request-filters-type.enum';
import { PagerRequestFilters } from '../model/pager/pager-request-filters.model';
import { PagerResult } from '../model/pager/pager-result.model';
import { AbstractRestService } from './abstract-rest.service';

class TestService<T> extends AbstractRestService<T> {}
const basePath = 'path';
let service: TestService<any>;
let httpClient: jasmine.SpyObj<HttpClient>;

function sharedSetup() {
  beforeEach(() => {
    httpClient = jasmine.createSpyObj('HttpRequest', ['get', 'put', 'post', 'patch', 'delete']);
    service = new TestService(httpClient, basePath);
  });
}

function buildResult(data: any) {
  const result =
    data == null
      ? new Observable((observer: Observer<void>) => {
          observer.next();
          observer.complete();
        })
      : new Observable((observer: Observer<any>) => {
          observer.next(data);
          observer.complete();
        });
  httpClient.get.and.returnValue(result);
  httpClient.put.and.returnValue(result);
  httpClient.post.and.returnValue(result);
  httpClient.patch.and.returnValue(result);
  httpClient.delete.and.returnValue(result);
}

describe('AbstractRestService', () => {
  sharedSetup();

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should submit GET request on getAll call', () => {
    buildResult(['1', '2']);
    service.getAll().subscribe((res) => expect(res).toEqual(['1', '2']));
    expect(httpClient.get).toHaveBeenCalledWith(basePath);
  });

  it('should submit GET request on get call', () => {
    buildResult('1');
    service.get().subscribe((res) => expect(res).toEqual('1'));
    expect(httpClient.get).toHaveBeenCalledWith(basePath);
  });

  it('should submit GET request on getByPath call', () => {
    buildResult('1');
    service.getByPath('id').subscribe((res) => expect(res).toEqual('1'));
    expect(httpClient.get).toHaveBeenCalledWith(`${basePath}/id`);
  });

  it('should submit PUT request on create call', () => {
    buildResult(null);
    service.create('1').subscribe((res) => expect(res).toEqual(undefined));
    expect(httpClient.put).toHaveBeenCalledWith(`${basePath}`, '1');
  });

  it('should submit POST request on update call', () => {
    buildResult(null);
    service.update('1').subscribe((res) => expect(res).toEqual(undefined));
    expect(httpClient.post).toHaveBeenCalledWith(`${basePath}`, '1');
  });

  it('should submit POST request on updateByPath call', () => {
    buildResult(null);
    service.updateByPath('id', '1').subscribe((res) => expect(res).toEqual(undefined));
    expect(httpClient.post).toHaveBeenCalledWith(`${basePath}/id`, '1');
  });

  it('should submit PATCH request on patchByPath call', () => {
    buildResult(null);
    service.patchByPath('id', '1').subscribe((res) => expect(res).toEqual(undefined));
    expect(httpClient.patch).toHaveBeenCalledWith(`${basePath}/id`, '1');
  });

  it('should submit DELETE request on deleteByPath call', () => {
    buildResult(null);
    service.deleteByPath('id').subscribe((res) => expect(res).toEqual(undefined));
    expect(httpClient.delete).toHaveBeenCalledWith(`${basePath}/id`);
  });

  it('should submit GET request on pager call', () => {
    const result: PagerResult<string> = { page: 1, pageSize: 10, total: 30, hasMore: true, items: ['1', '2'] };
    buildResult(result);
    const requestFilters: PagerRequestFilters = { type: PagerRequestFiltersType.AND, userRatingFrom: 1 };
    service.pager(1, 10, 'id', 'asc', 'term1 term2', requestFilters).subscribe((res) => expect(res).toBe(result));

    const params = new HttpParams()
      .append('page', '1')
      .append('pageSize', '10')
      .append('sort', 'id')
      .append('sortDirection', 'asc')
      .append('searchTerms', 'term1')
      .append('searchTerms', 'term2')
      .append('requestFilters', JSON.stringify(requestFilters));
    expect(httpClient.get).toHaveBeenCalledWith(`${basePath}`, { params });
  });

  it('should submit GET request on pager call without search terms', () => {
    const result: PagerResult<string> = { page: 1, pageSize: 10, total: 30, hasMore: true, items: ['1', '2'] };
    buildResult(result);
    const requestFilters: PagerRequestFilters = { type: PagerRequestFiltersType.AND, userRatingFrom: 1 };
    service.pager(1, 10, 'id', 'asc', null, requestFilters).subscribe((res) => expect(res).toBe(result));

    const params = new HttpParams()
      .append('page', '1')
      .append('pageSize', '10')
      .append('sort', 'id')
      .append('sortDirection', 'asc')
      .append('requestFilters', JSON.stringify(requestFilters));
    expect(httpClient.get).toHaveBeenCalledWith(`${basePath}`, { params });
  });

  it('should submit GET request on pagerByPath call', () => {
    const result: PagerResult<string> = { page: 1, pageSize: 10, total: 30, hasMore: true, items: ['1', '2'] };
    buildResult(result);
    const requestFilters: PagerRequestFilters = { type: PagerRequestFiltersType.AND, userRatingFrom: 1 };
    service.pagerByPath('subpath', 1, 10, 'id', 'asc', '', null).subscribe((res) => expect(res).toBe(result));

    const params = new HttpParams().append('page', '1').append('pageSize', '10').append('sort', 'id').append('sortDirection', 'asc');
    expect(httpClient.get).toHaveBeenCalledWith(`${basePath}/subpath`, { params });
  });
});
