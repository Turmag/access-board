# access-board

Обёртка для доступов к различным сервисам

# Установка

Скачиваем пакет access-board:
```
npm i access-board
```

Или запустите с помощью yarn
```
yarn add access-board
```

Или запустите с помощью pnpm
```
pnpm add access-board
```

# Использование

## Для Vue-приложения
Если у вас vue-приложение, вам достаточно создать файл main.ts внутри директории src, в котором будут все импорты и настройка.
Мы импортируем стили, а также приложение, в которое прокидываем параметры.
Всего 3 параметра: 
1. path - путь до Api, где будут делаться запросы на авторизацию (authorize), проверку авторизации (checkAuthorize), получение сервисов (getServices) и выход (logout). Примеры Api можете найти в директории api в этом репозитории.
2. darkModeName - название переменной для хранения состояния тёмной темы
3. savedDarkModeName - название переменной для понимания, сохранили ли мы вручную настройки тёмной темы (это нужно, так как по умолчанию используется системная тема)

Вот пример конфигурации:
```
import 'access-board/style.css';
import { app } from 'access-board';

app.provide('path', import.meta.env.MODE === 'development' ? '' : import.meta.env.BASE_URL);
app.provide('darkModeName', 'isDarkModeTest');
app.provide('savedDarkModeName', 'isSavedDarkModeTest');
app.mount('#app');
```

Затем в файле index.html нужно будет подключить файл main.ts:
```
<script type="module" src="/src/main.ts"></script>
```
Не забудьте, что в проекте, в котором вы это используете, должен быть установлен пакет для поддержки TypeScript - typescript.

Установить его просто:
```
npm i typescript --save-dev
```
Или с помощью yarn
```
yarn add typescript --dev
```
Или запустите с помощью pnpm
``` 
pnpm add typescript --save-dev
```

# Тестирование
Вы можете скопировать этот репозиторий. Здесь уже настроено. Как протестировать:
1. Сделайте клон репозитория:
```
git clone https://github.com/Turmag/access-board.git
```
2. Разверните окружение, установив все необходимые пакеты:
```
npm i
```
Или с помощью yarn
```
yarn
```
Или с помощью pnpm
```
pnpm
```
3. Запустите приложение:
```
npm run dev
```
Или с помощью yarn
```
yarn dev
```
Или с помощью pnpm
```
pnpm dev
```
4. Зайдите, набрав пароль **test**
5. Оцените интерфейс :)