import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PagerResult } from '../model/pager/pager-result.model';

export abstract class AbstractRestService<T> {
  constructor(protected httpClient: HttpClient, protected basePath: string) {}

  buildParams(page: number, pageSize: number, sort: string, sortDirection: string, searchTerms?: string, requestFilters?: any): HttpParams {
    let params = new HttpParams()
      .append('page', page.toString())
      .append('pageSize', pageSize.toString())
      .append('sort', sort)
      .append('sortDirection', sortDirection);
    if (searchTerms != null) {
      for (const term of this.parseSearchTerms(searchTerms)) {
        params = params.append('searchTerms', term);
      }
    }
    if (requestFilters != null) {
      params = params.append('requestFilters', JSON.stringify(requestFilters));
    }
    return params;
  }

  pager(
    page: number,
    pageSize: number,
    sort: string,
    sortDirection: string,
    searchTerms?: string,
    requestFilters?: any,
  ): Observable<PagerResult<T>> {
    const params = this.buildParams(page, pageSize, sort, sortDirection, searchTerms, requestFilters);
    return this.httpClient.get<PagerResult<T>>(this.basePath, { params });
  }

  pagerByPath(
    path: string,
    page: number,
    pageSize: number,
    sort: string,
    sortDirection: string,
    searchTerms?: string,
    requestFilters?: any,
  ): Observable<PagerResult<T>> {
    const params = this.buildParams(page, pageSize, sort, sortDirection, searchTerms, requestFilters);
    return this.httpClient.get<PagerResult<T>>(`${this.basePath}/${path}`, {
      params,
    });
  }

  getOne() {
    return this.httpClient.get<T>(this.basePath);
  }

  getMany() {
    return this.httpClient.get<T[]>(this.basePath);
  }

  getOneByPath(path: string) {
    return this.httpClient.get<T>(`${this.basePath}/${path}`);
  }

  getManyByPath(path: string) {
    return this.httpClient.get<T[]>(`${this.basePath}/${path}`);
  }

  create(putData: T) {
    return this.httpClient.put<void>(this.basePath, putData);
  }

  update(postData: T) {
    return this.httpClient.post<void>(this.basePath, postData);
  }

  updateByPath(path: string, postData: T) {
    return this.httpClient.post<void>(`${this.basePath}/${path}`, postData);
  }

  patch(patchData: T) {
    return this.httpClient.patch<void>(`${this.basePath}`, patchData);
  }

  patchByPath(path: string, patchData: T) {
    return this.httpClient.patch<void>(`${this.basePath}/${path}`, patchData);
  }

  deleteByPath(path: string) {
    return this.httpClient.delete<void>(`${this.basePath}/${path}`);
  }

  private parseSearchTerms(termsString: string): string[] {
    if (!termsString) {
      return [];
    }
    return termsString
      .split(' ')
      .map((s) => s.trim() /* .toLowerCase()*/)
      .filter((s) => s.length > 0);
  }
}
