class CartItem {
  quantity: number
  productPrice: number
  productTitle: string
  sum: number
  imageUrl: string

  constructor(
    quantity: number,
    productPrice: number,
    productTitle: string,
    sum: number,
    imageUrl: string
  ) {
    this.quantity = quantity
    this.productPrice = productPrice
    this.productTitle = productTitle
    this.sum = sum
    this.imageUrl = imageUrl
  }
}

export default CartItem
