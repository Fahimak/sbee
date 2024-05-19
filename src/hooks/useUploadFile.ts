import { useState } from "react";
import { AxiosProgressEvent } from "axios";

type HandleProgressCb<T = any> = (e: T) => void;

type ReturnUseUploadFileProgress = {
  progress: number;
  handleProgress: HandleProgressCb<AxiosProgressEvent>;
  reset: () => void;
};

export const useUploadFileProgress = (): ReturnUseUploadFileProgress => {
  const [progress, setProgress] = useState<number>(0);

  const handleProgress = (e: AxiosProgressEvent) => {
    const _progress = e.progress ?? 0;
    setProgress(Math.round(_progress * 100));
  };

  const reset = () => {
    setProgress(0);
  };

  return { progress, handleProgress, reset };
};
