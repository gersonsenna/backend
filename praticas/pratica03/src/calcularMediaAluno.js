function calcularMediaAluno(a1, a2, a3) {
    // Validação se a1 ou a2 não foram informadas
    if (a1 === undefined || a2 === undefined) {
      throw new Error('Notas a1 ou a2 não informadas');
    }
  
    // Validação se a1 ou a2 são negativas
    if (a1 < 0 || a2 < 0) {
      throw new Error('Notas a1 ou a2 não podem ser negativas');
    }
  
    // Caso a3 não seja informada → cálculo base
    if (a3 === undefined) {
      return a1 * 0.4 + a2 * 0.6;
    }
  
    // Validação se a3 é negativa
    if (a3 < 0) {
      throw new Error('Nota a3 não pode ser negativa');
    }
  
    // Cálculo das médias possíveis considerando as regras do teste
    const media1 = a1 * 0.4 + a2 * 0.6; // combinação a1 + a2
    const media2 = a1 * 0.4 + a3 * 0.6; // combinação a1 + a3
    const media3 = a3 * 0.4 + a2 * 0.6; // combinação a3 + a2
  
    // Retorna a maior média
    return Math.max(media1, media2, media3);
  }
  
  // Exporta a função para os testes
  module.exports = { calcularMediaAluno };
  