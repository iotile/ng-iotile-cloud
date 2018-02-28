interface NoteUserInfo {
  username: string;
  slug: string;
  tinyAvatar: string;
}

interface NoteAttachment {
  title: string;
  url: string;
  fileType: string;
}

export class Note {
  public id: number = 0;
  public target: string;
  public timestamp: string;
  public note: string;
  public type: string = 'ui';
  public userInfo: NoteUserInfo;
  public attachment: NoteAttachment;

  constructor(data) {
    this.target = data.target;
    this.timestamp = data.timestamp || new Date().toISOString();
    this.note = data.note;
    this.type = data.type;

    if ('id' in data) {
      this.id = data.id;
    }

    if ('user_info' in data) {
      this.userInfo = {
        username: data.user_info.username,
        slug: data.user_info.slug,
        tinyAvatar: data.user_info.tiny_avatar
      };
    }

    if ('attachment' in data) {
      this.attachment = {
        title: data.attachment.title,
        url: data.attachment.url,
        fileType: data.attachment.file_type
      };
    }
  }

  public postPayload() {
    let payload = {
      target: this.target,
      timestamp: this.timestamp,
      note: this.note,
      type: this.type
    };
    return payload;
  }
}