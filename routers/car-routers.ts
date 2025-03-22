import express from "express";
import Car from "../model/Car";
import {
    addCar,
    deleteCar,
    getAllCars,
    updateCar
} from "../database/prisma-car-store";

const router = express.Router();

router.post("/add", async (req, res) => {

    try {
        const car: Car = req.body;
        const result = await addCar(car);
        res.status(201).json(result);
    } catch (err) {
        res.status(500).send("Error adding car");
    }
});

router.get("/view", async (req, res) => {
    try {
        const cars = await getAllCars();
        res.json(cars);
    } catch (err) {
        res.status(500).send("Error fetching cars");
    }
});

router.delete("/delete/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        await deleteCar(id);
        res.status(204).send();
    } catch (err) {
        res.status(500).send("Error deleting car");
    }
});

router.put("/update/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const car: Car = req.body;
        const updated = await updateCar(id, car);
        res.json(updated);
    } catch (err) {
        res.status(500).send("Error updating car");
    }
});

export default router;