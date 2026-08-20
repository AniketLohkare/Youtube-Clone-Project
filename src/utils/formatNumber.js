export const formatNumber = (number) =>
  new Intl.NumberFormat('en', {
    notation: 'compact',
  }).format(number)
