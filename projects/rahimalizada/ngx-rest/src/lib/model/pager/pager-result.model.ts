export class PagerResult<T> {
  page: number;
  pageSize: number;
  total: number;
  hasMore: boolean;
  items: T[];
}
