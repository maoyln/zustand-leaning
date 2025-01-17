import useAppleStore from "./store/appleStore02"
import { useShallow } from 'zustand/react/shallow';

const Child1 = () => {
  const price = useAppleStore(state => state.price);
  const count = useAppleStore(state => state.count);
  const increment = useAppleStore(state => state.increment);
  const decrement = useAppleStore(state => state.decrement);
  const getTotal = useAppleStore(state => state.getTotal);
  const doubleCount = useAppleStore(state => state.doubleCount);

  return (
    <div>
      <h1>zustand使用简化</h1><hr />
      <div>单价：{price}</div>
      <div>数量：{count}</div>
      <div>总价：{getTotal()}</div>
      <div><button onClick={() => increment(1)}>数量+1</button> <button onClick={() => decrement()}>数量-1</button></div>
      <div><button onClick={() => doubleCount()}>双倍价格</button></div>
    </div>
  )
}


const Child2 = () => {
  // 使用解构的形式，只要useAppleStore中内容发生改则会重新渲染
  // const { price } = useAppleStore(); // 这种方法会重新渲染
  // const price = useAppleStore(state => state.price); // 这种写法不会重新渲染

  // const { price, color } = useAppleStore(
  //   state => ({
  //     price: state.price,
  //     color: state.color
  //   })
  // ); // 这种写法会报错【 Maximum update depth exceeded】

  // 使用useShallow优化下面代码，当引用的属性发生改变时不会重新渲染
  const { price, color } = useAppleStore(useShallow(
    state => ({
      price: state.price,
      color: state.color
    })
  )); // 这种写法不会重新渲染


  console.log('----Child2-----');

  return (
    <div>
      <h1>zustand使用简化</h1><hr />
      <div>单价：{price}</div>
      <div>数量：{color}</div>
    </div>
  )
}

function App() {

  return (
    <>
      <Child1 />
      <Child2 />
    </>
  )
}

export default App
