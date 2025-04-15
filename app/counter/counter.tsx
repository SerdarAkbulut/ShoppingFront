import React from "react";
import Button from "@mui/material/Button";
import {
  decrement,
  increment,
  incrementByAmount,
} from "../store/counter/counterSlice";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
function Counter() {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();
  return (
    <>
      {count}
      <div>
        <Button onClick={() => dispatch(increment())} variant="contained">
          increment
        </Button>
        <Button onClick={() => dispatch(decrement())} variant="contained">
          decrement
        </Button>
        <Button
          onClick={() => dispatch(incrementByAmount(5))}
          variant="contained"
        >
          incrementByAmount
        </Button>
      </div>
    </>
  );
}

export default Counter;
