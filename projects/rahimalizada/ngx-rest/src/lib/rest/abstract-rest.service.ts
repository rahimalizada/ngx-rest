import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PagerRequestFilters } from '../model/pager/pager-request-filters.model';
import { PagerResult } from '../model/pager/pager-result.model';

export abstract class AbstractRestService<T> {
  constructor(protected httpClient: HttpClient, protected basePath: string) {}

  private parseSearchTerms(termsString: string): string[] {
    if (!termsString) {
      return [];
    }
    return termsString
      .split(' ')
      .map((s) => s.trim() /* .toLowerCase()*/)
      .filter((s) => s.length > 0);
  }

  buildParams(
    page: number,
    pageSize: number,
    sort: string,
    sortDirection: string,
    searchTerms?: string,
    requestFilters?: PagerRequestFilters,
  ): HttpParams {
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
    requestFilters?: PagerRequestFilters,
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
    requestFilters?: PagerRequestFilters,
  ): Observable<PagerResult<T>> {
    const params = this.buildParams(page, pageSize, sort, sortDirection, searchTerms, requestFilters);
    return this.httpClient.get<PagerResult<T>>(`${this.basePath}/${path}`, { params });
  }

  getAll() {
    return this.httpClient.get<T[]>(this.basePath);
  }

  get() {
    return this.httpClient.get<T>(this.basePath);
  }

  getByPath(path: string) {
    return this.httpClient.get<T>(`${this.basePath}/${path}`);
  }

  create(data: T) {
    return this.httpClient.put<void>(this.basePath, data);
  }

  update(data: T) {
    return this.httpClient.post<void>(this.basePath, data);
  }

  updateByPath(path: string, data: T) {
    return this.httpClient.post<void>(`${this.basePath}/${path}`, data);
  }

  patchByPath(path: string, data: T) {
    return this.httpClient.patch<void>(`${this.basePath}/${path}`, data);
  }

  deleteByPath(path: string) {
    return this.httpClient.delete<void>(`${this.basePath}/${path}`);
  }
}
