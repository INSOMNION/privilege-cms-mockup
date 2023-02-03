export interface CriteriaValue {
  id: number
  name: string
}

export interface CriteriaFilter {
  page: number
  text: string
  total: number
  data: CriteriaValue[]
}