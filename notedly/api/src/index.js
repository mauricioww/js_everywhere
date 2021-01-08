const depthLimit = require('graphql-depth-limit');
const { createComplexityLimitRule } = require('graphql-validation-complexity');
const cors = require('cors');
const helmet = require('helmet');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const db = require('./db');
const models = require('./models');
const typeDefs = require('./schema');
const resolvers = require('./resolvers')

const port = process.env.PORT || 4000;
const DB_HOST = process.env.DB_HOST;

const app = express();
app.use(helmet());
app.use(cors());

db.connect(DB_HOST);

const getUser = token => {
    if(token) {
        try {
            return jwt.verify(token, process.env.JWT_SECRET);
        } catch(err) {
            throw new Error('Session invalid');
        }
    }
}

// Apollo Server startup
const server = new ApolloServer({ 
    typeDefs,
    resolvers,
    validationRules: [depthLimit(5), createComplexityLimitRule(1000)],
    context: ({ req }) => {
        const token = req.headers.authorization;
        const user = getUser(token);
        console.log(user);
        return { models, user };
    }
});

// Apply te Apollo GraphQL middleware and set the path to /api
server.applyMiddleware({ app, path: '/api' });

// app.get('/', (req, res) => res.send('Hello World!'));

app.listen({ port }, () => 
    console.log(
        `GraphQL Server running at http://localhost:${port}${server.graphqlPath}`
    )
);