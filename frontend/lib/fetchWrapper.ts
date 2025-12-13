import { ApiResponse } from "@/types/api";
import { toast } from "sonner";

export async function apiFetch<T>({
  url,
  options,
  successMessage,
}: {
  url: string;
  options?: RequestInit;
  successMessage?: string;
}): Promise<T | null> {
  try {
    const res = await fetch(url, {
      headers: { "Content-Type": "application/json" },
      ...options,
    });

    const json: ApiResponse<T> = await res.json();

    // Backend returned { success:false, error:"..." }
    if ("error" in json) {
      toast.error(json.error || "Something went wrong");
      return null;
    }

    // Return data directly
    if (successMessage) {
      toast.success(successMessage);
    }
    return json.data;
  } catch (err) {
    //Network error (server down, CORS, timeout etc)
    toast.error("Somnething went wrong. Please try again.");
    console.error("Fetch error:", err);

    return null;
  }
}
