import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@core/redux/store";
import { set as setPage } from "@core/redux/page/Page.store";
import { useTranslation } from "react-i18next";
import AddIcon from "@shared/assets/svg/add.svg";
import SearchIcon from "@shared/assets/svg/search.svg";
import styles from "./styles/Home.module.scss";
import Table from "@shared/components/Table/Table";
import useReceiversTableConfig from "./hooks/useReceiversTableConfig";
import { PageEnum } from "@core/enum";
import Spinner from "@shared/components/Spinner/Spinner";
import { TReceiver, TReceiverSource } from "@core/types";
import Button from "@shared/components/Button/Button";
import useReceiversActions from "./hooks/useReceiverActions";
import usePagination from "@core/hooks/usePagination";
import { INITIAL_PAGINATION_CONFIG } from "@core/constants";
import Pagination from "@shared/components/Pagination/Pagination";
import IconInput from "@shared/components/IconInput/IconInput";
import useReceiverFetch from "./hooks/useReceiverFetch";

export default function Home() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const tableConfig = useReceiversTableConfig();

  const { source: receiversData, sourceTotalCount: receiversTotalCount } =
    useSelector<RootState, TReceiver | null>((state) => state.receivers);

  const { pagination, setCurrentPage } = usePagination<TReceiverSource>(
    INITIAL_PAGINATION_CONFIG,
    receiversTotalCount
  );

  const { isFetching, setFilter, fetchReceivers } = useReceiverFetch({
    currentPage: pagination.currentPage,
  });

  const {
    isRemoving,
    receiversToRemove,
    handleEdit,
    handleCheckReceivers,
    handleRemoveReceivers,
  } = useReceiversActions({ fetchReceivers });

  return (
    <>
      <div className={styles.subheader}>
        <div className={styles.subheader_add}>
          <span className={styles.subheader_text}>
            {t("tabs.yourReceivers")}
          </span>
          <button
            className={styles.subheader_button}
            onClick={() => {
              dispatch(setPage(PageEnum.RECEIVER));
            }}
          >
            <AddIcon />
          </button>
        </div>
        <IconInput
          className={styles.filter}
          placeholder={t("home.filterPlaceholder")}
          onChange={(e) => {
            setFilter(e.target.value);
          }}
          icon={<SearchIcon className={styles.search_icon} />}
        />
      </div>

      <section className={styles.content}>
        {!receiversData ? (
          <Spinner size={"80px"} thickness={"10px"} />
        ) : (
          <div className={styles.wrapper}>
            <Button
              className={styles.remove_selected}
              disabled={isRemoving || receiversToRemove.length === 0}
              onClick={() => {
                handleRemoveReceivers(receiversToRemove);
              }}
            >
              {isRemoving ? (
                <Spinner size="20px" thickness="2px" color="var(--white)" />
              ) : (
                t("home.removeSelected")
              )}
            </Button>
            {isFetching ? (
              <div className={styles.fetching_loader_wrapper}>
                <Spinner size={"60px"} thickness={"5px"} />
              </div>
            ) : (
              <div className={styles.table_wrapper}>
                <Table
                  config={tableConfig}
                  data={receiversData}
                  disabledRows={isRemoving ? receiversToRemove : []}
                  onRowClick={handleEdit}
                  onCheck={handleCheckReceivers}
                />
              </div>
            )}
            {pagination.totalPages > 1 && (
              <Pagination
                pagination={pagination}
                setCurrentPage={setCurrentPage}
              />
            )}
          </div>
        )}
      </section>
    </>
  );
}
