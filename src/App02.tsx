import useAppleStore from "./store/appleStore02"
const Child1 = () => {
  const price = useAppleStore(state => state.price);
  const count = useAppleStore(state => state.count);
  const increment = useAppleStore(state => state.increment);
  const decrement = useAppleStore(state => state.decrement);
  const getTotal = useAppleStore(state => state.getTotal);
  const doubleCount = useAppleStore(state => state.doubleCount);

  return (
    <div>
      <h1>zustand插件:immer,简化store的写法</h1><hr />
      <div>单价：{price}</div>
      <div>数量：{count}</div>
      <div>总价：{getTotal()}</div>
      <div><button onClick={() => increment(1)}>数量+1</button> <button onClick={() => decrement()}>数量-1</button></div>
      <div><button onClick={() => doubleCount()}>双倍价格</button></div>
    </div>
  )
}

function App() {

  return (
    <>
      <Child1 />
    </>
  )
}

export default App
