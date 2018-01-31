export class User {
    public username: string;
    public name: string;
    public isStaff: boolean = false;
    public email: string;
    public avatarUrl: string;
    public creationDate: Date;
    public tagline: string;

    public constructor(data: any = {}) {
        this.username = data.username || '';
        this.name = data.name || '';
        this.email = data.email || '';
        this.tagline = data.tagline || '';
        this.isStaff = data.is_staff || false;

        if (data.avatar) {
          this.avatarUrl = data.avatar.thumbnail;
        }

        if (data.created_at) {
          this.creationDate = new Date(data.created_at);
        } else {
          delete this.creationDate;
        }
    }

    public getFullName() {
        let name: string = '';
        if (this.name) {
            name = this.name;
        } else {
            name = this.username;
        }
        return name;
    }

    public getUsername() {
        return '@' + this.username;
    }

    public getAvatar() {
        if (this.avatarUrl) {
            return this.avatarUrl;
        } else {
            return '';
        }
    }
}
