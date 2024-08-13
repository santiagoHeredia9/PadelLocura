export const priceStyle = (price) => {
    const usPrice = price.toString().split("").slice(0, 3).join("")
    const realPrice = Number(usPrice)
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
    }).format(realPrice);
}