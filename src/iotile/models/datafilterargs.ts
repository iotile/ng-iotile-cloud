
export class DataFilterArgs {
  public startDate: Date;
  public endDate: Date;
  public lastN: number;

  public buildFilterString(): string {
    let dataFilter: string = '?';
    if (this.startDate) {
      dataFilter += '&start=' + this.startDate.toISOString();
    }
    if (this.endDate) {
      dataFilter += '&end=' + this.endDate.toISOString();
    }
    if (this.lastN) {
      dataFilter += '&lastn=' + this.lastN;
    }
    return dataFilter;
  }

  public buildFilterLabel(): string {
    let filterLabel: string = '';
    if (this.startDate) {
      filterLabel += ' from ' + this.startDate.toLocaleDateString();
    }
    if (this.endDate) {
      filterLabel += ' to ' + this.endDate.toLocaleDateString();
    }
    if (this.lastN) {
      filterLabel += ' last ' + this.lastN + ' entries';
    }
    if (!this.startDate && !this.endDate && !this.lastN) {
      filterLabel = null;
    }
    return filterLabel;
  }
}