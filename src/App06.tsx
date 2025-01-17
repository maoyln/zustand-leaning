import React, { useState, useEffect } from "react";
import useAppleStore from "./store/appleStore06";
import { useShallow } from "zustand/react/shallow";

const Child1 = () => {
  const price = useAppleStore((state) => state.price);
  const count = useAppleStore((state) => state.count);
  const increment = useAppleStore((state) => state.increment);
  const decrement = useAppleStore((state) => state.decrement);
  const getTotal = useAppleStore((state) => state.getTotal);
  const doubleCount = useAppleStore((state) => state.doubleCount);
  console.log("----Child1-----");

  return (
    <div>
      <h1>zustand：发布订阅模式</h1>
      <hr />
      <div>单价：{price}</div>
      <div>数量：{count}</div>
      <div>总价：{getTotal()}</div>
      <div>
        <button onClick={() => increment(1)}>数量+1</button>{" "}
        <button onClick={() => decrement()}>数量-1</button>
      </div>
      <div>
        <button onClick={() => doubleCount()}>双倍价格</button>
      </div>
    </div>
  );
};

const Child2 = () => {
  // 使用useShallow优化下面代码，当引用的属性发生改变时不会重新渲染
  const { price, color } = useAppleStore(
    useShallow((state) => ({
      price: state.price,
      color: state.color,
    }))
  ); // 这种写法不会重新渲染
  const [text, setText] = useState(
    "还没有改变有，可以在这里根据实际值初始化一个值"
  );

  useEffect(() => {
    // 订阅值在初始化的时候订阅一次，且销毁页面需要取消订阅
    // const cancelSub = useAppleStore.subscribe((state, prevState) => {
    //   console.log('状态改变-这里执行');
    //   // console.log(state, 'state');
    //   // console.log(prevState, 'prevState');
    //   if (state.count >= 7 && prevState.count < 7) {
    //     setText('满7送1')
    //   } else if(state.count < 7 && prevState.count >= 7) {
    //     setText('有点少')
    //   }
    // })
    
    // 只订阅特定的属性
    const cancelSub = useAppleStore.subscribe(
      (state) => state.count,
      (count: number, prevCount: number) => {
        console.log(count, 'count---1');
        console.log(prevCount, 'prevCount---1');
        if (count >= 7 && prevCount < 7 || count === prevCount && count >= 7) {
          setText("满7送1");
        } else if (count < 7 && prevCount >= 7 || count === prevCount && count < 7) {
          setText("有点少");
        }
      },
      {
        // equalityFn: shallow,
        fireImmediately: true // 立即执行
      }
    );

    return cancelSub;
  }, []);

  console.log("----Child2-----");
  // 订阅

  return (
    <div>
      <h1>zustand使用简化</h1>
      <hr />
      <div>单价：{price}</div>
      <div>数量：{color}</div>
      <div>评价【订阅】：{text}</div>
    </div>
  );
};

function App() {
  return (
    <>
      <Child1 />
      <Child2 />
    </>
  );
}

export default App;
