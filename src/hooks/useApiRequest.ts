import { ref } from "vue";

export function useApiRequest<D>(
  loadingHandler?: () => () => void | undefined,
  successMessageHandler?: (response: any) => void
) {
  const data = ref<D | null>(null);
  const loading = ref(false);
  const error = ref<any>(null);

  const fetchData = async <T = undefined, R = undefined>(
    requestFunction: (requestData?: T) => Promise<R>,
    requestData?: T
  ) => {
    let hideLoading: (() => void) | null = null;
    try {
      loading.value = true;
      if (loadingHandler) {
        hideLoading = loadingHandler();
      }
      error.value = null;
      const response = await requestFunction(requestData);
      data.value = response as any;
      successMessageHandler?.(response);
    } catch (err) {
      if (err instanceof Error) {
        error.value = err;
        throw new Error(err.message);
      } else {
        error.value = new Error("An error occurred.");
        throw new Error("An error occurred.");
      }
    } finally {
      loading.value = false;
      hideLoading?.();
    }
  };
  return { data, loading, error, fetchData };
}
