# api-rest-rabbitmq
Api que utilizará una imagen de docker de rabbitmq para encolar response modificada de dummy-api-rest

COMANDOS:
para correr localmente:
npm start

para crear imagen:
docker build --no-cache -t api-rest-rabbitmq .

para correr via container:
docker run -d -p 5001:4000 api-rest-rabbitmq