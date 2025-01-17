import { create } from "zustand";
import {
  createJSONStorage,
  devtools,
  persist,
  subscribeWithSelector,
} from "zustand/middleware";
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
  // 实际上使用的时候都可以提取封装配置
  immer(
    devtools(
      subscribeWithSelector(
        // subscribeWithSelector订阅较少的内容
        persist(
          (set, get) => ({
            price: 7.0,
            count: 10,
            color: "blue",
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
          }),
          {
            name: "myAppleStore", // localStorage的key
            // partialize: (state) => ({ count: state.count, color: state.color }) // 返回的对象是持久化的内容，如果省略者全部持久化
            partialize: (state) =>
              Object.fromEntries(
                Object.entries(state).filter(([key]) => key !== "count")
              ),
            // 如果只有一个字段不持久化，其他的都持久化, [上述代码只有color不吃酒话，其他的都持久化]

            storage: createJSONStorage(() => sessionStorage), // 持久化位置
          }
        )
      ),
      { enabled: true, name: "Apple Store" }
    )
  )
);

// 注释重要 **** 清除持久化[但是没有太大意义]
// useAppleStore.persist.clear();

// myAppleStore为localStorage的key
// persist会把状态持久化存储到localStorage
// devtools会在控制台打印日志

export default useAppleStore;

// 明确指定了 immer<AppleStore> 泛型类型，确保 immer 中间件正确识别状态结构。
// 中间件嵌套顺序

// 保持嵌套顺序为 devtools(persist(immer(...)))，因为 immer 修改状态的能力需要被 persist 和 devtools 共享。
// partialize 函数

// 如果不需要将某些状态持久化，可以通过 partialize 精确控制持久化的内容。例如，此处只持久化 price 和 color，不持久化 count。
// devtools 配置

// 配置 { enabled: true, name: "Apple Store" }，确保在 Redux DevTools 中正确显示。
// 消除类型报错

// 显式为 immer 和其他中间件提供泛型，避免 zustand 默认推断不兼容的类型。
