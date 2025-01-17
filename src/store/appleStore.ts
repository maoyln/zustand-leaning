import { create } from "zustand";

// 定义 Zustand 状态的类型
interface AppleStore {
  price: number;
  count: number;
  increment: () => void;
  decrement: () => void;
  getTotal: () => number;
}

// 使用类型参数为 Zustand store 显式定义类型
const useAppleStore = create<AppleStore>((set, get) => ({
  price: 7.0,
  count: 10,
  increment: () =>
    set((state) => ({
      ...state,
      count: state.count + 1,
    })),
  decrement: () =>
    set((state) => ({
      ...state,
      count: state.count - 1,
    })),
  getTotal: () => get().count * get().price,
}));

export default useAppleStore;
