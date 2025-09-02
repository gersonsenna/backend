const { calcularMediaAluno } = require('../src/calcularMediaAluno');

describe('calcularMediaAluno', () => {
  
  test('Definir', () => {
    expect(calcularMediaAluno).toBeDefined();
  });

 
  test('Notas a1 ou a2 não informada', () => {
    expect(() => calcularMediaAluno(undefined, 5)).toThrow('Notas a1 ou a2 não informadas');
    expect(() => calcularMediaAluno(7, undefined)).toThrow('Notas a1 ou a2 não informadas');
  });

  
  test('Notas a1 ou a2 não podem ser negativa', () => {
    expect(() => calcularMediaAluno(-1, 6)).toThrow('Notas a1 ou a2 não podem ser negativas');
    expect(() => calcularMediaAluno(8, -5)).toThrow('Notas a1 ou a2 não podem ser negativas');
  });

  
  test('Quando a3 não é informada', () => {
    const resultado = calcularMediaAluno(6, 8);
    expect(resultado).toBeCloseTo(6 * 0.4 + 8 * 0.6);
  });

  
  test('Nota a3 não pode ser negativa', () => {
    expect(() => calcularMediaAluno(7, 8, -2)).toThrow('Nota a3 não pode ser negativa');
  });

  test('Melhor combinação entre a1 e a3', () => {
    const resultado = calcularMediaAluno(4, 9, 10);
    
    expect(resultado).toBeCloseTo(9 * 0.6 + 10 * 0.4);
  });

  
  test('Melhor combinação entre a2 e a3', () => {
    const resultado = calcularMediaAluno(9, 4, 10);
    
    expect(resultado).toBeCloseTo(9 * 0.4 + 10 * 0.6);
  });

});
