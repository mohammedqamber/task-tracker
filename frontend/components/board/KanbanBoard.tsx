"use client";

import { useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { fetchAllTasks, updateTask } from "@/lib/api";
import { useAtom } from "jotai";
import { refreshAtom } from "@/lib/atoms";
import { Task, taskStatus } from "@/types/task";
import TaskCard from "./TaskCard";

type Column = {
  title: string;
  tasks: Task[];
};

type Columns = {
  [key: string]: Column;
};

export default function KanbanBoard() {
  const [columns, setColumns] = useState<Columns>({
    todo: { title: "To Do", tasks: [] },
    inprogress: { title: "In Progress", tasks: [] },
    done: { title: "Done", tasks: [] },
  });

  const [refresh, setRefresh] = useAtom(refreshAtom);

  const loadTasks = async () => {
    const res = await fetchAllTasks();
    if (!res) return;

    const tasks = res;

    const grouped: Columns = {
      todo: {
        title: "To Do",
        tasks: tasks.filter((t) => t.status === "todo"),
      },
      inprogress: {
        title: "In Progress",
        tasks: tasks.filter((t) => t.status === "inprogress"),
      },
      done: {
        title: "Done",
        tasks: tasks.filter((t) => t.status === "done"),
      },
    };

    setColumns(grouped);
  };

  useEffect(() => {
    loadTasks();
  }, [refresh]);

  const onDragEnd = async (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceCol = columns[source.droppableId];
    const destCol = columns[destination.droppableId];

    const sourceTasks = [...sourceCol.tasks];
    const destTasks = [...destCol.tasks];

    const [moved] = sourceTasks.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      // Same column move
      sourceTasks.splice(destination.index, 0, moved);

      setColumns({
        ...columns,
        [source.droppableId]: { ...sourceCol, tasks: sourceTasks },
      });
    } else {
      // Move across columns
      destTasks.splice(destination.index, 0, moved);

      setColumns({
        ...columns,
        [source.droppableId]: { ...sourceCol, tasks: sourceTasks },
        [destination.droppableId]: { ...destCol, tasks: destTasks },
      });
      // Update task status in backend
      // This using of "as" is safe here because droppableId matches taskStatus keys but I know it's not ideal for production code

      await updateTask({
        taskId: moved.id,
        data: {
          status: destination.droppableId as taskStatus,
        },
      });
      setRefresh(!refresh);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-3 gap-2 py-4">
        {Object.entries(columns).map(([id, column]) => (
          <Droppable droppableId={id} key={id}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="bg-blue-100/35 px-3 py-1 rounded-lg min-h-[500px] border border-gray-500"
              >
                <h2 className="font-bold mb-3 text-lg">{column.title}</h2>

                {column.tasks.map((task, index) => (
                  <Draggable draggableId={task.id} index={index} key={task.id}>
                    {(provided) => <TaskCard provided={provided} task={task} />}
                  </Draggable>
                ))}

                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
}
