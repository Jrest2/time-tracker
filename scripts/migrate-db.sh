#!/bin/bash

migrate() {
  npx sequelize-cli db:migrate
}

seed() {
  npx sequelize-cli db:seed:all
}

drop_and_create() {
  cd ./request-sender

  if [ "$1" = "drop" ];
  then
    echo '=========Drop db========='
    npx sequelize-cli db:drop
  fi

  echo '=========Create db========='
  npx sequelize-cli db:create
}

migrate_component() {
  echo "=========Migration $1 Component========="
  cd ./$1
  migrate
  seed
  cd ..
}

cd ../src
drop_and_create $1

migrate_component "user"
migrate_component "order"


