# PMS
This is a vue.js application to manage payments for a small fintech company.

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

# User flow
```
1. Registration / Login
   - First user registers as Admin (required for setup).
   - Subsequent users are created by Admin from the dashboard.
   - Validation:
       • Name: min 2 characters
       • Email: must be valid
       • Role: Admin / Financial Manager / User

2. Authentication & Route Protection
   - All routes (/users, /payments) require authentication.
   - If not logged in → redirected to Login page.

3. Roles & Permissions
   - Admin: Full CRUD on Users + Payments.
   - Financial Manager: View Users (no edit), Full CRUD on Payments.
   - User: View-only access (Users + Payments).

4. User Management
   - Admin can view, filter, create, edit, and delete users.
   - Filters: search by status and role.

5. Payment Management
   - Payment list view with search, status filter, category filter.
   - Each payment:
       • View → Detailed view of transaction.
       • Edit → Prefilled form (Admin/Manager only).
       • Delete → Remove payment (Admin/Manager only).
   - Add Payment button → Admin & Financial Managers only.

6. Payment Details Page
   - Shows: Payment ID, User, Amount, Status, Category, Date, Audit Info.

7. Persistence
   - Data stored in localStorage (users, payments, current user).
   - Vuex + TypeScript for strict state management.

8. UI / Tech Stack
   - Vue 3 + TypeScript
   - Vuex (state management)
   - Vue Router (auth guards)
   - Tailwind CSS (responsive design)
   - Jest + Vue Test Utils (unit testing)
```
