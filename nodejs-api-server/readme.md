## Intro

This is a very small framework for building a ReSTful API server in NodeJS, using the popular ExpressJS package, modelled after the [Model-View-Controller](https://en.wikipedia.org/wiki/Model–view–controller) paradigm.

Use this framework to get organized and running quickly, so that you can focus your time and effort where it matters, the business value of your product.

## Benefits

- It's tested: A model for writing useful unit and integration tests are included
- It's a small codebase with minimal impact, and only a few conventions. [INSERT CODE LINE COUNT HERE]
- It's documented, probably moreso than what you have already.
- It's fast! [INSERT PERF METRIC HERE]
- Simple way to manage configurations across different environments.
- A pre-built postman collection you can test with!

## Quickstart

1. Install the dependencies with `npm install`.
2. Run `npm start` to start the server.
3. Optinally build and run this as a docker container
- `docker build -t nodejs-api .`
- `docker run -it --rm --name nodejs-api -p 9000:9000 nodejs-api`

## Description

This should be a deeper description of the high level components
- Config getter
- MVC parts

## Diagram

![](http://i.imgur.com/ZORthDF.png)

> [imgur link](http://imgur.com/a/IWxuU)

> [draw.io xml](https://github.com/ElephantVentures/patterns/wiki/Draw.io-xml-for-nodejs-api-server-pattern-diagram)

## How do I ..?

- Start a project with this
- Migrate a project to use this
- Contribute
- Run the tests
- Start the web server

## Resources

- [ExpressJS documentation](https://expressjs.com/)
- [Using ExpressJS middleware](https://expressjs.com/en/guide/using-middleware.html)
- [Error handling in ExpressJS](https://expressjs.com/en/guide/error-handling.html)

## Further reading

- Check out how to use this api server as an upstream source for an NginX reverse proxy
