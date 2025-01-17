// zustand的基本使用;
import { create } from "zustand";

// 定义 Zustand 状态的类型
type AppleStore = {
  price: number;
  count: number;
  // 加减分别传入不传入参数-两种示例
  increment: (num: number) => void; // 传入参数
  decrement: () => void; // 不传参数
  getTotal: () => number;
}

// 使用类型参数为 Zustand store 显式定义类型
const useAppleStore = create<AppleStore>((set, get) => ({
  price: 7.0,
  count: 10,
  increment: (num: number) =>
    set((state) => ({
      ...state,
      count: state.count + num,
    })),
  decrement: () =>
    set((state) => ({
      ...state,
      count: state.count - 1,
    })),
  getTotal: () => get().count * get().price,
}));

export default useAppleStore;
