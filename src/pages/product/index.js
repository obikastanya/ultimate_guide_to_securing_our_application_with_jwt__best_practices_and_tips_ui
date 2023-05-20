import { useEffect } from "react";
import { useState } from "react";
import Link from "next/link";

import sytles from "@styles/Product.module.css";

import apis from "@services/product";
import auth from "@utils/auth";

import AuthGuard from "@components/midleware/AuthGuard";

export default function Product() {
  const [loading, setLoading] = useState("");
  const [products, setProducts] = useState([]);
  const [reloadData, setReloadData] = useState(false);

  const [hasCreatePermission, setCreatePermission] = useState(false);
  const [hasUpdatePermission, setUpdatePermission] = useState(false);
  const [hasDeletePermission, setDeletePermission] = useState(false);

  const handleClickDelete = async (event) => {
    event.preventDefault();

    const selectedIndex = event.target.dataset.index;
    const selectedproduct = products[selectedIndex];

    const confirmStatus = confirm(
      `Are you sure to delete ${selectedproduct.title}?`
    );
    if (!confirmStatus) return;

    const response = await apis.deleteProduct(selectedproduct.id);
    const data = await response.json();

    if (response.status != 200) return alert(data.message);
    alert(data.message);
    setReloadData(!reloadData);
  };

  const useEffectCallback = () => {
    setCreatePermission(auth.hasPermission("product:create"));
    setUpdatePermission(auth.hasPermission("product:update"));
    setDeletePermission(auth.hasPermission("product:delete"));

    async function fetchData() {
      setLoading(true);
      const response = await apis.getProducts();

      const data = await response.json();
      setLoading(false);
      if (response.status != 200) return console.log(data.message);
      setProducts(data.data);
      return;
    }

    fetchData();
  };

  useEffect(useEffectCallback, [reloadData]);

  if (loading) return <p>Loading...</p>;
  return (
    <AuthGuard permission="product:view">
      <div className={sytles.container}>
        <h2>Product List</h2>
        <Link href="/product/new">
          <button className={sytles.button} hidden={!hasCreatePermission}>
            Add
          </button>
        </Link>
        <table className={sytles.table}>
          <thead>
            <tr>
              <th>No</th>
              <th>Title</th>
              <th>Description</th>
              <th>Price</th>
              <th>Discount Percentage</th>
              <th>Rating</th>
              <th>Stock</th>
              <th>Brand</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.length ? (
              products.map((row, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{row.title}</td>
                  <td>{row.description}</td>
                  <td>{row.price}</td>
                  <td>{row.discountpercentage}</td>
                  <td>{row.rating}</td>
                  <td>{row.stock}</td>
                  <td>{row.brand}</td>
                  <td>{row.category}</td>
                  <td>
                    <Link href={`/product/${row.id}`}>
                      <button
                        className={sytles.mg5}
                        disabled={!hasUpdatePermission}
                      >
                        Edit
                      </button>
                    </Link>
                    <button
                      className={sytles.mg5}
                      data-index={index}
                      onClick={handleClickDelete}
                      disabled={!hasDeletePermission}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={10} className={sytles.textCenter}>
                  No product found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </AuthGuard>
  );
}
