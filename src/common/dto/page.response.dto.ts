export class PageResponseDto<T> {
  size: number;
  totalCount: number;
  totalPage: number;
  items: T[];
  constructor(totalCount: number, size: number, items: T[]) {
    this.size = size;
    this.totalCount = totalCount;
    this.totalPage = Math.ceil(totalCount / size);
    this.items = items;
  }
}
