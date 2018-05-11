import { IndexFile } from './index-file';

export interface ReportUserInfo {
  username: string;
  slug: string;
  avatarUrl: string;
}

export class GeneratedReport {
  public id: string;
  public label: string;
  public sourceRef: string;
  public url: string;
  public createdOn: Date;
  public createdBy: string;
  public org: string;
  public status: string;
  public indexFile: IndexFile;
  public userInfo: ReportUserInfo;

  constructor(data: any = {}) {
    this.id = data['id'] || '';
    this.label = data['label'] || '';
    this.sourceRef = data['source_ref'] || '';
    this.url = data['url'] || '';
    this.createdOn = new Date(data['created_on']) || '';
    this.createdBy = data['created_by'] || '';
    this.org = data['org'] || '';
    this.status = data['status'] || '';

    if ('index_file' in data && data['index_file'] != null) {
      this.indexFile = new IndexFile(data['index_file']);
    } else {
      delete this.indexFile;
    }

    if ('user_info' in data && data['user_info'] != null) {
      this.userInfo = {
        username: data['user_info']['username'],
        slug: data['user_info']['slug'],
        avatarUrl: data['user_info']['tiny_avatar']
      };
    } else {
      delete this.userInfo;
    }
  }
}
