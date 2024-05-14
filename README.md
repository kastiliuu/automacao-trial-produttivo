# Projeto de Automação da Tela de Trial para Produttivo

Este projeto tem como objetivo automatizar o processo de triagem para a plataforma Produttivo, utilizando Cypress como ferramenta de automação.

## Instalação

1. Clone o repositório para o seu ambiente local:

bash
git clone https://github.com/kastiliuu/automacao-trial-produttivo.git


2. Certifique-se de ter o Node.js e o npm instalados em seu sistema.

3. Instale o Cypress como uma dependência de desenvolvimento, especificando a versão:

bash
npm install cypress@9.5.1 --save-dev


4. Instale a biblioteca Faker para gerar dados de teste:

bash
npm install --save-dev @faker-js/faker


5. Instale as dependências do projeto:

bash
cd automacao-trial-produttivo
npm install


## Uso

1. Navegue até o diretório do projeto:

bash
cd automacao-trial-produttivo


2. Execute o Cypress:

bash
npx cypress open


3. Selecione o arquivo de teste `trial_spec.js` no Cypress para iniciar a execução dos testes automatizados.

4. Siga as instruções apresentadas no Cypress para visualizar e executar os testes.

## Contribuição

Contribuições são bem-vindas! Se você quiser contribuir para este projeto, siga estas etapas:

1. Fork o projeto
2. Crie uma nova branch (`git checkout -b feature/sua-feature`)
3. Faça commit das suas alterações (`git commit -am 'Adicione sua nova feature'`)
4. Faça push para a branch (`git push origin feature/sua-feature`)
5. Abra um Pull Request

Por favor, certifique-se de que seu Pull Request segue as diretrizes de contribuição.

## Licença

Este projeto está licenciado sob a [MIT License](https://opensource.org/licenses/MIT).
