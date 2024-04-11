// Funcție auxiliară pentru formatrarea numarului afisat in balanta si in Sum (amount). Se grupeaza cate de 3 cifre despartite de un mic spatiu:

export function formatNumberWithSpaces(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}
