Набор консольных комманд для упрощения работы

Запуск мок сервера
npm run mock:server

Генерация данных tsv
npm run ts ./src/main.cli.ts -- --generate 1000 ./mocks/mock-server-data.tsv http://localhost:3123/api

Перенос данных из tsv в DB
npm run ts ./src/main.cli.ts -- --import ./mocks/mock-server-data.tsv admin test localhost six-cities 27017 qwerty
