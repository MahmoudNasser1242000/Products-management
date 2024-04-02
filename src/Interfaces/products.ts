export interface IPrpducts {
    id: string,
    title: string,
    description: string,
    imageURL: string,
    price: string,
    colors: string[],
    category: {
        name: string,
        imageURL: string
    }
}