const readline = require("readline-sync");
const conecta = require("./database");

async function inserir(nomeTarefa) {
    const db = await conecta();
    const collection = await db.collection("tarefas");
    const resultado = await collection.insertOne({
    nome: nomeTarefa,
    concluida: false
});

console.log("Tarefa criada com sucesso", resultado);
}

async function buscar(nomeTarefa) {
    const db = await conecta();
    const collection = db.collection("tarefas");
    const resultado = collection.findOne({ nome: nomeTarefa}) ;
    console.log(resultado);   
}


async function main() {
    while(true){
        console.log("Menu Princial");
        console.log("1 - Criar tarefa");
        console.log("2 - Buscar tarefa");
        console.log("3 - Alterar tarefa");
        console.log("4 - Remover tarefa");
        console.log("5 - Sair");
        const opcao = readline.question("Entre com a sua opcao:");
        switch(parseInt(opcao)) {
            case 1: {
                const nome = readline.question("Informe o nome da tarefa: ");
                await inserir(nome);
                break;
            }
            case 2: break;
            case 3: break;
            case 4: break;
            case 5: process.exit(0);
        }
    }    
}

main();