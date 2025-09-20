interface User {
  id: string
  name: string
  email: string
  role: string
  status: string
  createdAt?: string
  lastLogin?: string
}

export default User;