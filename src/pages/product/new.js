import { useState } from "react";
import { useRouter } from "next/router";

import apis from "@services/product";

import sytles from "@styles/Product.module.css";

import AuthGuard from "@components/middleware/AuthGuard";

export default function NewProduct() {
  const [id, setId] = useState(0);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [discountpercentage, setDiscountPercentage] = useState(0);
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(0);
  const [stock, setStock] = useState(0);
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = {
      id,
      title,
      price,
      discountpercentage,
      description,
      rating,
      stock,
      brand,
      category,
    };
    setLoading(true);
    const response = await apis.addProduct(payload);
    setLoading(false);
    const data = await response.json();
    if (response.status != 200) return alert(data.message);
    alert(data.message);
    router.push("/product");
  };

  return (
    <AuthGuard permission="product:create">
      <div>
        <form className={sytles.form} onSubmit={handleSubmit}>
          <h2>Add Product</h2>
          <hr />
          <label>Id</label>
          <input value={id} onChange={(event) => setId(event.target.value)} />
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
            {loading ? "Loading..." : "Submit"}
          </button>
        </form>
      </div>
    </AuthGuard>
  );
}
