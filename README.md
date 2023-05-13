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

2. **TODO**

- **Auth**:
    - ✅ Signup
    - ✅ Login
    - ✅ Logout
    - ✅ Refresh token when access token expires
    - ❌ Send mail when sign up by email
    
- **Users**:
    - ✅ CRUD User
    - ✅ Follow/Unfollow User of User
    - ✅ Get profile
    - ✅ Reset password when forgot password
    - ✅ Get profile
    - ✅ Edit profile
    - ❌ Change password when user want to
    - ✅ Sort and Filter User

- **News**:
    - ✅ CRUD News
    - ✅ **Get** News by Public
    - ✅ Count views
    - ✅ Like/Dislike News
    - ✅ Save/UnSave News of User
    - ✅ Sort and filter News

- **Roles**:
    - ✅ CRUD role
    - ✅ Add Entity color

- **Hash tags**:
    - ✅ CRUD hash tag
    - ✅ Follow/Unfollow Hash tag by User
    - ✅ Add Entity color, icon(img)

- **Comments**:
    - ✅ CRUD comments
        - ❌ Add comment 
        - ❌ Edit comment by self User
        - ❌ Delete comment by self User
        - ❌ Mention User when user Comment

- **Form**
  - ✅ Form Image:
    - ❌ Drag & Drag img from outside (ImageField)

- **Recommend System**: ❌ 


3. **FRONT-END TODO**

- **USER INTERFACE:**
  - ✅ List News
  - ✅ News Detail
  - ✅ Login
  - ✅ Sign up
  - ✅ List Tags
  - ✅ Tag Detail: Get all news by tagId

  - ✅ Profile:
    - ✅ Profile
    - ✅ Setting
  - ✅ Detail User

  - ✅ Reading list (Save)

  - ❌ Search page

  - ❌ Create News

  - ✅ Dashboard:
    - ✅ News List
    - ✅ Following List
    - ✅ Followers List
    - ✅ Tags List Follow


- **Features**:
  - **Reading List Page**:
    - ❌ **Archive & Unarchive** for news `saves` of this user.