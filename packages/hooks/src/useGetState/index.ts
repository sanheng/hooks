import type { Dispatch, SetStateAction } from 'react';
import { useState, useRef, useCallback } from 'react';

type GetStateAction<S> = () => S;

function useGetState<S>(
  initialState: S | (() => S),
): [S, Dispatch<SetStateAction<S>>, GetStateAction<S>];
function useGetState<S = undefined>(): [
  S | undefined,
  Dispatch<SetStateAction<S | undefined>>,
  GetStateAction<S | undefined>,
];
function useGetState<S>(initialState?: S) {
  const [state, setInnerState] = useState(initialState);
  const stateRef = useRef(state);

  const setState = useCallback((originState) => {
    stateRef.current = originState;
    setInnerState(originState)
  }, [])
  
  const getState = useCallback(() => stateRef.current, []);

  return [state, setState, getState];
}

export default useGetState;
