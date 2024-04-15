#!/bin/bash

# Função para verificar se o container existe e iniciar se necessário
start_container() {
  container_name=$1
  port=$2
  if docker ps -a --format '{{.Names}}' | grep -Eq "^${container_name}$"; then
    echo "Container '$container_name' já existe, iniciando..."
    docker start "$container_name"
  else
    echo "Container '$container_name' não encontrado, criando..."
    docker run -d --name "$container_name" -p $port:3000 "$container_name"
  fi
}

# Iniciar/criar os containers
start_container todolist-backend 3000
start_container todolist-frontend 3001