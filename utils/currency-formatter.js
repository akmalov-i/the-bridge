const formatter = new Intl.NumberFormat('en-US', {style: 'decimal'})

export function currency(value) {
  return formatter.format(value)
}
