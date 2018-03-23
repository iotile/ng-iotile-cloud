import { SensorGraph } from './sensorgraph';
import { Property, PropertyDictionary } from './property';
import { DataBlock } from './datablock';

export interface DeviceDictionary {
    [ index: string ]: Device;
}

export class Device {
  public id: number;
  public slug: string;
  public gid: string;
  public externalId: string;
  public label: string;
  public active: boolean;
  public state: string;
  public busy: boolean = false;
  public lat: number;
  public lng: number;
  public template: string;
  public sensorGraphSlug: string;
  public sg: SensorGraph;
  public project: string;
  public propertyMap: PropertyDictionary;
  public properties: Array<Property>;
  public dataBlock: DataBlock;

  constructor(data: any = {}) {
    this.id = data.id;
    this.slug = data.slug;
    this.gid = data.gid;
    this.active = data.active;
    this.state = data.state;
    this.externalId = data.external_id;
    this.label = data.label || data.slug;
    this.lat = parseFloat(data.lat || 0);
    this.lng = parseFloat(data.lon || 0);
    this.template = data.template || '';
    this.sensorGraphSlug = data.sg;
    this.project = data.project;
    if ('busy' in data) {
      this.busy = data.busy
    }
  }

  public getPatchPayload(): any {
    let payload: any = {
      label: this.label
    };
    if (this.lat) {
      payload.lat = this.lat;
    }
    if (this.lng) {
      payload.lon = this.lng;
    }
    payload.active = this.active;

    if (this.state) {
      payload.state = this.state;
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

  public getProperty(name: string): Property {
    return this.propertyMap[name];
  }

  public isDataBlock(): boolean {
    return (this.dataBlock != null);
  }

}
