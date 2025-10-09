const { conectarDb } = require('./database'); 
const { ObjectId } = require('mongodb');

class Tarefa {
    
    static async criar(nome, concluida = false) {
        const db = await conectarDb();             
        const collection = db.collection('tarefas');
        return new Tarefa(nome, concluida, db, collection);
    }

    constructor(nome, concluida, db, collection) {
        this.id = null;
        this.nome = nome;
        this.concluida = concluida;
        this.db = db;
        this.collection = collection;
    }

    async inserir() {
        const resultado = await this.collection.insertOne({
            nome: this.nome,
            concluida: this.concluida
        });
        this.id = resultado.insertedId;
    }

    async buscar() {
        const resultado = await this.collection.findOne({ nome: this.nome });
        if (resultado) {
            this.id = resultado._id;
            this.nome = resultado.nome;
            this.concluida = resultado.concluida;
        }
    }

    async alterar() {
        if (!this.id) return;
        await this.collection.updateOne(
            { _id: this.id },
            { $set: { nome: this.nome, concluida: this.concluida } }
        );
    }

    async deletar() {
        await this.collection.deleteOne({ nome: this.nome });
    }
}

module.exports = { Tarefa };
