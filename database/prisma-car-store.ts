import { PrismaClient } from '@prisma/client';
import Car from "../model/Car";

const prisma = new PrismaClient();

export async function addCar(car: Car) {
    try {
        return await prisma.car.create({
            data: {
                LicensePlateNum: car.LicensePlateNum,
                Type: car.Type,
                Brand: car.Brand,
                Availability: car.Availability,
                Price: car.Price
            }
        });
    } catch (err) {
        console.log("Error adding car", err);
        throw err;
    }
}

export async function deleteCar(id: number) {
    try {
        return await prisma.car.delete({
            where: { CarID: id }
        });
    } catch (err) {
        console.log("Error deleting car", err);
        throw err;
    }
}

export async function getAllCars() {
    try {
        return await prisma.car.findMany();
    } catch (err) {
        console.log("Error getting cars", err);
        throw err;
    }
}

export async function updateCar(id: number, car: Car) {
    try {
        return await prisma.car.update({
            where: { CarID: id },
            data: {
                LicensePlateNum: car.LicensePlateNum,
                Type: car.Type,
                Brand: car.Brand,
                Availability: car.Availability,
                Price: car.Price
            }
        });
    } catch (err) {
        console.log("Error updating car", err);
        throw err;
    }
}