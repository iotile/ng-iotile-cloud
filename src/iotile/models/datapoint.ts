export class DataPage {
  public pageSize: number;
  public totalCount: number;
  public page: number;
  public data: Array<DataPoint>;

  constructor(pageSize: number, count:number, thisPage: number) {
    this.pageSize = pageSize;
    this.totalCount = count;
    this.page = thisPage;
  }

  public pageCount (): number {
    return this.totalCount / this.pageSize;
  }
}

export class DataPoint {
    public timestamp: Date;
    public rawValue: number;
    public value: number;
    public outValue: number;
    public displayValue: string;

    constructor(data: any = {}) {
      this.timestamp = new Date(data.timestamp);
      if ('value' in data) {
        // NewScheme: Value represents a number as per the Stream's VarType
        this.value = data.value;
      }
      if ('int_value' in data) {
        // OldScheme: We only store the raw number from the device
        this.rawValue = data.int_value;
      }
      if ('output_value' in data) {
        this.outValue = data.output_value;
      }
      if ('display_value' in data) {
        this.displayValue = data.display_value;
      }
    }
  }