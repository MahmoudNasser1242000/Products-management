export interface IProducts {
    id?: string,
    title: string,
    description: string,
    imageURL: string,
    price: string,
    colors: string[],
    category: {
        id?: string
        name: string,
        imageURL: string
    }
    updateProduct?: ()=> void
}

export interface IErrors {
    title: string,
    description: string,
    imageURL: string,
    price: string
}

export interface IForm {
    id: string,
    type: string,
    name: keyof IErrors,
    label: string
}

export interface ICategory { 
    id: string, 
    name: string, 
    imageURL: string 
}