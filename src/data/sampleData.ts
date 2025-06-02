
// Este arquivo contém os dados do CSV fornecido
// Você pode adicionar o resto dos dados aqui conforme necessário

export const agriculturalData = [
  {
    produto: "ABACAXI",
    classificao_produto: "HAVAÍ",
    uf: "PR",
    preco_atual_jan: 3.48,
    previsao_jan: 3.16,
    preco_atual_fev: 3.8,
    previsao_fev: 3.39,
    preco_atual_mar: null,
    previsao_mar: 3.39,
    preco_atual_abr: null,
    previsao_abr: 3.39,
    preco_atual_mai: null,
    previsao_mai: 3.39,
    previsao_jun: 3.39,
    previsao_min_jun: 2.72,
    previsao_max_jun: 4.07,
    acuracia_modelo_perc: 94.42
  },
  {
    produto: "BANANA",
    classificao_produto: "PRATA",
    uf: "SP",
    preco_atual_jan: 2.92,
    previsao_jan: 2.94,
    preco_atual_fev: 3.36,
    previsao_fev: 3.24,
    preco_atual_mar: 3.15,
    previsao_mar: 3.13,
    preco_atual_abr: 2.84,
    previsao_abr: 2.96,
    preco_atual_mai: 2.81,
    previsao_mai: 2.78,
    previsao_jun: 2.78,
    previsao_min_jun: 2.43,
    previsao_max_jun: 3.13,
    acuracia_modelo_perc: 94.02
  },
  {
    produto: "CAFE",
    classificao_produto: "ARÁBICA TIPO 6, BEBI",
    uf: "MG",
    preco_atual_jan: 38.33,
    previsao_jan: 37.53,
    preco_atual_fev: 43.29,
    previsao_fev: 42.99,
    preco_atual_mar: 42.25,
    previsao_mar: 41.88,
    preco_atual_abr: 42.67,
    previsao_abr: 41.96,
    preco_atual_mai: 41.99,
    previsao_mai: 42.41,
    previsao_jun: 42.41,
    previsao_min_jun: 40.42,
    previsao_max_jun: 44.39,
    acuracia_modelo_perc: 98.32
  },
  {
    produto: "SOJA",
    classificao_produto: "EM GRÃOS",
    uf: "MT",
    preco_atual_jan: 45.16,
    previsao_jan: 44.8,
    preco_atual_fev: 50.48,
    previsao_fev: 50.35,
    preco_atual_mar: 53.05,
    previsao_mar: 52.21,
    preco_atual_abr: 54.86,
    previsao_abr: 52.23,
    preco_atual_mai: 57.51,
    previsao_mai: 57.04,
    previsao_jun: 57.04,
    previsao_min_jun: 53.86,
    previsao_max_jun: 60.22,
    acuracia_modelo_perc: 96.39
  },
  {
    produto: "MILHO",
    classificao_produto: "EM GRÃOS",
    uf: "RS",
    preco_atual_jan: 44.96,
    previsao_jan: 43.29,
    preco_atual_fev: 52.8,
    previsao_fev: 52.1,
    preco_atual_mar: 57.18,
    previsao_mar: 57.0,
    preco_atual_abr: 63.06,
    previsao_abr: 58.34,
    preco_atual_mai: 66.12,
    previsao_mai: 64.23,
    previsao_jun: 64.23,
    previsao_min_jun: 59.32,
    previsao_max_jun: 69.15,
    acuracia_modelo_perc: 96.63
  }
];

// Função para obter produtos únicos
export const getUniqueProducts = () => {
  return [...new Set(agriculturalData.map(item => item.produto))];
};

// Função para obter estados únicos
export const getUniqueStates = () => {
  return [...new Set(agriculturalData.map(item => item.uf))];
};

// Função para filtrar dados por produto e/ou estado
export const filterData = (product?: string, state?: string) => {
  return agriculturalData.filter(item => {
    const matchesProduct = !product || item.produto === product;
    const matchesState = !state || item.uf === state;
    return matchesProduct && matchesState;
  });
};
