export class IndexFile {
  public id: string;
  public title: string;
  public url: string;
  public fileType: string;
  public createdOn: Date;
  public createdBy: number;

  constructor(data: any = {}) {
    this.id = data['id'] || '';
    this.title = data['title'] || '';
    this.url = data['url'] || '';
    this.fileType = data['file_type'] || '';
    this.createdOn = new Date(data['created_on']) || new Date();
    this.createdBy = data['created_by'] || '';
  }
}
