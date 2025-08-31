#!/bin/bash

echo "Останавливаем контейнеры..."
docker-compose down

echo "Запускаем только PostgreSQL..."
docker-compose up -d postgres

echo "Ждем запуска базы данных..."
sleep 10

echo "Обновляем схему Prisma..."
cd backend
npx prisma db push --force-reset

echo "Генерируем Prisma клиент..."
npx prisma generate

echo "Пересобираем backend контейнер..."
cd ..
docker-compose build backend

echo "Запускаем все контейнеры..."
docker-compose up -d

echo "Готово! Проверяем статус..."
docker-compose ps
