#################################################
#### Compilação do typescript para javascript ###
#################################################
# FROM openshift/node-16-buster-slim as ts-compiler
FROM node:16-buster-slim as ts-compiler
WORKDIR /usr/app
COPY package*.json ./
COPY tsconfig*.json ./
RUN npm install --registry http://10.238.205.137:4873

COPY ./ ./
RUN npm run build

########################################################
#### Instalação da dependência de sistema oracle-db ####
########################################################
# FROM openshift/node-16-buster-slim as oracle-db
FROM node:16-buster-slim as oracle-db
WORKDIR /tmp
RUN apt update && \ 
    apt install -y alien libaio1 python3

COPY lib/oracle-instantclient19.9-basiclite-19.9.0.0.0-1.x86_64.rpm .

RUN alien -i --scripts oracle-instantclient*.rpm
RUN rm -f oracle-instantclient19.9*.rpm && \
          apt-get -y autoremove && \ 
          apt-get -y clean

#########################################################
#### instalação das dependencias de produção somente ####
#########################################################
FROM node:16-buster-slim as ts-remover
# FROM openshift/node-16-buster-slim as ts-remover
WORKDIR /usr/app
COPY --from=ts-compiler /usr/app/package*.json ./
COPY --from=ts-compiler /usr/app/dist ./
RUN npm install  --registry http://10.238.205.137:4873 --omit=dev

#########################################################
#### Deploy com a imagem do google distroless/nodejs ####
#########################################################
# FROM gcr.io/distroless/nodejs:16
FROM openshift/gcr.io-distroless-nodejs-16
COPY --from=oracle-db ./ ./
WORKDIR /usr/app
COPY --from=ts-remover /usr/app ./
# COPY ./.env ./
EXPOSE 8080
USER 1000
CMD ["src/server.js"]  

################## Se for testar no docker localmente ####################
# BUILD: docker build -t api-rest-abis .
# RODAR O CONTAINER: docker run rm -d -p 8080:8080 api-rest-abis

################## Deploy no Openshift ####################
# oc new-app https://www.git.pe.gov.br/gtiusa/abis-api-rest.git#stage --strategy=docker --name abis --source-secret "gti"


###################### Comandos úteis ####################
# Deletar todos os pods completos do Projeto 
    # oc delete pod $(oc get pods --no-headers=true | grep -v "Running" | cut -c -30)
# ou 
    # kubectl get pods --field-selector=status.phase!=Running
    # kubectl delete pod --field-selector=status.phase=={{phase}}