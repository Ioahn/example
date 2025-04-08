После авторизации надо вызвать https://yandex.ru/support/metrica/objects/set-user-id.html с account_id
И после этого проставить еще вот здесь
https://yandex.ru/support/metrica/objects/user-params.html с пейлоадом {account_type: {account_type}, UserID: {account_id}

Плюс надо реализовать вызов reachGoal, чтобы можно было из любого места вызывать

сделаем пока одну цель clickButton

и будем передавать параметры, типа

ym(XXXXXX,’reachGoal','clickButton', {eventType: ‘clickSignIn’})
ym(XXXXXX,’reachGoal','clickButton', {eventType: ‘clickLandingCTA-refId’}) (здесь можно через - добавлять реф ID типа чтобы определять на какую именно CTA на лэндосе он нажал)
и тдтп
Пока нам надо просто подготовить этот интерфейс и мы сделаем просто по воронке все клики и все
