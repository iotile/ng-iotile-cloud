export interface FleetDeviceDictionary {
  [index: string]: FleetDevice;
}

export class FleetDevice {
  public device: string;
  public alwaysOn: boolean;
  public isAccessPoint: boolean;

  constructor(data) {
    this.device = data.device;
    this.alwaysOn = data.always_on;
    this.isAccessPoint = data.is_access_point;
  }
}

export class Fleet {
  public id: number;
  public name: string;
  public slug: string;
  public description: string;
  public isNetwork: boolean;
  public members: Array<FleetDevice>;
  public memberDictionary: FleetDeviceDictionary;

  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.slug = data.slug;
    this.description = data.description;
    this.isNetwork = data.is_network;
    this.memberDictionary = {};
  }

  public addDevice(item: FleetDevice): void {
    this.members.push(item);
    this.memberDictionary[item.device] = item;
  }

  public getPostPayload() {
    let payload = {};

    payload['name'] = this.name;
    payload['description'] = this.description;
    payload['is_network'] = this.isNetwork;

    return payload;
  }
}