const swaggerAutogen = require('swagger-autogen')({openapi: '3.1.0'});
const jwt = require('jsonwebtoken');

const doc = {
    info: {
        version: "1.0.0",
        title: "Atividade Swagger",
        description: "atividade do Eduardo"
    },
    servers: [
        {
            url: 'https://localhost:3000'
        }
    ],
    components:{
        securitySchemes:{
            bearerAuth:{
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            }
        }
    },
    security: [{
        bearerAuth: []
    }],
};

const outputFile = './swagger-output.json';
const endpointFiles = ['./app.js'];

const securityDefinitions = {
    BearerAuth: []
};

const filterEndpoints = (endpoints) => {
    return endpoints.filter(endpoint => {
        return endpoint.url !== '/login';
    });
};

swaggerAutogen(outputFile, endpointFiles, doc, filterEndpoints).then(() => {
    require('./');
});