import { TaskFormDialogType } from "@/components/TaskForm/TaskFormDialog";

export type ModalPayload =
  | {
      type: "taskForm";
      header?: string;
      props: TaskFormDialogType;
    }
  | {
      type: null;
      header?: "";
      props?: undefined;
    };
