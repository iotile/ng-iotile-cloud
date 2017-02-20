import { Mdo } from './mdo';

export class Unit {
  public mdo: Mdo;
  public fullName: string;
  public shortName: string;
  public id: number;

  constructor(data: any = {}) {
    this.mdo = new Mdo(data);
    this.fullName = data.unit_full;
    this.shortName = data.unit_short;
    this.id = data.id;
  }
}
