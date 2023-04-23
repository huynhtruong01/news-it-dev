## OVERVIEW PROJECT

- **Name project**: Website News about **Information Technology**

- **Front-End**:
  - ReactJS
  - Redux Toolkit
  - MUI
  - ReactQuill
  - Socket.IO
  - **Tool**: ViteJS

- **Back-End**:
  - NodeJS
  - ExpressJS
  - TypeORM
  - Socket.IO

- **Database**: MySQL

---

### FRONT-END

1. **Code Structure**

```sh
src
    |__components
        |__common
        |__index.tsx
    |__features
        |__News
            |__pages
                |__index.tsx
            |__components
                |__index.tsx
            |__index.tsx
    |__layouts
        |__index.tsx
    |__hooks
        |__index.tsx
    |__redux
        |__index.tsx
    |__utils
        |__index.ts
    |__App.tsx
    |__main.tsx
```

--- 

### BACK-END

1. **Code Structure**

```sh
src
    |__config
        |__data.ts
        |__index.ts
    |__controllers
        |__user.controller.ts
        |__index.ts
    |__entities
        |__user.entity.ts
        |__index.ts
    |__services
        |__user.service.ts
        |__index.ts
    |__middlewares
        |__auth.middleware.ts
        |__index.ts
    |__models
        |__user.model.ts
        |__index.ts
    |__enums
        |__user.enums.ts
        |__index.ts
    |__routes
        |__user.router.ts
        |__index.ts
    |__utils
        |__index.ts
server.ts
```