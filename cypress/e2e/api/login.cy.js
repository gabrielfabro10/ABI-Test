import { criarUsuario } from "../../support/utils/usuario";
import { criarUsuarioApi, loginApi } from "../../support/utils/api";


describe("API - Login", () => {

    it("deve realizar login com usuário válido", () => {

        const usuario = criarUsuario();

        criarUsuarioApi(usuario)
            .then((responseCadastro) => {

                expect(responseCadastro.status)
                    .to.equal(201);


                loginApi({
                    email: usuario.email,
                    password: usuario.password
                })
                    .then((responseLogin) => {

                        expect(responseLogin.status)
                            .to.equal(200);


                        expect(responseLogin.body.message)
                            .to.equal("Login realizado com sucesso");


                        expect(responseLogin.body.authorization)
                            .to.be.a("string")
                            .and.not.empty;


                        Cypress.env("token", responseLogin.body.authorization);

                    });

            });

    });


    it("não deve realizar login com senha inválida", () => {

        const usuario = criarUsuario();

        criarUsuarioApi(usuario)
            .then((responseCadastro) => {

                expect(responseCadastro.status)
                    .to.equal(201);


                loginApi({
                    email: usuario.email,
                    password: "senhaIncorreta"
                }, {
                    failOnStatusCode: false
                })
                    .then((responseLogin) => {

                        expect(responseLogin.status)
                            .to.equal(401);

                        expect(responseLogin.body.message)
                            .to.equal("Email e/ou senha inválidos");

                    });

            });

    });

});