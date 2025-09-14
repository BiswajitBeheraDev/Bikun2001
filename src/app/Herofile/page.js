import ProductCard from '../components/productcard'
import Slider from '../components/slider'
import products from '../../../prisma/data/product'

export default function page() {
  return (
    <div>
        <Slider/>
      <section className="max-w-7xl mx-auto px-4 my-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  )
}
