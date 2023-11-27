import { INITIAL_PAGINATION_CONFIG } from "@core/constants";
import { TReceiver, TReceiverQueryParams } from "@core/types";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import useDebounce from "@core/hooks/useDebounce";
import useIsFirstRender from "@core/hooks/useIsFirstRender";
import {
  setSource as setReceiversSource,
  setSourceTotalCount as setReceiversSourceTotalCount,
} from "@core/redux/receiver/Receiver.store";
import receiversService from "@core/services/receivers";
import useNotifier from "@core/hooks/useNotification";
import { RootState } from "@core/redux/store";

type Props = {
  currentPage: number;
};

export default function useReceiverFetch({ currentPage }: Props) {
  const [isFetching, setIsFetching] = useState(false);
  const [filter, setFilter] = useState("");

  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { notifyError } = useNotifier();
  const isFirstRender = useIsFirstRender();
  const debouncedFilterValue = useDebounce(filter, 500);

  const { source: receiversData } = useSelector<RootState, TReceiver | null>(
    (state) => state.receivers
  );

  async function fetchReceivers(params: TReceiverQueryParams) {
    try {
      setIsFetching(true);

      const response = await receiversService.find(params);

      dispatch(
        setReceiversSourceTotalCount(Number(response.headers["x-total-count"]))
      );
      dispatch(setReceiversSource(response.data));
    } catch (e) {
      notifyError({ children: t("notifications.errorTryingToGetReceivers") });
    } finally {
      setIsFetching(false);
    }
  }

  useEffect(() => {
    if (!receiversData) {
      fetchReceivers({
        _limit: INITIAL_PAGINATION_CONFIG.pageSize,
        _page: 1,
      });
    }
  }, []);

  useEffect(() => {
    if (isFirstRender) {
      return;
    }

    const page = currentPage + 1;

    fetchReceivers({
      _limit: INITIAL_PAGINATION_CONFIG.pageSize,
      _page: page,
    });
  }, [currentPage]);

  useEffect(() => {
    if (isFirstRender) {
      return;
    }

    const page = currentPage + 1;

    if (filter) {
      fetchReceivers({
        _limit: INITIAL_PAGINATION_CONFIG.pageSize,
        _page: page,
        q: debouncedFilterValue,
      });

      return;
    }

    fetchReceivers({
      _limit: INITIAL_PAGINATION_CONFIG.pageSize,
      _page: page,
    });
  }, [debouncedFilterValue]);

  return { filter, isFetching, setFilter, fetchReceivers };
}
