# 92-hotels

92-hotels is a fake app that allows you to find a room in a hotel, check availability and book it.

## Description

This repository contains 2 versions of 92-hotels app.

First one
is more compound. It's a **node** + **express** + **mongoose** server build from scratch connected to a database populated with data from external APIs and random data from faker.js and a client-side app built with **React** and **Redux**. You can [access this version here](https://github.com/h-des/92-hotels/tree/master) or just switch to `master` branch.

The second version is only a client-side app (more like a mockup) built with **React** and **Redux** working with 2 external APIs:

- [jsonplaceholder](https://jsonplaceholder.typicode.com)
- [unsplash](https://source.unsplash.com/)

You can [access this version here](https://github.com/h-des/92-hotels/tree/client-mockup) or just switch to `client-mockup` branch.

## Online demos

- [Node server + client-side app](https://hotels-92.herokuapp.com)
- [Client-side](https://92-hotels.now.sh)

### Example users

| email                         | password |
| ----------------------------- | -------- |
| saana.wuori@example.com       | test     |
| patricia.reyes@example.com    | test     |
| sueli.damata@example.com      | test     |
| etienne.campbell@example.com  | test     |
| micheal.andrews@example.com   | test     |
| sophia.heinisch@example.com   | test     |
| ahmad.stellmacher@example.com | test     |
| anton.koivisto@example.com    | test     |
| byron.herrera@example.com     | test     |
| ralph.guerin@example.co       | test     |

## Run locally

### `master` branch

- install mongodb
- create folder `/data/db`
- run `mongod`
```
  yarn
  cd client
  yarn
  cd ..
  yarn seed 
  yarn dev
```
 - client app available at - `localhost:3000`
 - admin panel available at - `localhost:3030` email: `admin@example.com` | password: `password`


### `client-mockup` branch

```
  cd client
  npm install
  npm run start
```

Or:

```
  cd client
  npm install
  npm build
  cd build
  serve
```

> Notice: You’ll need to have [serve](https://www.npmjs.com/package/serve) on your machine to use the second option.

