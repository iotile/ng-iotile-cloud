export class User {
    public username: string;
    public name: string;
    public isStaff: boolean = false;
    public email: string;
    public avatarUrl: string;
    public creationDate: string;

    public constructor(data: any = {}) {
        this.username = data.username || '';
        this.name = data.name || '';
        this.email = data.email || '';
        this.creationDate = data.created_at || Date.now();
        this.isStaff = data.is_staff || false;
        if (data.avatar) {
            this.avatarUrl = data.avatar.thumbnail;
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
