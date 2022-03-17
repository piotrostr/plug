#!/bin/bash

docker context use default && \
  docker compose --file ecs-compose.yml build && \
  docker compose --file ecs-compose.yml push && \
  docker context use plug-ecs-context && \
  docker compose --file ecs-compose.yml up
