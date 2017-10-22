
export class DataFilterArgs {
  public filter: string;
  public startDate: Date;
  public endDate: Date;
  public lastN: number;
  public page: number;
  public pageSize: number;
  public startIncrementalId: number;
  public endIncrementalId: number;
  public extras: Array<string>;

  public buildFilterString(): string {

    let parameters: Array<string> = [];
    if (this.startDate) {
      parameters.push('start=' + this.startDate.toISOString());
    }
    
    let now = new Date();
    if (!this.endDate || this.endDate > now){
      this.endDate = now
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
    if (this.pageSize) {
      parameters.push('page_size=' + this.pageSize);
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
    if (this.extras && this.extras.length > 0) {
      this.extras.forEach(p => {
        parameters.push(p);
      });
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
      filterLabel = '';
    }
    return filterLabel;
  }
}
