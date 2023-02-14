# api-rest-rabbitmq
Api que utilizará una imagen de docker de rabbitmq para encolar response modificada de dummy-api-rest

COMANDOS:
para correr localmente:
npm start

para crear imagen:
docker build --no-cache -t api-rest-rabbitmq-consumer .

para correr via container:
docker run -d -p 5006:4006 api-rest-rabbitmq-consumer