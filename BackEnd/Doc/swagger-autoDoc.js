// swagger.js
import swaggerAutogen from 'swagger-autogen';

const outputFile = './swagger_output.json';
const endpointsFiles = ['../main.js']; // Substitua 'app.js' pelo caminho do arquivo principal do seu servidor Express

const doc = {
  info: {
    title: 'Minha API',
    description: 'Documentação da API',
    version: '1.0.0',
  },
  host: 'localhost:3000', // Substitua pela URL e porta do seu servidor
  basePath: '/',
  schemes: ['http'], // Substitua por 'https' se estiver usando HTTPS
};

const generateSwaggerDocumentation = async () => {
  try {
    await swaggerAutogen(outputFile, endpointsFiles, doc);
    require('./app'); // Substitua 'app.js' pelo caminho do arquivo principal do seu servidor Express
  } catch (error) {
    console.error('Erro ao gerar a documentação Swagger:', error);
  }
};

generateSwaggerDocumentation();
