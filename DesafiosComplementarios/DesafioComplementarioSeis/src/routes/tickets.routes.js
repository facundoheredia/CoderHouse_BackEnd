import { Router } from "express";
import { passportError,authorization } from "../utils/messagesError.js";
import { getTickets, getTicket, getTicketByCode, getTicketsByEmail } from "../controller/tickets.controller.js";

const ticketRouter = Router ();

ticketRouter.get ("/", passportError("jwt"), authorization("admin"), getTickets);
ticketRouter.get ("/:tid", passportError("jwt"), authorization("admin"), getTicket);
ticketRouter.get ("/codigo/:tcode", passportError("jwt"), authorization("admin"), getTicketByCode);
ticketRouter.get ("/email/:email", passportError("jwt"), authorization("user"), getTicketsByEmail);

export default ticketRouter;