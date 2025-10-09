const { Tarefa } = require('./modelo');

async function adicionarTarefa(nome) {
    const tarefa = await Tarefa.criar(nome);  
    await tarefa.inserir();                    
}

async function buscarTarefa(nome) {
    const tarefa = await Tarefa.criar(nome);  
    await tarefa.buscar();                     
    return tarefa;                             
}

async function atualizarTarefa(nome, concluida) {
    const tarefa = await Tarefa.criar(nome);  
    await tarefa.buscar();                     

    if (tarefa.id) {                           
        tarefa.concluida = concluida;          
        await tarefa.alterar();                
    }
}

async function removerTarefa(nome) {
    const tarefa = await Tarefa.criar(nome);  
    await tarefa.buscar();                     

    if (tarefa.id) {                          
        await tarefa.deletar();                
    }
}

module.exports = {adicionarTarefa, buscarTarefa, atualizarTarefa, removerTarefa};
