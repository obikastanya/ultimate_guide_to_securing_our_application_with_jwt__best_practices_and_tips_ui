import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";

import sytles from "@styles/Product.module.css";
import apis from "@services/product";

function ProductDetail({ id }) {
  const router = useRouter();

  const [productId, setProductId] = useState(id);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [discountpercentage, setDiscountPercentage] = useState(0);
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(0);
  const [stock, setStock] = useState(0);
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");

  const [loading, setLoading] = useState(false);

  const setProduct = (product) => {
    setTitle(product.title);
    setPrice(product.price);
    setDiscountPercentage(product.discountpercentage);
    setDescription(product.description);
    setRating(product.rating);
    setStock(product.stock);
    setBrand(product.brand);
    setCategory(product.category);
  };

  const useEffectCallback = () => {
    const fetchData = async () => {
      setLoading(true);
      const response = await apis.getProduct(productId);
      setLoading(false);
      const data = await response.json();
      if (response.status != 200) return alert(data.message);
      setProduct(data.data);
    };

    fetchData();
  };

  useEffect(useEffectCallback, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = {
      title,
      price,
      discountpercentage,
      description,
      rating,
      stock,
      brand,
      category,
    };
    const response = await apis.updateProduct(productId, payload);
    const data = await response.json();
    if (response.status != 200) return alert(data.message);
    alert(data.message);
    router.push("/product");
  };
  return (
    <div>
      <form className={sytles.form} onSubmit={handleSubmit}>
        <h2>Detail Product</h2>
        <hr />
        <label>Id</label>
        <input value={productId} disabled />
        <label>Title</label>
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <label>Description</label>
        <input
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        <label>Price</label>
        <input
          type="number"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
        />
        <label>Discount Percentage</label>
        <input
          value={discountpercentage}
          onChange={(event) => setDiscountPercentage(event.target.value)}
        />
        <label>Rating</label>
        <input
          value={rating}
          onChange={(event) => setRating(event.target.value)}
        />
        <label>Stock</label>
        <input
          value={stock}
          onChange={(event) => setStock(event.target.value)}
        />
        <label>Brand</label>
        <input
          value={brand}
          onChange={(event) => setBrand(event.target.value)}
        />
        <label>Category</label>
        <input
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Update"}
        </button>
      </form>
    </div>
  );
}

ProductDetail.getInitialProps = async (context) => {
  const { query } = context;
  const id = query.id;
  return { id };
};

export default ProductDetail;
