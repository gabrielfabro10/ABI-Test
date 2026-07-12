import { getFakerUser } from "../../support/utils/users";

describe("API - Users", () => {

    it("should create a user successfully", () => {

        const user = getFakerUser();

        cy.createUserWithAPI(user)
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


    it("should not allow creating a user with an email that is already in use", () => {

        const user = getFakerUser();

        cy.createUserWithAPI(user)
            .then((response) => {

                expect(response.status)
                    .to.equal(201);


                cy.createUserWithAPI(user, {
                    failOnStatusCode: false
                })
                    .then((duplicateResponse) => {

                        expect(duplicateResponse.status)
                            .to.equal(400);

                        expect(duplicateResponse.body.message)
                            .to.equal("Este email já está sendo usado");

                    });

            });

    });

});