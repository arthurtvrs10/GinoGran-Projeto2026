{
  /**  Preciso criar uma API para isso, mas para teste pode ser por aqui localmente
export const products = [
  {
    id: 1,
    title: "Mármore Branco Carrara Extra Premium",
    image: "/Marmore1.jpeg", // Certifique-se que esta imagem existe na pasta public
    price: "R$ 1.200,00",
    // PROPRIEDADES OBRIGATÓRIAS PARA O FILTRO FUNCIONAR:
    category: "Mármore", 
    color: "Branco",
    finish: "Polido"
  },
  
];**/
}

const materials = ["Mármore", "Granito", "Quartzo", "Travertino", "Onyx"];
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
});
