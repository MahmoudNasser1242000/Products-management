// import styles from "./ProductCard.module.css";
import { IProducts } from "../../Interfaces/products"
import { cutDescription } from "../../functions/index";

function ProductCard({id, title, description, imageURL, price, colors, category, updateProduct, deleteProduct}: IProducts) {
    return (
        <>
            <div className="rounded-sm p-2 border h-fit">
                <div className="h-[220px]">
                    <img
                        src={imageURL}
                        alt={title}
                        className="w-full h-full"
                    />
                </div>
                <h2 className="py-2 text-xl">{title}</h2>
                <p>
                    {cutDescription(description, 50)}
                </p>
                <div className="py-4 space-x-2">
                    {
                        colors?.map((color) => <span style={{background: color}} key={color} className={`w-5 h-5 rounded-full inline-block`}></span>)
                    }
                </div>
                <div className="flex justify-between items-center pb-3">
                    <span>${price}</span>
                    <span className="flex flex-col items-center">
                        <img
                            src={category.imageURL}
                            alt={category.name}
                            className="w-9 h-9 rounded-full object-center"
                        />
                        <span>{category.name}</span>
                    </span>
                </div>
                <div className="py-2 flex space-x-2">
                    <button className="bg-indigo-800 py-2 px-3 w-full text-yellow-50 rounded-md" onClick={() => updateProduct?.(id)}>Edit</button>
                    <button className="bg-red-700 py-2 px-3 w-full text-yellow-50 rounded-md" onClick={() => { deleteProduct?.(id) }}>Delet</button>
                </div>
            </div>
        </>
    );
}

export default ProductCard;
