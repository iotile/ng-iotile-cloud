
const PADDING = '000000';

export class Stats {
    public min: number;
    public max: number;
    public count: number = 0;
    public sum: number;
    public avg: number;
    public intervalDays: number;

    constructor(data: any = {}) {
      this.min = data.min;
      this.max = data.max;
      this.count = data.count;
      this.sum = data.sum;
      this.avg = data.avg;
      this.intervalDays = data.interval_days;
    }

    private _formatNumber(value: number, decimals: number): string {
      let decimalDeparator: string = '.';
      let result: string;
      let [ integer, fraction = '' ] = value.toString().split(decimalDeparator);
      fraction = decimals > 0
        ? decimalDeparator + (fraction + PADDING).substring(0, decimals)
        : '';
      result = integer + fraction;
      return result;
    }

    public getFormattedAvg(): string {
      if (this.avg) {
        return this._formatNumber(this.avg, 3);
      }
      return '';
    }
  }