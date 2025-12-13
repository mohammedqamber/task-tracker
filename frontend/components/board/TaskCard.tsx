import { Card, CardContent } from "../ui/card";
import TaskViewerDialog from "../TaskForm/TaskView";
import { Edit2Icon, Trash } from "lucide-react";
import { deleteTask, updateTask } from "@/lib/api";
import { DraggableProvided } from "@hello-pangea/dnd";
import { Task } from "@/types/task";
import { useAtom } from "jotai";
import { globalModalAtom, refreshAtom } from "@/lib/atoms";
import PriorityPill from "../pills/Priority";

const TaskCard = ({
  provided,
  task,
}: {
  provided: DraggableProvided;
  task: Task;
}) => {
  const [refresh, setRefresh] = useAtom(refreshAtom);
  const [, setOpenTaskModal] = useAtom(globalModalAtom);

  const handleDeleteTask = async (taskId: string) => {
    await deleteTask(taskId);
    setRefresh(!refresh);
  };

  const handleOpenTaskForm = (task: Task) => {
    setOpenTaskModal({
      type: "taskForm",
      header: "Edit Task",
      props: {
        initialValues: {
          title: task.title,
          description: task.description,
          priority: task.priority,
          status: task.status,
          dueDate: new Date(task.dueDate),
        },
        onSubmit: async (data) => {
          await updateTask({
            taskId: task.id,
            data: data,
            successMessage: "Task Updated Successfully",
          });
          setRefresh(!refresh);
        },
      },
    });
  };

  return (
    <Card
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className="flex flex-col border rounded-md mb-3 p-2 bg-gray-50 cursor-pointer hover:bg-gray-100 transition"
    >
      {/* Top row: Title + Priority */}

      <div className="flex flex-col w-full justify-start gap-4">
        <div className="flex justify-between ">
          <PriorityPill taskPriority={task.priority} className="px-1 py-0.5" />
          <CardContent className="flex gap-2 px-1 text-sm text-gray-600 cursor-pointer transition">
            <Edit2Icon
              className="hover:text-blue-500"
              onClick={() => handleOpenTaskForm(task)}
            />

            <Trash
              className="hover:text-red-600"
              onClick={() => handleDeleteTask(task.id)}
            />
          </CardContent>
        </div>
        <div>
          <TaskViewerDialog task={task}>
            <CardContent className="font-medium text-lg p-0">
              {task.title}
            </CardContent>
          </TaskViewerDialog>
        </div>
      </div>

      {/* Optional description (if you want) */}
      {/* {task.description && (
        <div className="text-sm text-gray-700 mt-1 pl-1">
          {task.description}
        </div>
      )} */}
    </Card>
  );
};

export default TaskCard;
