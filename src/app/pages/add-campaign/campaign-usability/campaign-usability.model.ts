
export interface ChoiceValue {
  id: number
  ussd: string
  value: string
  link: string
  image: string
}

export interface ChoicePreview extends ChoiceValue {
  imageName: string
}