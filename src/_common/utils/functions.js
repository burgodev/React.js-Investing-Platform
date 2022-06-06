export const validEmail = (email) => {
    // eslint-disable-next-line no-useless-escape
    return /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(
        email
    );

}


export const formatCurrency = (currency) => new Intl.NumberFormat('en-US', { style: 'currency', currency: "USD" }).format(currency)

// const language = localStorage.getItem("i18nextLng")
// const CURRENCY_LIST = [
//     {
//         id: "en",
//         value: "USD"
//     },
//     {
//         id: "br",
//         value: "BRL"
//     },
//     {
//         id: "es",
//         value: "EUR"
//     },
//     {
//         id: "it",
//         value: "EUR"
//     },
// ]


