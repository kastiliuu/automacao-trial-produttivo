import { faker } from '@faker-js/faker';

//  O código fornecido é um script de teste Cypress para automatizar testes no site do Produttivo.
//  Vou passear aqui pelo código e adicionar comentários para explicar cada seção e linhas de código.


//  1 - O import ali encima da biblioteca do faker '@faker-js/faker' será para gerar dados falsos para os testes, 
//      assim sempre que rodarmos terá novos dados diferentes para não causar conflitos de dados.
//  2 - O bloco desse describe define um conjunto de testes intitulada “Testes automatizados do trial Produttivo”.
//  3 - O before é usado para gerar valores aleatórios para as variáveis name​​, lastName, email, phonee e password usando o faker.

describe('Testes automatizados do trial Produttivo', () => {
    
    let email;
    let name;
    let lastName; 
    let phone;
    let password;

    before(() => {
      name = faker.person.firstName();
      lastName = faker.person.lastName();
      email = faker.internet.email({ firstName: `${name}`, lastName: `${lastName}`}).toLowerCase();
      phone = faker.number.int({ min: 999000000, max: 999999999});
      password = faker.internet.password({ length: 15, memorable: true, pattern: /[A-Z]/ }).toUpperCase();

     });
    
 //  1 - Este teste visita o site do Produttivo e verifica se o botão com o texto “Iniciar Teste” existe na página.
     it('Visitando o site e checando se existe o botão "Iniciar Teste"', () => {
      cy.visit('https://www.produttivo.com.br/cadastro/')
      cy.contains('Iniciar teste').should('exist')
    })

//   1 - Este teste preenche o campo “Seu e-mail profissional” com um email de valor gerado pelo faker. 
//   2 - Em seguida, verifica se o campo possui o valor esperado que foi a pouco adicionado.

    it('Preenchendo o campo "Seu e-mail profissional" utilizando o Faker', () => {
        cy.get('input[placeholder="nome@empresa.com"]').type(`${email}`);
        cy.get('input[placeholder="nome@empresa.com"]').should('have.value', `${email}`);
      });

//   1 - Este teste preenche o campo "Qual o seu primeiro nome?" com o valor gerado usando o faker.
//   2 - Em seguida, verifica se o campo possui o valor esperado que foi a pouco adicionado.

      it('Preenchendo o campo "Qual o seu primeiro nome?" utilizando o Faker', () => {
        cy.get('input[placeholder="João"]').type(`${name}`);
        cy.get('input[placeholder="João"]').should('have.value', `${name}`);
      });

//   1 - Este teste preenche o campo "Qual o seu sobrenome?" com o valor gerado usando o faker.
//   2 - Em seguida, verifica se o campo possui o valor esperado que foi a pouco adicionado.   

      it('Preenchendo o campo "Qual o seu sobrenome?" utilizando o Faker', () => {
        cy.get('input[placeholder="da Silva"]').type(`${lastName}`);
        cy.get('input[placeholder="da Silva"]').should('have.value', `${lastName}`);
      });

//   1 - Este teste preenche o campo "Em qual empresa você trabalha?" com o valor fixo "Produttivo".
//   2 - Em seguida, verifica se o campo possui o valor esperado que foi a pouco adicionado.

      it('Preenchendo o campo "Em qual empresa você trabalha?"', () => {
        cy.get('input[placeholder="Nome da empresa"]').type('Produttivo');
        cy.get('input[placeholder="Nome da empresa"]').should('have.value', 'Produttivo');
      });

//   1 - Este teste valida a lista suspensa de seleção do código do país selecionando uma opção aleatória.
//   2 - Ele obtém o elemento select usando o nome da class '.phone--form-group select' e recupera o número das opções disponíveis.
//   3 - Gera um índice aleatório dentro do intervalo de opções disponíveis e seleciona a opção correspondente.
//   4 - Em seguida, verifica se a opção selecionada possui o valor esperado e aguarda 3 segundos.

      it('Validando o select de country code e selecionando um item aleatório', () => {
        cy.get('.phone--form-group select').then(($select) => {
            const optionsCount = $select.find('option').length;
            const randomIndex = Cypress._.random(1, optionsCount - 1);
            const randomValue = $select.find('option').eq(randomIndex).val();
            cy.get('.phone--form-group select').select(randomValue, { force: true }).should('have.value', randomValue);
            cy.wait(3000)
        });
      });

//   1 - Este teste valida o menu suspenso de seleção do código do país selecionando a opção com o valor "+55".
//   2 - Ele obtém o elemento select usando o nome da classe '.phone--form-group select' e seleciona a opção com o valor "+55".
//   3 - Em seguida, verifica se a opção selecionada possui o valor esperado.

      it('Validando o select de country code selecionando o item com valor +55', () => {
        cy.get('.phone--form-group select').select('+55', { force: true }).should('have.value', '+55');
    });

//   1 - Este teste adiciona um código de área brasileiro válido (DDD) selecionado aleatoriamente do fieldValuesarray ao campo "DDD".
//   2 - Ele gera um índice aleatório dentro do intervalo de códigos de área disponíveis e digita o valor correspondente no campo.    
    it('Adicionando um DDD válido de um estado brasileiro de forma aleatória', () => {
        const fieldValues = ["11", "12", "13", "14", "15", "16", "17", "18", "19", "21", "22", "24", "27", "28", "31", "32", "33", "34", "35", "37", "38", "41", "42", "43", "44", "45", "46", "47", "48", "49", "51", "53", "54", "55", "61", "62", "63", "64", "65", "66", "67", "68", "69", "71", "73", "74", "75", "77", "79", "81", "82", "83", "84", "85", "86", "87", "88", "89", "91", "92", "93", "94", "95", "96", "97", "98", "99"];
        const randomValue = fieldValues[Math.floor(Math.random() * fieldValues.length)];
        cy.get('input[placeholder="DDD"]').type(randomValue);
      });

//   1 - Este teste adiciona um número de telefone gerado aleatoriamente usando o faker ao campo de numero de telefone.

      it('Adicionando um número de telefone usando o Faker', () => {
        cy.get('input[placeholder="9 9999-9999"]').type(`${phone}`);
      });

//   1 - Este teste valida se a caixa de seleção está desmarcada.
//   2 - Ele verifica se o elemento de checkbox não possui o 'checked' atribuido e não possui o 'aria-hidden' atribuido também.

      it('Validar se o checkbox está desmarcado', () => {
        cy.get('input[type="checkbox"]').should('not.be.checked');
        cy.get('input[type="checkbox"]').should('not.have.attr', 'aria-hidden');
      });

//   1 - Este teste marca a caixa de seleção verificando o elemento de entrada usando o 'check' com a opção 'force' definida como 'true'.
//   2 - Em seguida, verifica se o elemento da caixa de seleção está marcado.

      it('Selecionando e validando a seleção do Checkbox', () => {
        cy.get('input[type="checkbox"]').check({ force: true });
        cy.get('input[type="checkbox"]').should('be.checked');
      });

//  1 - Este teste insere uma senha gerada aleatoriamente com letras maiúsculas no campo de entrada de senha.
//  2 - Verifica se o campo de entrada da senha possui o valor esperado.      

      it('Inserindo uma senha de letras maiusculas no campo de senha', () => {
        cy.get('input[type="password"]').type(`${password}`);
        cy.get('input[type="password"]').should('have.value', `${password}`);
      });

//  1 - Este teste clica no botão com o texto “Ver senha” para alternar a visibilidade e mostrar a senha.
//  2 - Aguarda 2 segundos usando o comando wait.
//  3 - Em seguida, verifica se o campo possui o valor esperado.      

      it('Clicar e verificar a senha', () => {
        cy.get('button[type="button"]').contains('Ver senha').click();
        cy.wait(2000);
        cy.get('input[autocomplete="newPassword"]').should('have.value', `${password}`);
      });

//  1 - Este teste valida o campo “Seu e-mail profissional” como campo obrigatório.
//  2 - Ele preenche os campos com os valores gerados 'name', 'lastName', 'email', 'phonee' e 'password'.
//  3 - Ele verifica se o checkbox está desmarcado e não possui o 'aria-hidden' atribuido.
//  4 - Em seguida, clica no botão com o texto “Iniciar teste” e verifica se a mensagem de erro “Campo Obrigatório” está visível.
//  5 - Este teste vai ter um retorno de erro pois o campo obrigatório desse teste não tem a mensagem visivel (BUG?)
      it('Validando o campo obrigatório "Seu e-mail profissional"', () => {
        const fieldValues = ["11", "12", "13", "14", "15", "16", "17", "18", "19", "21", "22", "24", "27", "28", "31", "32", "33", "34", "35", "37", "38", "41", "42", "43", "44", "45", "46", "47", "48", "49", "51", "53", "54", "55", "61", "62", "63", "64", "65", "66", "67", "68", "69", "71", "73", "74", "75", "77", "79", "81", "82", "83", "84", "85", "86", "87", "88", "89", "91", "92", "93", "94", "95", "96", "97", "98", "99"];
        const randomValue = fieldValues[Math.floor(Math.random() * fieldValues.length)];
        cy.visit('https://www.produttivo.com.br/cadastro/')
        cy.get('input[placeholder="João"]').type(`${name}`);
        cy.get('input[placeholder="João"]').should('have.value', `${name}`);
        cy.get('input[placeholder="da Silva"]').type(`${lastName}`);
        cy.get('input[placeholder="da Silva"]').should('have.value', `${lastName}`);
        cy.get('input[placeholder="Nome da empresa"]').type('Produttivo');
        cy.get('input[placeholder="Nome da empresa"]').should('have.value', 'Produttivo');
        cy.get('.phone--form-group select').select('+55', { force: true }).should('have.value', '+55');
        cy.get('input[placeholder="DDD"]').type(randomValue);
        cy.get('input[placeholder="9 9999-9999"]').type(`${phone}`);
        cy.get('input[type="checkbox"]').should('not.be.checked');
        cy.get('input[type="checkbox"]').should('not.have.attr', 'aria-hidden');
        cy.get('input[type="password"]').type(`${password}`);
        cy.get('input[type="password"]').should('have.value', `${password}`);
        cy.get('span:contains("Iniciar teste")').click();
        cy.contains('Campo Obrigatório').should('be.visible');
      });

//  1 - Este teste valida o teste "Qual o seu primeiro nome?" como um campo obrigatório.
//  2 - Ele preenche os campos de entrada com os valores gerados 'name', 'lastName', 'email', 'phonee' e 'password'.
//  3 - Ele verifica se o checkbox está desmarcado e não possui o 'aria-hidden' atribuído.
//  4 - Em seguida, clica no botão com o texto “Iniciar teste” e verifica se a mensagem de “Campo Obrigatório” está visível.

      it('Validando o campo obrigatório "Qual o seu primeiro nome?"', () => {
        const fieldValues = ["11", "12", "13", "14", "15", "16", "17", "18", "19", "21", "22", "24", "27", "28", "31", "32", "33", "34", "35", "37", "38", "41", "42", "43", "44", "45", "46", "47", "48", "49", "51", "53", "54", "55", "61", "62", "63", "64", "65", "66", "67", "68", "69", "71", "73", "74", "75", "77", "79", "81", "82", "83", "84", "85", "86", "87", "88", "89", "91", "92", "93", "94", "95", "96", "97", "98", "99"];
        const randomValue = fieldValues[Math.floor(Math.random() * fieldValues.length)];
        cy.visit('https://www.produttivo.com.br/cadastro/')
        cy.get('input[placeholder="nome@empresa.com"]').type(`${email}`);
        cy.get('input[placeholder="nome@empresa.com"]').should('have.value', `${email}`);
        cy.get('input[placeholder="da Silva"]').type(`${lastName}`);
        cy.get('input[placeholder="da Silva"]').should('have.value', `${lastName}`);
        cy.get('input[placeholder="Nome da empresa"]').type('Produttivo');
        cy.get('input[placeholder="Nome da empresa"]').should('have.value', 'Produttivo');
        cy.get('.phone--form-group select').select('+55', { force: true }).should('have.value', '+55');
        cy.get('input[placeholder="DDD"]').type(randomValue);
        cy.get('input[placeholder="9 9999-9999"]').type(`${phone}`);
        cy.get('input[type="checkbox"]').should('not.be.checked');
        cy.get('input[type="checkbox"]').should('not.have.attr', 'aria-hidden');
        cy.get('input[type="password"]').type(`${password}`);
        cy.get('input[type="password"]').should('have.value', `${password}`);
        cy.get('span:contains("Iniciar teste")').click();
        cy.get('.input--error-message').contains('Campo Obrigatório');
        cy.wait(50);
      });

//  1 - Este teste realiza o fluxo completo de cadastro até o sucesso e a tela de configuração
      it('Validando o caminho feliz do teste e concluindo o cadastro"', () => {
        const fieldValues = ["11", "12", "13", "14", "15", "16", "17", "18", "19", "21", "22", "24", "27", "28", "31", "32", "33", "34", "35", "37", "38", "41", "42", "43", "44", "45", "46", "47", "48", "49", "51", "53", "54", "55", "61", "62", "63", "64", "65", "66", "67", "68", "69", "71", "73", "74", "75", "77", "79", "81", "82", "83", "84", "85", "86", "87", "88", "89", "91", "92", "93", "94", "95", "96", "97", "98", "99"];
        const randomValue = fieldValues[Math.floor(Math.random() * fieldValues.length)];
        cy.visit('https://www.produttivo.com.br/cadastro/')
        cy.get('input[placeholder="nome@empresa.com"]').type(`${email}`);
        cy.get('input[placeholder="nome@empresa.com"]').should('have.value', `${email}`);
        cy.get('input[placeholder="João"]').type(`${name}`);
        cy.get('input[placeholder="João"]').should('have.value', `${name}`);
        cy.get('input[placeholder="da Silva"]').type(`${lastName}`);
        cy.get('input[placeholder="da Silva"]').should('have.value', `${lastName}`);
        cy.get('input[placeholder="Nome da empresa"]').type('Produttivo');
        cy.get('input[placeholder="Nome da empresa"]').should('have.value', 'Produttivo');
        cy.get('.phone--form-group select').select('+55', { force: true }).should('have.value', '+55');
        cy.get('input[placeholder="DDD"]').type(randomValue);
        cy.get('input[placeholder="9 9999-9999"]').type(`${phone}`);
        cy.get('input[type="checkbox"]').should('not.be.checked');
        cy.get('input[type="checkbox"]').should('not.have.attr', 'aria-hidden');
        cy.get('input[type="password"]').type(`${password}`);
        cy.get('input[type="password"]').should('have.value', `${password}`);
        cy.get('span:contains("Iniciar teste")').click();
      });
})