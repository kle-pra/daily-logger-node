export class User {
    _id: string;
    email: string;
    password: string;

    constructor(email: string, password: string) {
        this._id = null;
        this.email = email;
        this.password = password;
    }
}
