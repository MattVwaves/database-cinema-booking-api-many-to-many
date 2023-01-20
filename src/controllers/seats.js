const { Prisma } = require("@prisma/client");
const { screening } = require("../utils/prisma");

const prisma = require("../utils/prisma");

const getSeats = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const seats = await prisma.seat.findMany({
    where: {
      screenId: Number(id),
    },
    include: {
      ticket: true,
    },
  });
  res.json({ seats });
};

const createTicket = async (req, res) => {
  const { screeningId, customerId } = req.body;
  const ticket = await prisma.ticket.create({
    data: {
      screening: {
        connect: {
          id: screeningId,
        },
      },
      customer: {
        connect: {
          id: customerId,
        },
      },
      seats: {
        connect: [
          {
            id: 1,
          },
        ],
      },
    },
    include: {
      screening: true,
      customer: true,
      seats: true,
    },
  });

  res.json({ ticket });
};

module.exports = { getSeats, createTicket };
