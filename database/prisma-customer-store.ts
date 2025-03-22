import { PrismaClient } from '@prisma/client';
import Customer from "../model/Customer";

const prisma = new PrismaClient();

export async function addCustomer(customer: Customer) {
    try {
        return await prisma.customer.create({
            data: {
                Name: customer.Name,
                Address: customer.Address,
                Email: customer.Email,
                Phone: customer.Phone,
            }
        });
    } catch (err) {
        console.log("Error adding customer", err);
        throw err;
    }
}

export async function deleteCustomer(id: number) {
    try {
        return await prisma.customer.delete({
            where: { CustomerID: id }
        });
    } catch (err) {
        console.log("Error deleting customer", err);
        throw err;
    }
}

export async function getAllCustomers() {
    try {
        return await prisma.customer.findMany();
    } catch (err) {
        console.log("Error getting customers", err);
        throw err;
    }
}

export async function updateCustomer(id: number, customer: Customer) {
    try {
        return await prisma.customer.update({
            where: { CustomerID: id },
            data: {
                Name: customer.Name,
                Address: customer.Address,
                Email: customer.Email,
                Phone: customer.Phone
            }
        });
    } catch (err) {
        console.log("Error updating customer", err);
        throw err;
    }
}