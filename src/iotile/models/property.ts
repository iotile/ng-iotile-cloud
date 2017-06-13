export class Property {
  public id: number;
  public name: string;
  public value: string;

  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.value = data.value;
  }
}
