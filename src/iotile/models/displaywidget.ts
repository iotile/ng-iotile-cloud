export class DisplayWidget {
  public label: string;
  public lid: string;
  public varType: string;
  public show: boolean;

  constructor(data: any = {}) {
    this.label = data.label;
    this.lid = data.lid_hex;
    this.varType = data.var_type;
    this.show = data.show_in_app || false;
  }
}