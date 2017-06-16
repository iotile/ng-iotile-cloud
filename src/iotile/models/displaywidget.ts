export class DisplayWidget {
  public label: string;
  public lid: string;
  public varType: string;
  public derivedType: string;
  public showInApp: boolean;
  public showInWeb: boolean;

  constructor(data: any = {}) {
    this.label = data.label;
    this.lid = data.lid_hex;
    this.varType = data.var_type;
    this.derivedType = data.derived_unit_type;
    this.showInApp = data.show_in_app || false;
    this.showInWeb = data.show_in_web || false;
  }
}