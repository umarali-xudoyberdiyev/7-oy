const prisma = require("../prisma");
const ensureUser = require("../utils/ensureUser");

const getAll = async (req, res, next) => {
  try {
    const habits = await prisma.odatlar.findMany({
      // where: { userId: req.userId },
      orderBy: { createdAt: "desc" },
      include: {
        _count: { select: { checkIns: true } },
      },
    });
    res.json({ success: true, data: habits });
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    await ensureUser(req.userId);

    const habit = await prisma.odatlar.create({
      data: {
        ...req.body,
        userId: req.userId,
      },
    });
    res.status(201).json({ success: true, data: habit });
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);

    const existing = await prisma.odatlar.findFirst({
      where: { id, userId: req.userId },
    });

    if (!existing) {
      return res.status(404).json({ success: false, error: "Odat topilmadi" });
    }

    await prisma.odatlar.delete({ where: { id } });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

module.exports = { getAll, create, remove };
