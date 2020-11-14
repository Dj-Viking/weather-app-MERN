//NODE IMPORTS
const path = require('path');
//require('dotenv').config();
// console.log(process.env.NODE_ENV);

//EXPRESS IMPORTS AND SERVER PORT ASSIGN
const PORT = process.env.PORT || 3001;
const express = require('express');
const app = express();

//APOLLO IMPORTS
const { ApolloServer } = require('apollo-server-express');

//GRAPHQL TYPEDEFS AND RESOLVERS AND CONNECTION
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection.js');
//const { User, Country } = require('./models');

//AUTHORIZATION MIDDLEWARE
const { authMiddleware } = require('./utils/auth.js');

//APOLLO SERVER INITIALIZE
const apolloServer = new ApolloServer
(
  {
    typeDefs,
    resolvers,
    context: authMiddleware
  }
);

//preseed mutations here?

//APPLY APOLLO MIDDLEWARE TO EXPRESS APP
apolloServer.applyMiddleware({ app });

//EXPRESS MIDDLEWARE FUNCTIONS
app.use(
  express.urlencoded(
    {
      extended: false
    }
  )
);
app.use(
  express.json()
);

//IF-ENV IN DEVELOPMENT
if (process.env.NODE_ENV === 'production') {
  //STATIC ASSETS FROM REACT BUILD FOLDER
  app.use(
    express.static(
      path.join(__dirname, '../client/build')
    )
  );
  //IF TRAVELING TO ANY ROUTE OUTSIDE OF REACT'S CURRENT PAGE REDIRECT TO ROOT
  app.get('*', (req, res) => {
    console.log("in get star route");
    res.sendFile(
      path.join(
        __dirname< '../client/build/index.html'
      )
    )
  });
  //REDIRECT HEROKU HTTP TRAFFIC TO HTTPS
  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https') {
      res.redirect(`https://${req.header('host')}${req.url}`);
    }
    next();
  });
}

//OPEN DATABASE AND THEN START SERVER
db.once('open',
  () => {
    app.listen(PORT,
      () => {
        //SERVER LISTENING ON PORT
        setTimeout(
          () => {
            console.log(
              "\x1b[33m", `🔊 🎶 now listening on port ${PORT}`, "\x1b[00m"
            );
          }, 
          300
        );
        setTimeout(
          () => {
            console.log(
              "\x1b[34m", `🌎 node environment installed successfully`, "\x1b[00m"
            );
          }, 
          400
        );
        //GRAPHQL URL
        setTimeout(
          () => {
            console.log(
              "\x1b[35m", `🔮 if in dev phase use graphql at http://localhost:${PORT}${apolloServer.graphqlPath} 🔮`, "\x1b[00m"
            );
          }, 
          400
        );
        setTimeout(
          () => {
            console.log(
              "\x1b[32m", `🌱 if in development: standby for react server to begin`, "\x1b[00m"
            );
          }, 
          500
        );
        //SEED FUNCTIONS HERE
      }
    );
  } 
);