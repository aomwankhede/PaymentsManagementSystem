import User from "./User"
import Payment from "./Payment"

interface State {
  userList: User[]
  currUserDetails: User | null,
  paymentList:Payment[]
}

export default State;