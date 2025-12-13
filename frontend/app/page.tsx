"use client";

import KanbanBoard from "@/components/board/KanbanBoard";
import { Button } from "@/components/ui/button";
import VoiceInputTaskCreation from "@/components/VoiceInputTaskCreation";
import { createTask } from "@/lib/api";
import { globalModalAtom, refreshAtom } from "@/lib/atoms";
import { TaskFormValues } from "@/types/task";
import { useAtom } from "jotai";
import { useState } from "react";

export default function Home() {
  const [refreshBoard, setRefreshBoard] = useAtom(refreshAtom);
  const [, openTaskModal] = useAtom(globalModalAtom);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: TaskFormValues) => {
    await createTask(data);
    setRefreshBoard(!refreshBoard);
  };

  const handleOpenModal = () => {
    openTaskModal({
      type: "taskForm",
      props: {
        onSubmit: onSubmit,
      },
      header: "Create Task",
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Project Dashboard</h1>
      <div className="flex gap-4">
        <Button onClick={handleOpenModal}>➕ Add Task</Button>
        {/* <TaskFormDialog
          trigger={<Button>➕ Add Task</Button>}
          onSubmit={(data) => onSubmit(data)}
        /> */}
        <VoiceInputTaskCreation />
      </div>
      <KanbanBoard />
    </div>
  );
}
