export interface FleetDictionary {
  [index: string]: Fleet;
}

export class Fleet {
  public id: number;
  public name: string;
  public slug: string;
  public description: string;
  public isNetwork: boolean;

  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.slug = data.slug;
    this.description = data.description;
    this.isNetwork = data.is_network;
  }

  public getPostPayload() {
    let payload = {};

    payload['name'] = this.name;
    payload['description'] = this.description;
    payload['is_network'] = this.isNetwork;

    return payload;
  }
}