const readline = require('readline-sync');

const controlador = require('./controlador');

function menu() {
    console.log("TAREFAS");
    console.log("1 - Adicionar tarefa");
    console.log("2 - Buscar tarefa");
    console.log("3 - Atualizar tarefa");
    console.log("4 - Remover tarefa");
    console.log("5 - Sair");
}

async function escolherOpcao(opcao) {
    switch (parseInt(opcao)) {
        case 1: {
            
            const nome = readline.question("Digite o nome da tarefa: ");
            await controlador.adicionarTarefa(nome);
            break;
        }
        case 2: {
            
            const nome = readline.question("Digite o nome da tarefa: ");
            const tarefa = await controlador.buscarTarefa(nome);
            if (tarefa.id) {
                console.log("Tarefa encontrada:");
                console.log(`ID: ${tarefa.id}`);
                console.log(`Nome: ${tarefa.nome}`);
                console.log(`Concluída: ${tarefa.concluida}`);
            }
            break;
        }
        case 3: {
            
            const nome = readline.question("Digite o nome da tarefa para atualizar: ");
            const concluidaStr = readline.question("A tarefa está concluída? (s/n): ").toLowerCase();
            const concluida = concluidaStr === 's';
            await controlador.atualizarTarefa(nome, concluida);
            break;
        }
        case 4: {
            
            const nome = readline.question("Digite o nome da tarefa a remover: ");
            await controlador.removerTarefa(nome);
            break;
        }
        case 5: {
           
            console.log("Saindo...");
            process.exit(0);
        }
        default:
            console.log("Opcao inválida. Tente novamente.");
    }
}

async function main() {
    while (true) {
        menu(); 
        const opcao = readline.question("Escolha uma opcaoo: ");
        await escolherOpcao(opcao);
    }
}


main();
