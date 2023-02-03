export const type: {
  name: string,
  value: string,
  desc: string
}[] = [
  {
    name: "REDEEM",
    value: "REDEEM",
    desc: "Redeem with AIS Point(s)"
  },
  {
    name: "REGISTER",
    value: "REGISTER_POINT",
    desc: "Register AIS points"
  },
  {
    name: "COMFIRM",
    value: "REGISTER_COMFIRM_POINT",
    desc: "Prepaid number verification with the ID Card to Register AIS Points."
  },
  {
    name: "CHECK",
    value: "CHECK_POINT",
    desc: "Check AIS Points"
  },
  {
    name: "BONUS",
    value: "POINT_BONUS",
    desc: "AIS Point(s) Bonus for the game-winner."
  },  
]

const day: string[] = [
  'All',
  'Sun',
  'Mon',
  'Tue',
  'Wed',
  'Thur',
  'Fri',
  'Sat',
]

const invite: {
  name: string,
  value: string | number
}[] = [
  { name: "Customer", value: 0 },
  { name: "Staff Only", value: 1 },
  { name: "Exclude Staff", value: 2 },
]

const blacklist: {
  name: string,
  value: string | number
}[] = [
  { name: "Yes", value: 1 },
  { name: "No", value: 0 },
]

const notice: {
  name: string,
  value: string | number
}[] = [
  { name: "Send", value: 1 },
  { name: "Don't Send", value: 0 },
]

export const settings = {
  type, day, invite, blacklist, notice
}