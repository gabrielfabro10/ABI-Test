import { criarUsuario } from "../../support/utils/usuario";
import { criarUsuarioApi } from "../../support/utils/api";

describe("API - Usuários", () => {

    it("deve cadastrar um usuário com sucesso", () => {

        const usuario = criarUsuario();

        criarUsuarioApi(usuario)
            .then((response) => {

                expect(response.status)
                    .to.equal(201);

                expect(response.body)
                    .to.have.all.keys(
                        "message",
                        "_id"
                    );

                expect(response.body.message)
                    .to.equal("Cadastro realizado com sucesso");

                expect(response.body._id)
                    .to.be.a("string")
                    .and.not.empty;

            });

    });


    it("não deve permitir cadastrar usuário com email já utilizado", () => {

        const usuario = criarUsuario();

        criarUsuarioApi(usuario)
            .then((response) => {

                expect(response.status)
                    .to.equal(201);


                criarUsuarioApi(usuario, {
                    failOnStatusCode: false
                })
                    .then((responseDuplicado) => {

                        expect(responseDuplicado.status)
                            .to.equal(400);

                        expect(responseDuplicado.body.message)
                            .to.equal("Este email já está sendo usado");

                    });

            });

    });

});