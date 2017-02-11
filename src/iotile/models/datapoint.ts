
export class DataPoint {
    public timestamp: Date;
    public value: number;
    public displayValue: string;

    constructor(data: any = {}) {
      if (data.type === 'Num') {
        this.timestamp = new Date(data.timestamp);
        this.value = data.int_value;
        this.displayValue = data.display_value;
      } else{
        console.error('Illegal Data Type: ' + data.type);
      }
    }
  }