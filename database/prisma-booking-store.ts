import { PrismaClient } from '@prisma/client';
import Booking, { BookingDetails } from "../model/Booking";

const prisma = new PrismaClient();

export async function createBooking(booking: Booking) {
    try {
        return await prisma.$transaction(async (tx) => {
            const newBooking = await tx.booking.create({
                data: {
                    CustomerID: booking.CustomerID,
                    BookingDate: booking.BookingDate,
                    BookingDetails: {
                        create: booking.BookingDetails.map(detail => ({
                            CarID: detail.CarID,
                            Price: detail.Price,
                        })),
                    },
                },
                include: {
                    BookingDetails: true,
                },
            });

            for (const detail of booking.BookingDetails) {
                await tx.car.update({
                    where: { CarID: detail.CarID },
                    data: { Availability: "Booked" },
                });
            }

            return newBooking;
        });
    } catch (err) {
        console.log("Error creating booking", err);
        throw err;
    }
}

export async function getAllBookings() {
    try {
        return await prisma.booking.findMany({
            include: {
                BookingDetails: true,
                Customer: {
                    select: {
                        Name: true
                    }
                }
            },
        });
    } catch (err) {
        console.log("Error fetching bookings", err);
        throw err;
    }
}

export async function getBookingById(id: number) {
    try {
        return await prisma.booking.findUnique({
            where: { BookingID: id },
            include: {
                BookingDetails: {
                    include: {
                        Car: true
                    }
                },
                Customer: true
            },
        });
    } catch (err) {
        console.log("Error fetching booking", err);
        throw err;
    }
}

export async function updateBooking(id: number, booking: Booking) {
    try {
        return await prisma.$transaction(async (tx) => {
            const existingBooking = await tx.booking.findUnique({
                where: { BookingID: id },
                include: { BookingDetails: true }
            });

            if (!existingBooking) {
                throw new Error("Booking not found");
            }

            for (const detail of existingBooking.BookingDetails) {
                await tx.car.update({
                    where: { CarID: detail.CarID },
                    data: { Availability: "Available" }
                });
            }

            const updatedBooking = await tx.booking.update({
                where: { BookingID: id },
                data: {
                    CustomerID: booking.CustomerID,
                    BookingDate: booking.BookingDate,
                    BookingDetails: {
                        deleteMany: {},
                        create: booking.BookingDetails.map(detail => ({
                            CarID: detail.CarID,
                            Price: detail.Price,
                        })),
                    },
                },
                include: {
                    BookingDetails: true,
                },
            });

            for (const detail of booking.BookingDetails) {
                await tx.car.update({
                    where: { CarID: detail.CarID },
                    data: { Availability: "Booked" }
                });
            }

            return updatedBooking;
        });
    } catch (err) {
        console.log("Error updating booking", err);
        throw err;
    }
}

export async function deleteBooking(id: number) {
    try {
        return await prisma.$transaction(async (tx) => {
            const booking = await tx.booking.findUnique({
                where: { BookingID: id },
                include: { BookingDetails: true }
            });

            if (!booking) {
                throw new Error("Booking not found");
            }

            const deletedBooking = await tx.booking.delete({
                where: { BookingID: id },
            });

            for (const detail of booking.BookingDetails) {
                await tx.car.update({
                    where: { CarID: detail.CarID },
                    data: { Availability: "Available" }
                });
            }

            return deletedBooking;
        });
    } catch (err) {
        console.log("Error deleting booking", err);
        throw err;
    }
}