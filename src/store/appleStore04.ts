import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
// 定义 Zustand 状态的类型
type AppleStore = {
  price: number;
  count: number;
  color: string;
  increment: (num: number) => void; // 传入参数
  decrement: () => void; // 不传参数
  getTotal: () => number;
  doubleCount: () => Promise<void>; // 异步方法
};

// 使用 Immer 中间件创建 Zustand 状态
const useAppleStore = create<AppleStore>()(
  // 虽然代表爆红，但是是可以使用的
  immer(devtools((set, get) => ({
    price: 7.0,
    count: 10,
    color: 'blue',
    // 使用 Immer 的写法直接修改状态
    increment: (num: number) =>
      set((state) => {
        state.count += num; // 直接修改 count 属性
      }),

    decrement: () =>
      set((state) => {
        state.count -= 1; // 直接修改 count 属性
      }),

    getTotal: () => get().count * get().price, // 读取状态

    // 异步方法
    async doubleCount() {
      const rate = await Promise.resolve(2); // 模拟异步操作
      set((state) => {
        state.count *= rate; // 直接修改 count 属性
      });
    },
  }), {enabled: true, name: 'Apple Store'}))
);

export default useAppleStore;
