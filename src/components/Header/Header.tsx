// import styles from "./Header.module.css";

interface Iprops {
    openModal: () => void;
}

function Header({ openModal }: Iprops) {
    return (
        <div className="flex justify-between items-center pb-8">
            <h1 className="font-bold text-4xl">
                Latest <span className="text-indigo-700">Products</span>
            </h1>
            <button
                className="bg-indigo-800 text-white p-2 rounded-[4px] active:bg-indigo-900 hover:bg-indigo-900 duration-100"
                onClick={openModal}
            >
                Add Product
            </button>
        </div>
    );
}

export default Header;
