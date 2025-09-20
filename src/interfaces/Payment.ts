interface Payment {
  id: string
  userId: string
  amount: number
  status: 'pending' | 'completed' | 'failed'
  category: string
  date: string
  createdOrUpdatedBy : string | undefined
}

export default Payment;