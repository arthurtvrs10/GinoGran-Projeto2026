// Preciso criar uma API para isso, mas para teste pode ser por aqui localmente
// src/data/products.ts

export interface Product {
  id: number;
  title: string;
  image: string;
  price: string;
  category: string;
  color: string;
  finish: string;
}

export const products: Product[] = [
  {
    id: 1,
    title: "Mármore Branco Carrara Extra Premium",
    image: "/Marmore1.jpeg",
    price: "R$ 1.200,00",
    category: "Mármore",
    color: "Branco",
    finish: "Polido",
  },
  {
    id: 2,
    title: "Granito Preto São Gabriel",
    image: "/Marmore2.jpeg",
    price: "R$ 650,00",
    category: "Granito",
    color: "Preto",
    finish: "Levigado",
  },
  {
    id: 3,
    title: "Quartzo Branco Stellar",
    image: "/Marmore3.jpeg",
    price: "R$ 1.800,00",
    category: "Quartzo",
    color: "Branco",
    finish: "Polido",
  },
  {
    id: 4,
    title: "Travertino Romano Bruto",
    image: "/Marmore1.jpeg",
    price: "R$ 950,00",
    category: "Travertino",
    color: "Bege",
    finish: "Bruto",
  },
  {
    id: 5,
    title: "Mármore Marrom Imperador",
    image: "/Marmore2.jpeg",
    price: "R$ 1.450,00",
    category: "Mármore",
    color: "Marrom",
    finish: "Polido",
  },
  // Copie e cole o bloco acima para adicionar mais produtos...
];

/**const materials = ["Mármore", "Granito", "Quartzo", "Travertino", "Onyx"];
const colors = ["Branco", "Preto", "Cinza", "Bege", "Verde", "Rosa", "Marrom"];
const qualities = ["Premium", "Extra", "Importado", "Nacional", "Super"];
const finishes = ["Polido", "Levigado", "Escovado"];

const getRandom = (arr: string[]) =>
  arr[Math.floor(Math.random() * arr.length)];

// Função para formatar preço em BRL
const formatPrice = (value: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

// 2. Gerador do Array de Produtos
// Mude o 'length: 20' para a quantidade que quiser (ex: 50, 100)
export const products = Array.from({ length: 12 }).map((_, index) => {
  const randomPrice = Math.floor(Math.random() * (2000 - 400 + 1) + 400);

  const material = getRandom(materials);
  const color = getRandom(colors);
  const finish = getRandom(finishes);

  const title = `${material} ${color} ${getRandom(qualities)} ${finish}`;

  const imageNum = (index % 3) + 1;

  return {
    id: index + 1,
    title: title,
    image: `/Marmore${imageNum}.jpeg`,
    price: formatPrice(randomPrice),
    category: material,
    color: color,
    finish: finish,
  };
});*/
