import { Task, TaskFilter, TaskFormValues } from "@/types/task";
import { apiFetch } from "./fetchWrapper";

export async function sendTranscriptToAPI(transcript: string) {
  const res = apiFetch<Task>({
    url: "http://localhost:4000/api/tasks/parse",
    options: {
      method: "POST",
      body: JSON.stringify({ transcript }),
    },
  });

  return res;
}

export async function createTask(data: TaskFormValues) {
  const res = await apiFetch<Task>({
    url: "http://localhost:4000/api/tasks/create",
    options: {
      method: "POST",
      body: JSON.stringify(data),
    },
    successMessage: "Task created successfully",
  });
  return res;
}

export async function deleteTask(taskId: string) {
  const res = await apiFetch<null>({
    url: `http://localhost:4000/api/tasks/deleteTask/${taskId}`,
    options: { method: "DELETE" },
    successMessage: "Task deleted successfully",
  });
  console.log("Delete response:", res);
  return res;
}

export async function fetchAllTasks({
  filters,
}: { filters?: TaskFilter } = {}) {
  const res = await apiFetch<Task[]>({
    url: "http://localhost:4000/api/tasks/getAllTasks",
    options: { method: "POST", body: JSON.stringify(filters) },
  });
  return res;
}

export async function updateTask({
  taskId,
  data,
  successMessage,
}: {
  taskId: string;
  data: Partial<TaskFormValues>;
  successMessage?: string;
}) {
  const res = await apiFetch<Task>({
    url: `http://localhost:4000/api/tasks/updateTask/${taskId}`,
    options: {
      method: "PATCH",
      body: JSON.stringify(data),
    },
    successMessage: successMessage,
  });

  return res;
}
