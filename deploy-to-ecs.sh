#!/bin/bash

docker context use default && \
  docker build -t piotrostr/plug . && \
  docker push piotrostr/plug && \
  docker context use plug-ecs-context && \
  docker compose up && \
  docker context use default
