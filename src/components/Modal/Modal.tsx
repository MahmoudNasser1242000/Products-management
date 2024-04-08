import { Dialog, Transition } from "@headlessui/react";
import { ChangeEvent, Dispatch, Fragment, SetStateAction } from "react";
import { categories, colors, formInputs } from "../../data";
import { ICategory, IErrors, IProducts } from "../../Interfaces/products";
import SelectCategory from "../SelectCategory/SelectCategory";

interface Iprops {
    isOpen: boolean;
    closeModal: () => void;
    errorValidation: (value: string, inputName: string) => void;
    error: IErrors;
    // submitValidation: (inputValues: IProducts) => void;
    setProductsList: React.Dispatch<React.SetStateAction<IProducts[]>>;
    disabled: boolean;
    update: boolean;
    productId: string | undefined;
    productsList: IProducts[];
    // updatedProduct: IProducts | null
    form: IProducts;
    setForm: React.Dispatch<React.SetStateAction<IProducts>>;
}
export default function Modal({
    isOpen,
    closeModal,
    errorValidation,
    error,
    // submitValidation,
    setProductsList,
    disabled,
    update,
    form,
    setForm,
    productId,
    productsList,
}: Iprops) {
    function changeValue(e: ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setForm((prev: IProducts) => {
            return {
                ...prev,
                [name]: value,
            };
        });

        errorValidation(value, name);
    }

    function chooseColor(
        e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
        color: string
    ) {
        if (
            form.colors?.find((oldColor: string) => oldColor === color) === undefined
        ) {
            setForm((prev: IProducts) => {
                return {
                    ...prev,
                    colors: [...prev.colors, color],
                };
            });

            e.target.classList.add("outline");
        } else {
            setForm((prev: IProducts) => {
                return {
                    ...prev,
                    colors: prev.colors.filter(
                        (oldColors: string) => oldColors !== color
                    ),
                };
            });

            e.target.classList.remove("outline");
        }
    }

    function selectCategory(ctg: ICategory) {
        setForm((prev: IProducts) => {
            return {
                ...prev,
                category: { ...ctg },
            };
        });
    }

    function addProduct(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        // submitValidation(form);

        if (update) {
            setProductsList((prev: IProducts[]) => {
                return prev.map((product: IProducts) => {
                    if (product.id === productId) {
                        return {
                            ...product,
                            ...form
                        }
                    } else {
                        return product
                    }
                })
            })
        } else {
            setProductsList((prev: IProducts[]) => {
                return [...prev, form];
            });
        }

        closeModal();
        setForm({
            title: "",
            description: "",
            imageURL: "",
            price: "",
            colors: [],
            category: categories[0],
        });
    }
    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform rounded-md bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <form onSubmit={addProduct}>
                                        {formInputs?.map((input) => (
                                            <div className="flex flex-col pb-[20px]" key={input.id}>
                                                <label
                                                    htmlFor={input.name}
                                                    className="mb-2 font-semibold"
                                                >
                                                    {input.label}
                                                </label>
                                                <input
                                                    type={input.type}
                                                    value={form[input.name]}
                                                    onChange={changeValue}
                                                    name={input.name}
                                                    className="border border-1 border-zinc-800/[0.22] rounded-[4px] p-1 focus:bottom-6 outline-none"
                                                />
                                                <p className="text-red-700 py-[2px] text-[13px]">
                                                    {error[input.name]}
                                                </p>
                                            </div>
                                        ))}

                                        <div className="space-x-3 pb-4">
                                            {colors?.map((color: string) => (
                                                <span
                                                    onClick={(
                                                        e: React.MouseEvent<HTMLSpanElement, MouseEvent>
                                                    ) => {
                                                        chooseColor(e, color);
                                                    }}
                                                    style={{ background: color }}
                                                    key={color}
                                                    id={color}
                                                    className={`w-5 h-5 rounded-full inline-block ${update
                                                            ? form.colors.find((clr: string) => clr === color)
                                                                ? "outline"
                                                                : ""
                                                            : ""
                                                        } outline-offset-1 outline-cyan-600/[0.5]`}
                                                ></span>
                                            ))}
                                            {form.colors?.map((color: string) => (
                                                <span
                                                    key={color}
                                                    style={{ background: color }}
                                                    className="inline-block my-2 px-1 text-white rounded-md"
                                                >
                                                    {color}
                                                </span>
                                            ))}
                                        </div>
                                        <SelectCategory selectCategory={selectCategory} form={form}/>
                                        <button
                                            disabled={disabled}
                                            className="bg-indigo-700 w-full mt-5 rounded-[4px] text-white py-2 disabled:bg-indigo-400 disabled:cursor-not-allowed"
                                        >
                                            {update ? "Update Product" : "Add New Product"}
                                        </button>
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}
