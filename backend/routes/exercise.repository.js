const uuid = require('uuid').v1;
const mongo = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017/pump-to-the-max';

class ExerciseRepository {

    async getExercises() {
        console.log(url);
        const client = await this.getClient();
        let collection = this.getCollection(client);
        let result = await collection.find({});
        let resultAsArray = await result.toArray();
        return resultAsArray.map(n => n._id);
    }

    async createExercise(exerciseName) {
        const client = await this.getClient();
        let collection = this.getCollection(client);

        let exerciseUuid = uuid();
        let exercise = { _id: exerciseUuid, name: exerciseName };

        await collection.insertOne(exercise);

        return exerciseUuid;
    }

    async getExercise(exerciseUuid) {
        const client = await this.getClient();
        let collection = this.getCollection(client);
        return await collection.findOne({_id: exerciseUuid});
    }

    async getClient() {
        return await mongo.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).catch((err) => console.log(err));
    }

    async getNotes(exerciseUuid) {
        const client = await this.getClient();
        let collection = this.getCollection(client);

        let exercise = await collection.findOne({_id: exerciseUuid});
        return exercise.notes;
    }

    async deleteNote(exerciseUuid, noteUid) {
        const client = await this.getClient();
        let collection = this.getCollection(client);
        let exercise = await collection.findOne({_id: exerciseUuid});

        let filteredNotes = exercise.notes.filter(n => n._id !== noteUid);
        await collection.updateOne({_id: exerciseUuid}, { $set: {notes: filteredNotes}}, exercise);
        return true;
    }

    getCollection(client) {
        const db = client.db('notes-example-app');
        let collection = db.collection('exercises');
        return collection;
    }
}

module.exports = ExerciseRepository; 