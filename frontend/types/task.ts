export type TaskFormValues = {
  title: string;
  priority: "low" | "medium" | "high";
  status: taskStatus;
  description?: string;
  dueDate: Date;
};

export type taskStatus = "todo" | "inprogress" | "done";

export type TaskFilter = {
  status?: taskStatus;
  priority?: "low" | "medium" | "high";
  dueDateFrom?: string;
  dueDateTo?: string;
  search?: string;
};

export type Task = {
  id: string; // uuid or number - depending on DB
  title: string; // required
  description?: string; // optional
  priority: "low" | "medium" | "high";
  status: taskStatus;
  dueDate: Date; // ISO date string
  createdAt: string; // ISO date
};
