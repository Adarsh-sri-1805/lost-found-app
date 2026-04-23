import { useEffect, useState } from "react";
import API from "../api";
import AddItem from "./AddItem";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const fetchItems = async () => {
    const res = await API.get("/items");
    setItems(res.data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // 🔍 Search
  const handleSearch = async () => {
    const res = await API.get(`/items/search/${search}`);
    setItems(res.data);
  };

  // ❌ Delete
  const deleteItem = async (id) => {
    await API.delete(`/items/${id}`);
    fetchItems();
  };

  // ✏️ Update
  const updateItem = async (id) => {
    const newName = prompt("Enter new name");
    if (!newName) return;

    await API.put(`/items/${id}`, { itemName: newName });
    fetchItems();
  };

  // 🚪 Logout
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="container">
      <h2>Dashboard</h2>

      <button onClick={logout}>Logout</button>

      {/* Add Item */}
      <AddItem refresh={fetchItems} />

      {/* Search */}
      <input
        placeholder="Search item"
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {/* Items List */}
      {items.map((item) => (
        <div className="item" key={item._id}>
          <div className="row">
            <strong>{item.itemName}</strong>
            <span>{item.type}</span>
          </div>

          <p>{item.description}</p>
          <p><b>Location:</b> {item.location}</p>

          <button onClick={() => updateItem(item._id)}>Update</button>
          <button onClick={() => deleteItem(item._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;