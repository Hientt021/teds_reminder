import { IMessageType } from "@/hook/toast/useToast";
import { store } from "@/store";
import { appActions } from "@/store/features/appSlice";

export const toast = (message: string, type: IMessageType = "info") => {
  store.dispatch(appActions.showToast({ message, type }));
};
