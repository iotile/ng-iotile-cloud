export class Location {
  public target: string;
  public timestamp: string;
  public lat: string;
  public lon: string;

  constructor(data: any) {
    this.target = data.target;
    this.timestamp = data.timestamp || new Date().toISOString();
    this.lat = data.lat;
    this.lon = data.lon;
  }

  public getPosition(): any {
    return {
      lat: parseFloat(this.lat),
      lng: parseFloat(this.lon)
    };
  }
}
