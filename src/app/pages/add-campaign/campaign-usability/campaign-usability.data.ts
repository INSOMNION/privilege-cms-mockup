const mobile: {
  name: string,
  value: string | number
}[] = [
  { name: 'None', value: 0 },
  { name: 'QR Code', value: 3 },
  { name: 'Barcode - Code 128', value: 1 },
  { name: 'Barcode - Code EAN-13', value: 2 },
]

const thank: {
  name: string,
  value: string | number
}[] = [
  { name: 'Show', value: 1 },
  { name: 'Hidden', value: 0 },
]

export const settings = {
  display: { mobile, thank }
}
