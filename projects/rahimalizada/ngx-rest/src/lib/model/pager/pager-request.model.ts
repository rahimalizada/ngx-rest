export interface PagerRequestParams {
  sort?: string;
  sortDirection?: string;
  page: number;
  pageSize: number;
  searchTerms: string[];
  requestFilters?: any;
}
