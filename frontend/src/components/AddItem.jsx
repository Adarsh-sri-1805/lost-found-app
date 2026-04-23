import { useState } from "react";
import API from "../api";

function AddItem({ refresh }) {
  const [form, setForm] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/items", form);
    refresh();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Item Name"
        onChange={(e)=>setForm({...form, itemName:e.target.value})} />

      <input placeholder="Description"
        onChange={(e)=>setForm({...form, description:e.target.value})} />

      <input placeholder="Type (Lost/Found)"
        onChange={(e)=>setForm({...form, type:e.target.value})} />

      <input placeholder="Location"
        onChange={(e)=>setForm({...form, location:e.target.value})} />

      <input placeholder="Contact Info"
        onChange={(e)=>setForm({...form, contactInfo:e.target.value})} />

      <button>Add Item</button>
    </form>
  );
}

export default AddItem;