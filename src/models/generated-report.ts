import { IndexFile } from './index-file';
import { User } from './user';

export interface ReportPostPayoad {
  slug: string;
  template: string;
  label?: string;
  args?: Object;
}

export class GeneratedReport {
  public id: string;
  public label: string;
  public sourceRef: string;
  public createdOn: Date;
  public createdBy: string;
  public org: string;
  public status: string;
  public indexFile: IndexFile;
  public userInfo: User = new User();

  public template: string;
  public args: Object;
  public groupSlug: string;
  public token: string;

  constructor(data: any = {}) {
    this.id = data['id'] || '';
    this.sourceRef = data['source_ref'] || '';
    this.createdOn = new Date(data['created_on']) || new Date();
    this.createdBy = data['created_by'] || '';
    this.org = data['org'] || '';
    this.status = data['status'] || '';

    this.template = data['template'] || '';
    this.groupSlug = data['group_slug'] || '';
    this.token = data['token'] || '';
    this.userInfo.email = data['user'] || '';

    if ('index_file' in data && data['index_file'] != null) {
      this.indexFile = new IndexFile(data['index_file']);
    } else {
      delete this.indexFile;
    }

    if ('user_info' in data && data['user_info'] != null) {
      this.userInfo.username = data['user_info']['username'];
      this.userInfo.slug = data['user_info']['slug'];
      this.userInfo.avatarUrl = data['user_info']['tiny_avatar'];
    }

    if ('args' in data && data['args'] != null) {
      this.args = data['args'];
    } else {
      delete this.args;
    }

    if ('label' in data) {
      this.label = data['label'];
    } else if (this.template && this.sourceRef) {
      this.label = this.template + ': ' + this.sourceRef;
    } else {
      this.label = 'Generated Report';
    }
  }

  public getSchedulPostPayload(): ReportPostPayoad {
    let payload: ReportPostPayoad = {
      slug: this.sourceRef,
      label: this.label,
      template: this.template
    };

    if (this.args) {
      payload.args = this.args;
    }

    if (!payload.slug || !payload.template || !payload.label) {
      throw new Error(`Payload cannot be returned because of missing fields: ${JSON.stringify(payload, null, 2)}.`);
    }

    return payload;
  }

  public getStatusDisplay(): string {
    let factory: any = {
      'GS': 'Scheduled...',
      'G0': 'In Progress...',
      'G1':  'Completed',
      'GE': 'Error'
    };

    return factory[this.status];
  }
}
