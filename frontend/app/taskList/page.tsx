"use client";

import TaskFilters from "@/components/Filters/TaskFilters";
import SearchBar from "@/components/TaskList/SearchBar";
import TaskTable from "@/components/TaskList/TaskTable";
import { fetchAllTasks } from "@/lib/api";
import { refreshAtom } from "@/lib/atoms";
import { Task, TaskFilter } from "@/types/task";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";

const page = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [refresh] = useAtom(refreshAtom);
  const loadTasks = async (filters?: TaskFilter) => {
    const tasks = await fetchAllTasks({ filters });
    if (!tasks) return;
    setTasks(tasks);
  };

  useEffect(() => {
    loadTasks();
  }, [refresh]);

  return (
    <div className="p-4">
      <h1 className="text-xl text-gray-600 mb-3">List</h1>
      <div className="flex justify-between my-2">
        <SearchBar onSearch={(search) => loadTasks({ search: search })} />
        <TaskFilters onApply={(filters) => loadTasks(filters)} />
      </div>
      <TaskTable tasks={tasks} />
    </div>
  );
};

export default page;
