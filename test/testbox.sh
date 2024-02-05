#!/bin/bash

migrate() {
  npx sequelize-cli db:migrate --env test
}

seed() {
  npx sequelize-cli db:seed:all --env test
}

drop_and_create() {
  cd ./request-sender

  echo '=========Drop db========='
  npx sequelize-cli db:drop --env test

  echo '=========Create db========='
  npx sequelize-cli db:create --env test
}

migrate_component() {
  echo "=========Migration $1 Component========="
  cd ./$1
  migrate
  seed
  cd ..
}

cd ./src
drop_and_create $1

migrate_component "user"
migrate_component "order"


