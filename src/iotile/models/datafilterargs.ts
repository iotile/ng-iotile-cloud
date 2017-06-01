
export class DataFilterArgs {
  public filter: string;
  public startDate: Date;
  public endDate: Date;
  public lastN: number;
  public page: number;
  public startIncrementalId: number;
  public endIncrementalId: number;

  public buildFilterString(): string {

    let parameters: Array<string> = [];
    if (this.startDate) {
      parameters.push('start=' + this.startDate.toISOString());
    }
    if (this.endDate) {
      parameters.push('end=' + this.endDate.toISOString());
    }
    if (this.lastN) {
      parameters.push('lastn=' + this.lastN);
    }
    if (this.page) {
      parameters.push('page=' + this.page);
    }
    if (this.filter) {
      parameters.push('filter=' + this.filter);
    }
    if (this.startIncrementalId) {
      parameters.push('streamer_id_0=' + this.startIncrementalId);
    }
    if (this.endIncrementalId) {
      parameters.push('streamer_id_1=' + this.endIncrementalId);
    }
    if (parameters.length) {
      let dataFilter: string = '?' + parameters.join('&');
      return dataFilter;
    }
    return '';
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
