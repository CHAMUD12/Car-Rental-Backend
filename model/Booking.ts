export default class Booking {
    BookingID!: number;
    CustomerID!: number;
    BookingDate!: Date;
    BookingDetails!: BookingDetails[];
}

export class BookingDetails {
    BookingDetailsID!: number;
    BookingID!: number;
    CarID!: number;
    Price!: number;
}