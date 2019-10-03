import { ObjectId } from 'bson';

export class Exercise {
    _id: string;
    name: string;
    constructor(name: string) {
        if (this._id === undefined) {
            this._id = new ObjectId() + '';
        }
        this.name = name;
    }
}