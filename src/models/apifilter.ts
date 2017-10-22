
export class ApiFilter {
    private filters: Array<string> = [];

    public filterString(): string {
      // Build a '?name1=val1&name2=val2' string
      if (this.filters.length) {
        let dataFilter: string = '?' + this.filters.join('&');
        return dataFilter;
      }
      return '';
    }

    public addFilter(name: string, value: string): void {
      let arg: string = name + '=' + value;
      this.filters.push(arg);
    }
  }