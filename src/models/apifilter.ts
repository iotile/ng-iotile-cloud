
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

    public addFilter(name: string, value: string, unique: boolean = false): void {
      let arg: string = name + '=' + value;
      if (unique) {
        this.removeFilter(name);
      }
      this.filters.push(arg);
    }

    public removeFilter(name: string): void {
      let arg: string = name + '=';
      this.filters = this.filters.filter(item =>
        item.indexOf(arg) !== 0
      );
    }
  }