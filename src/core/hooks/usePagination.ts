import { TPagination } from "@core/types";
import { useEffect, useState } from "react";

export default function usePagination<T>(
  initialState: TPagination<T>,
  totalItems: number
) {
  const [state, setState] = useState<TPagination<T>>(initialState);

  useEffect(() => {
    if (totalItems !== null) {
      setState((currState) => ({
        ...currState,
        totalItems,
        totalPages: Math.round(totalItems / state.pageSize)
      }));
    }
  }, [totalItems]);

  function setCurrentPage(page: number) {
    setState((currState) => ({
      ...currState,
      currentPage: page,
    }));
  }

  return { pagination: state, setCurrentPage };
}
