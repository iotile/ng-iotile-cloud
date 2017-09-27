export interface PropertyDictionary {
  [index: string]: Property;
}

export class Property {
  public id: number;
  public name: string;
  public value: string;
  public type: string;

  constructor(data) {
    if ('id' in data) {
      this.id = data.id;
    }

    this.name = data.name;
    this.value = data.value;
    this.type = data.type;
  }

  public getPostPayload() {
    let payload = {};
    let type = this.type.toLowerCase() + '_value';

    payload['id'] = this.id;
    payload['name'] = this.name;
    payload[type] = this.value;

    return payload;
  }
}
