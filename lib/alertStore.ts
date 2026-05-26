import { create } from "zustand";

type AlertStore = {
  show: boolean;
  trigger: () => void;
};

export const useAlertStore = create<AlertStore>((set) => ({
  show: false,
  trigger: () => {
    set({ show: true });
    setTimeout(() => set({ show: false }), 3000);
  },
}));
