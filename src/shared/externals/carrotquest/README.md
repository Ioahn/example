Интеграция с кэрротом

В неавторизованной зоне пока ваще нихуя не делаем можно сказать, кроме открытия чата там где это надо - https://developers.carrotquest.io/libs/js/open/
У нас там кажется есть 2 места, где надо открыть чат

Как только чел авторизуется, надо сходить на бэк в метод
https://test.api.sense-a.ru/api/swagger/redoc#tag/CarrotQuest-API/operation/set_carrot_client_uid
Положить carrot client uid

Потом пойти взять user_hash
https://test.api.sense-a.ru/api/swagger/redoc#tag/CarrotQuest-API/operation/get_carrot_user_hash

И вызывать https://developers.carrotquest.io/libs/js/auth/
в формате
carrotquest.auth(‘{account_id}, ‘{user_hash_from_backend}’);
