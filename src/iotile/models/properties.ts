export class Properties {

  constructor(datas) {
    for (let data of datas) {
      this[data.name] = data.value;
    }
  }
}
