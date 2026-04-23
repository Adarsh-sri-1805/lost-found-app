const express = require("express");
const Item = require("../models/Item");
const auth = require("../middleware/authMiddleware");

const router = express.Router();


// ➕ ADD ITEM (Protected)
router.post("/", auth, async (req, res) => {
    try {
        const { itemName, description, type, location, contactInfo } = req.body;

        const item = new Item({
            user: req.user,
            itemName,
            description,
            type,
            location,
            contactInfo
        });

        await item.save();
        res.json(item);

    } catch (err) {
        console.log(err.message);
        res.status(500).json({ msg: "Server error" });
    }
});


// 📄 GET ALL ITEMS (Public)
router.get("/", async (req, res) => {
    try {
        const items = await Item.find().populate("user", "name email");
        res.json(items);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ msg: "Server error" });
    }
});


// 🔎 SEARCH ITEM (IMPORTANT: BEFORE /:id)
router.get("/search/:name", async (req, res) => {
    try {
        const items = await Item.find({
            itemName: { $regex: req.params.name, $options: "i" }
        });

        res.json(items);

    } catch (err) {
        console.log(err.message);
        res.status(500).json({ msg: "Server error" });
    }
});


// 🔍 GET ITEM BY ID (KEEP LAST)
router.get("/:id", async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);

        if (!item) {
            return res.status(404).json({ msg: "Item not found" });
        }

        res.json(item);

    } catch (err) {
        console.log(err.message);
        res.status(500).json({ msg: "Server error" });
    }
});


// ✏️ UPDATE ITEM (Protected)
router.put("/:id", auth, async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);

        if (!item) {
            return res.status(404).json({ msg: "Item not found" });
        }

        // Only owner can update
        if (item.user.toString() !== req.user) {
            return res.status(401).json({ msg: "Not authorized" });
        }

        const updatedItem = await Item.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(updatedItem);

    } catch (err) {
        console.log(err.message);
        res.status(500).json({ msg: "Server error" });
    }
});


// ❌ DELETE ITEM (Protected)
router.delete("/:id", auth, async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);

        if (!item) {
            return res.status(404).json({ msg: "Item not found" });
        }

        // Only owner can delete
        if (item.user.toString() !== req.user) {
            return res.status(401).json({ msg: "Not authorized" });
        }

        await item.deleteOne();

        res.json({ msg: "Item deleted successfully" });

    } catch (err) {
        console.log(err.message);
        res.status(500).json({ msg: "Server error" });
    }
});

module.exports = router;