class Product {
  id: string
  ownerId: string
  title: string
  description: string
  price: number
  imageUrl: string

  constructor(
    id: string,
    ownerId: string,
    title: string,
    imageUrl: string,
    description: string,
    price: number
  ) {
    this.id = id
    this.ownerId = ownerId
    this.title = title
    this.description = description
    this.price = price
    this.imageUrl = imageUrl
  }
}

export default Product
