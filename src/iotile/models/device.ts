import { SensorGraph } from './sensorgraph';
import { Property, PropertyDictionary } from './property';

export interface DeviceDictionary {
    [ index: string ]: Device
}

export class Device {
  public id: number;
  public slug: string;
  public gid: string;
  public label: string;
  public lat: number;
  public lng: number;
  public template: string;
  public sensorGraphSlug: string;
  public sg: SensorGraph;
  public propertyMap: PropertyDictionary;
  public properties: Array<Property>;

  constructor(data: any = {}) {
    this.id = data.id;
    this.slug = data.slug;
    this.gid = data.gid;
    this.label = data.label || data.slug;
    this.lat = parseFloat(data.lat || 0);
    this.lng = parseFloat(data.lon || 0);
    this.template = data.template || '';
    this.sensorGraphSlug = data.sg;
  }

  public getPatchPayload(): any {
    let payload: any = {
      label: this.label
    }
    if (this.lat) {
      payload.lat = this.lat;
    }
    if (this.lng) {
      payload.lon = this.lng;
    }
    return payload;
  }

  public addProperties(properties: Array<Property>): void {
    this.properties = properties;
    this.propertyMap = {};
    this.properties.forEach(property => {
      this.propertyMap[property.name] = property;
    });
  }

  public getProperty(name): Property {
    return this.propertyMap[name];
  }

}
