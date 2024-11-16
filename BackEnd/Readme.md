# MedChain API

1. ** Установите Docker на компьютер**
https://docs.docker.com/engine/install/

3. ** Запустите сервер **
## Инструкции по запуску проекта без использования докера
```bash
docker-compose up --build
```

1. **Клонируйте репозиторий**:

    ```bash
    git clone https://github.com/EgoInc/MedChainMVP.git
    cd BackEnd
    ```

2. **Установите виртуальное окружение**: _(игнорировать при использовании PyCharm)_

    ```bash
    python -m venv venv
    source venv/bin/activate   # Для Linux/macOS
    venv\Scripts\activate      # Для Windows
    ```

3. **Установите зависимости**:

    ```bash
    pip install -r requirements.txt
    ```

4. **Примените миграции**:

    ```bash
    python manage.py migrate
    ```

5. **Создайте суперпользователя** (по желанию для доступа к административной панели):

    ```bash
    python manage.py createsuperuser
    ```

6. **Запустите сервер**:

    ```bash
    python manage.py runserver
    ```

7. **Откройте документацию API**:

    Перейдите в браузере по адресу [http://127.0.0.1:8000/api/docs/](http://127.0.0.1:8000/api/docs/), чтобы увидеть документацию API.
