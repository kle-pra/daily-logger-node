export class Log {

    id: string;
    text: string;
    date: Date;

    constructor(text: string, date: Date) {
        this.text = text;
        this.date = date;
    }

}