import { createTask, sendTranscriptToAPI } from "@/lib/api";
import { useAtom } from "jotai";
import { globalModalAtom, loaderAtom, refreshAtom } from "@/lib/atoms";
import { TaskFormValues } from "@/types/task";
import VoiceTaskDialog from "./SpeechRecognition";

const VoiceInputTaskCreation = () => {
  const [refreshBoard, setRefreshBoard] = useAtom(refreshAtom);
  const [, setLoading] = useAtom(loaderAtom);

  const [, setOpenTaskModal] = useAtom(globalModalAtom);

  const onSubmit = async (data: TaskFormValues) => {
    await createTask(data);
    setRefreshBoard(!refreshBoard);
    setOpenTaskModal({
      type: null,
    });
  };

  const handleOCRDataFromVoice = async (text: string) => {
    if (!text || text.trim().length === 0) return;

    setLoading(true);
    const res = await sendTranscriptToAPI(text);
    setLoading(false);

    if (res) {
      setOpenTaskModal({
        type: "taskForm",
        header: "Add Task",
        props: {
          onSubmit: onSubmit,
          initialValues: {
            title: res?.title ?? "",
            priority: res?.priority ?? "medium",
            status: res?.status ?? "todo",
            description: res?.description ?? "",
            dueDate: res?.dueDate ? new Date(res.dueDate) : new Date(),
          },
          transcript: text,
        },
      });
    }
  };

  return <VoiceTaskDialog onReset={(text) => handleOCRDataFromVoice(text)} />;
};

export default VoiceInputTaskCreation;
