const { Prisma } = require("@prisma/client");
const { screening } = require("../utils/prisma");

const prisma = require("../utils/prisma");

const getSeats = async (req, res) => {
  const { id } = req.params;
  const seats = await prisma.seat.findMany({
    where: {
      screenId: Number(id),
    },
  });
  res.json({ seats });
};

const createTicket = async (req, res) => {
  const { screeningId, customerId, seatIds } = req.body;
  console.log(req.body);

  const createdTicket = await prisma.ticket.create({
    data: {
      screeningId: screeningId,
      customerId: customerId,
    },
  });

  await prisma.ticketSeats.createMany({
    data: seatIds.map((id) => {
      return {
        seatId: id,
        ticketId: createdTicket.id,
      };
    }),
  });

  const ticket = await prisma.ticket.findFirst({
    where: {
      id: createdTicket.id,
    },
    include: {
      seats: {
        include: {
          seat: true,
        },
      },
    },
  });

  res.json({ data: ticket });
};

module.exports = { getSeats, createTicket };
