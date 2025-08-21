#!/bin/bash

export PYTHONPATH=${PWD}

if [ -f .env ]; then
    echo "Загрузка переменных из .env файла"
    export $(grep -v '^#' .env | xargs)
else
    echo ".env файл не найден"
    exit 1
fi

user_exists=$(python3 manage.py shell -c "from django.contrib.auth import get_user_model; User = get_user_model(); print(User.objects.filter(username='${DJANGO_ADMIN_USERNAME}').exists())")

if [ "$user_exists" = "False" ]; then
    echo "Создание суперпользователя..."
    python3 manage.py shell -c "
from django.contrib.auth import get_user_model
User = get_user_model()
if not User.objects.filter(username='${DJANGO_ADMIN_USERNAME}').exists():
    user = User.objects.create_superuser(
        username='${DJANGO_ADMIN_USERNAME}',
        email='${DJANGO_ADMIN_EMAIL}',
        password='${DJANGO_ADMIN_PASSWORD}'
    )
    print(f'Superuser {user.username} created successfully')
else:
    print('User already exists')
"
fi

exec "$@"
