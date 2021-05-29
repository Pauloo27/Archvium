import create from "zustand/vanilla";

const store = create((set) => ({
  user: undefined,
  token: undefined,

  update: (key, value) => set(() => ({ [key]: value })),
}));

export default store;
