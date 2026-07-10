import { faker } from '@faker-js/faker';

export function criarUsuario() {
  return {
    nome: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    administrador: "true"
  };
}