export class Exercise {
    _id: string;
    name: string;
    constructor(init: Exercise) {
        Object.assign(this, init);
    }
}