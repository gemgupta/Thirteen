import ProductItem from "./ProductItem";
import classes from "./Products.module.css";
import DummyProducts from "./DummyProducts";
const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DummyProducts.map((products) => (
          <ProductItem
          key={products.id}
          id={products.id}
            title={products.title}
            price={products.price}
            description={products.description}
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;
