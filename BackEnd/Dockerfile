# Первый этап: установка зависимостей
FROM python:3.10-slim AS builder

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем только файл с зависимостями
COPY requirements.txt .

# Устанавливаем зависимости в отдельный слой
RUN pip install --no-cache-dir --prefix=/install -r requirements.txt

# Второй этап: финальный образ
FROM python:3.10-slim

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем установленные зависимости из предыдущего этапа
COPY --from=builder /install /usr/local

# Копируем файлы проекта
COPY . .

# Команда для запуска приложения
CMD ["sh", "-c", "python manage.py migrate && python manage.py runserver 0.0.0.0:8000"]