import { store } from "@/store";
import { appActions } from "@/store/features/appSlice";
import { IMessageType } from "@/type";

export const toast = (message: string, type: IMessageType = "info") => {
  store.dispatch(appActions.showToast({ message, type }));
};
