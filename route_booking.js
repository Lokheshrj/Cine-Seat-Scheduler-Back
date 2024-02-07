import express from "express";
import { booking, deleteBooking, getBookingById } from "./controller_booking.js";
const bookingRouter = express.Router();
bookingRouter.get('/:id',getBookingById);
bookingRouter.post('/',booking);
bookingRouter.delete('/:id',deleteBooking);
export default bookingRouter;