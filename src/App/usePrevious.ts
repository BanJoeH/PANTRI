import { useRef, useEffect } from "react";

const usePrevious = <T>(prop: T): T | undefined => {
  const prevProp = useRef<T | undefined>(undefined);

  useEffect(() => {
    prevProp.current = prop;
  }, [prop]);

  return prevProp.current;
};

export default usePrevious;
