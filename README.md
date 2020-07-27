# SwiftEventos

An WIP event management app build up with React Native & Node.js which purpose is to be used by users who wants to seek events promoted by institutions and buy tickets for them.

This app was developed for an intership at MB Labs.

# Features

- Users can seek for events and buy tickets for them;
- Users can pay for the events tickets through credit card, money and bank slip;
- Users can follow institutions and be notified by the app before an event of them occurs.

![App preview](https://i.imgur.com/ZAJfSPq.png)

# Used technologies and development environment

:star: React Native\
:star: Node.js\
:star: Express\
:star: Sequelize\
:star: Redux\
:star: PostgreSQL\
:star: Postman\
:star: Yarn\
:star: pgAdmin\
:star: Visual Studio Code\
:star: Trello\
:star: Photoshop\
:star: Spotify

# Instructions

1. Clone the repository
2. Install NPM & Yarn
3. Create a .env file at the root of mblabs-app-backend with:

```
PORT=1335

DATABASE_HOST=name_of_host\
DATABASE_NAME=name_of_database\
DATABASE_USER=user_name\
DATABASE_PASSWORD=database_pass

TIMEZONE=your_timezone\
LANGUAGE=your-language

SECRET=your_secret
```

3. On api.js at mblabs-app-mobile, set the base URL to your host
4. With the terminal at the root of mblabs-app-backend: yarn run dev
5. With the terminal at the root of mblabs-app-mobile: yarn start

# Special thanks to

**[Rockeseat](https://rocketseat.com.br/)**\
**[MB Labs](http://www.mblabs.com.br/)**\
**[Marcos A. Jr. Vasconcellos](https://github.com/MarcosJr1)**