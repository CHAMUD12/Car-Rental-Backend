import express from "express";
import Customer from "../model/Customer";
import {
    addCustomer,
    deleteCustomer,
    getAllCustomers,
    updateCustomer
} from "../database/prisma-customer-store";

const router = express.Router();

router.post("/add", async (req, res) => {
    try {
        const customer: Customer = req.body;
        const result = await addCustomer(customer);
        res.status(201).json(result);
    } catch (err) {
        res.status(500).send("Error adding customer");
    }
});

router.get("/view", async (req, res) => {
    try {
        const customers = await getAllCustomers();
        res.json(customers);
    } catch (err) {
        res.status(500).send("Error fetching customers");
    }
});

router.delete("/delete/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        await deleteCustomer(id);
        res.status(204).send();
    } catch (err) {
        res.status(500).send("Error deleting customer");
    }
});

router.put("/update/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const customer: Customer = req.body;
        const updated = await updateCustomer(id, customer);
        res.json(updated);
    } catch (err) {
        res.status(500).send("Error updating customer");
    }
});

export default router;