export class Page {
  public baseUrl: string;
  public page: number;
  public pageCount: number;

  constructor(url: string, thisPage: number, pageCount: number) {
    this.baseUrl = url;
    this.page = thisPage;
    this.pageCount = pageCount;
  }

  public pageUrl() {
    let url: string = this.baseUrl;
    url += '&page=' + this.page;
    return url;
  }
}