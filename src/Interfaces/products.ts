export interface IProducts {
    id?: string | undefined,
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
    updateProduct?: (id: string | undefined)=> void,
    deleteProduct?: (id: string | undefined)=> void
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
    id?: string, 
    name: string, 
    imageURL: string 
}