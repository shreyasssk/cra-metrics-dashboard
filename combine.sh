#!/bin/bash
rm -rf server/public/* &&
cd client &&
yarn install &&
yarn build &&

cd .. &&
cd server &&
yarn install &&
yarn start:dev