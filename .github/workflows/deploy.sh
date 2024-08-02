#!/bin/bash

# Detener y eliminar el contenedor existente
docker stop kraz_difyai_gb || true
docker rm kraz_difyai_gb || true

# Descargar la última imagen
docker pull vikolab/kraz-difyai-gb:latest

# Ejecutar el nuevo contenedor
docker run -d --name kraz_difyai_gb -p 8502:3000 vikolab/kraz-difyai-gb:latest