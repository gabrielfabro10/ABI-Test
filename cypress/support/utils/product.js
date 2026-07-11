import { faker } from '@faker-js/faker';

export function createProduct() {
  return {
    nome: faker.commerce.productName(),
    preco: parseInt(faker.commerce.price({ min: 10, max: 1000 })),
    descricao: faker.commerce.productDescription(),
    quantidade: faker.number.int({ min: 1, max: 500 })
  };
}
