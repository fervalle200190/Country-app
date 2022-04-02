export const toDecimal = (a: string)=> {
   return a.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}