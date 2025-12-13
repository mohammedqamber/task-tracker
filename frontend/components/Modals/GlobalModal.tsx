"use client";

import { useAtom } from "jotai";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { globalModalAtom } from "@/lib/atoms";
import TaskFormDialog from "../TaskForm/TaskFormDialog";

export default function GlobalModal() {
  const [modal, setModal] = useAtom(globalModalAtom);

  const isOpen = modal.type !== null;

  return (
    <Dialog open={isOpen} onOpenChange={() => setModal({ type: null })}>
      <DialogContent>
        <DialogHeader className="mb-4">
          <DialogTitle>{modal.header}</DialogTitle>
        </DialogHeader>
        {modal.type === "taskForm" && <TaskFormDialog {...modal.props} />}

        {/* {modal.type === "profile" && (
          <ProfileModal
            {...modal.props}
            onClose={() => setModal({ type: null })}
          />
        )}

        {modal.type === "settings" && (
          <SettingsModal onClose={() => setModal({ type: null })} />
        )} */}
      </DialogContent>
    </Dialog>
  );
}
