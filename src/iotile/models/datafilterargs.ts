// See https://github.com/aurelia/skeleton-navigation/issues/606#issuecomment-234509751
import * as moment from 'moment';
// import moment from 'moment';

export class DataFilterArgs {
  public startDate: Date;
  public endDate: Date;
  public lastN: number;

  public buildFilterString(): string {
    let dataFilter: string = '?';
    if (this.startDate) {
      dataFilter += '&start=' + (moment as any).default(this.startDate).toISOString();
    }
    if (this.endDate) {
      dataFilter += '&end=' + (moment as any).default(this.endDate).toISOString();
    }
    if (this.lastN) {
      dataFilter += '&lastn=' + this.lastN;
    }
    return dataFilter;
  }

  public buildFilterLabel(): string {
    let filterLabel: string = '';
    if (this.startDate) {
      filterLabel += ' from ' + (moment as any).default(this.startDate).format('YYYY/MM/DD');
    }
    if (this.endDate) {
      filterLabel += ' to ' + (moment as any).default(this.endDate).format('YYYY/MM/DD');
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