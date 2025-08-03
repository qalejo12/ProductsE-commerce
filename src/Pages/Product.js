import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Product.css";

export default function Product() {
  const [productos, setProductos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/productos");
      setProductos(res.data);
    } catch (error) {
      console.error("Error al cargar productos:", error);
    }
  };

  const guardarProducto = async () => {
    if (!nombre || !precio) {
      alert("Por favor completa todos los campos.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8080/api/productos", {
        nombre,
        precio,
      });
      setProductos([...productos, res.data]);
      setNombre("");
      setPrecio("");
    } catch (error) {
      console.error("Error al guardar el producto:", error);
    }
  };

  return (
    <div className="product-container">
      <h2>🛒 Gestión de Productos</h2>

      <div className="form-producto">
        <input
          type="text"
          placeholder="Nombre del producto"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          type="number"
          placeholder="Precio"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
        />
        <button onClick={guardarProducto}>Agregar</button>
      </div>

      <div className="product-grid">
        {productos.map((prod) => (
          <div key={prod.id} className="product-card">
            <h3>{prod.nombre}</h3>
            <p>${prod.precio}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
