# PMS
This is a vue.js application which aims to  manage payments for a small fintech company.

# Setup
1. Clone the repository.
     ```bash
         git clone https://github.com/aomwankhede/PaymentsManagementSystem
     ```
     
2. Install all the required packages , try using --force flag if there are some version conflicts.
     ```bash
         npm i
     ```
3. Run the application.
     ```bash
         npm run serve
     ```
4. Register a user with admin privileage first to start using the application.

# Folder structure
```
PMS/
├── node_modules/
├── public/
│   ├── icon.png
│   └── index.html
├── src/
│   ├── assets/
│   │   └── main.css
│   ├── components/
│   │   └── NavbarComponent.vue
│   ├── interfaces/
│   │   ├── Payment.ts
│   │   ├── State.ts
│   │   └── User.ts
│   ├── router/
│   │   └── index.ts
│   ├── store/
│   │   └── index.ts
│   ├── views/
│   │   ├── HomeComponent.vue
│   │   ├── PaymentDetail.vue
│   │   ├── PaymentForm.vue
│   │   ├── PaymentList.vue
│   │   ├── UserForm.vue
│   │   └── UserList.vue
│   ├── App.vue
│   ├── main.ts
│   └── shims-vue.d.ts
├── tests/
│   └── unit/
│       ├── Navbar.spec.ts
│       ├── PaymentDetail.spec.ts
│       ├── PaymentForm.spec.ts
│       ├── PaymentList.spec.ts
│       └── UserList.spec.ts
├── .gitignore
├── package.json
├── package-lock.json
├── tsconfig.json
├── vue.config.js
└── README.md
```
