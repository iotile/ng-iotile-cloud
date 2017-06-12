export class Properties {
  public shipFrom: string;
  public shipTo: string;
  public shipVia: string;
  public loadingType: string;
  public transportType: string;
  public cargoDescription: string;

  constructor(data) {
    if (data.shipFrom) {
      this.shipFrom = data.shipFrom;
    }

    if (data.shipTo) {
      this.shipTo = data.shipTo;
    }

    if (data.shipVia) {
      this.shipVia = data.shipVia;
    }

    if (data.loadingType) {
      this.loadingType = data.loadingType;
    }

    if (data.transportType) {
      this.transportType = data.transportType;
    }

    if (data.cargoDescription) {
      this.cargoDescription = data.cargoDescription;
    }
  }

}
