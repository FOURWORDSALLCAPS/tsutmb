# tsutmb

### Как собрать проект

Скачайте код:
```sh
git clone https://github.com/FOURWORDSALLCAPS/tsutmb.git
```

Перейдите в каталог проекта:
```sh
cd tsutmb
```

[Установите Python](https://www.python.org/), если этого ещё не сделали.

В каталоге проекта создайте виртуальное окружение:
```sh
python -m venv venv
```

Активируйте его. На разных операционных системах это делается разными командами:

- Windows: `.\venv\Scripts\activate`
- MacOS/Linux: `source venv/bin/activate`


Установите зависимости в виртуальное окружение:
```sh
pip install poetry
```

```sh
poetry install
```

Перейдите в каталог src:
```sh
cd src
```

Создать .env файл по образцу
```shell
cp example.env .env
```

Примените миграции
```sh
python manage.py migrate
```

Соберите static файлы
```sh
python manage.py collectstatic
```

Запустите сервер:
```sh
python manage.py runserver
```

Создайте учетную запись администратора:
```sh
chmod +x entrypoint.sh
./entrypoint.sh
```

Админ панель находится [тут](http://127.0.0.1:8000/admin)

# Python версия
В проекте используется `3.13`

# Автор
(2025) Vladimir Zaitsev
