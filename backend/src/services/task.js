import { PrismaClient } from "@prisma/client"; 
export const prisma = new PrismaClient();


export async function createTask(data) {
  return prisma.task.create({
    data,
  });
}

export async function getAllTasks(filters) {
  const { status, priority, dueDateFrom, dueDateTo, search } = filters || {};
  return prisma.task.findMany({
     where: {
      status: status || undefined,
      priority: priority || undefined,
      dueDate: dueDateFrom && dueDateTo
        ? {
            gte: new Date(dueDateFrom),
            lte: new Date(dueDateTo) ,
          }
        : undefined,
        title: search && search.trim() !== ""
        ? {
            contains: search,
            mode: "insensitive",
          }
        : undefined,
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function deleteTask(id) {
  return prisma.task.delete({
    where: { id },
  });
}

export async function updateTaskService(id, payload) {
  // Remove undefined fields to avoid Prisma errors
  Object.keys(payload).forEach((key) => {
    if (payload[key] === undefined) delete payload[key];
  });

  const updatedTask = await prisma.task.update({
    where: { id },
    data: payload,
  });

  return updatedTask;
}
