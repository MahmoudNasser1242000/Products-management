import ProductCard from "./components/ProductCard/ProductCard"
import { productList } from "./data/index"

interface Iprops {

}

function App({}: Iprops) {
  return (
    <>
      <div className="container mx-auto pt-10 grid grid-cols-1 sm:grid-col-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-12">
        {productList?.map((prod) => <ProductCard key={prod.id}  {...prod}/>)}
      </div>
    </>
  )
}

export default App