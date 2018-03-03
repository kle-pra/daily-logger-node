export class Log {
    _id: string;
    text: string;
    date: Date;

    constructor(text: string, date: Date) {
        this._id = null;
        this.text = text;
        this.date = date;
    }
}
