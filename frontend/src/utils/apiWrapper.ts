import toast from "react-hot-toast";
import { getFriendlyErrorMessage } from "./api";

export async function handleApi<T>(
  promise: Promise<T>,
  fallbackMessage = "Request failed"
): Promise<{ data: T | null; error: any }> {
  try {
    const result = await promise;
    return { data: result, error: null };
  } catch (error: any) {
    toast.error(getFriendlyErrorMessage(error) || fallbackMessage);
    return { data: null, error };
  }
}
