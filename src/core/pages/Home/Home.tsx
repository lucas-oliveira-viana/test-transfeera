import React, { useEffect } from "react";
import receiversService from "@core/services/receivers";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@core/redux/store";
import { setSource as setReceiversSource } from "@core/redux/receiver/Receiver.store";
import { set as setPage } from "@core/redux/page/Page.store";
import { useTranslation } from "react-i18next";
import AddIcon from "@shared/assets/svg/add.svg";
import styles from "./styles/Home.module.scss";
import Table from "@shared/components/Table/Table";
import useReceiversTableConfig from "./hooks/useReceiversTableConfig";
import { PageEnum } from "@core/enum";
import Spinner from "@shared/components/Spinner/Spinner";
import { TReceiverSource } from "@core/types";
import Button from "@shared/components/Button/Button";
import useReceiversActions from "./hooks/useReceiverActions";
import usePagination from "@core/hooks/usePagination";
import { INITIAL_PAGINATION_CONFIG } from "@core/constants";
import Pagination from "@shared/components/Pagination/Pagination";

export default function Home() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const tableConfig = useReceiversTableConfig();

  const receivers = useSelector<RootState, TReceiverSource[] | null>(
    (state) => state.receivers.source
  );

  const {
    isRemoving,
    receiversToRemove,
    handleEdit,
    handleCheckReceivers,
    handleRemoveReceivers,
  } = useReceiversActions();

  const { pagination, setCurrentPage } =
    usePagination<TReceiverSource>(INITIAL_PAGINATION_CONFIG, receivers);

  return (
    <>
      <div className={styles.subheader}>
        <span className={styles.subheader_text}>{t("tabs.yourReceivers")}</span>
        <button
          className={styles.subheader_button}
          onClick={() => {
            dispatch(setPage(PageEnum.RECEIVER));
          }}
        >
          <AddIcon />
        </button>
      </div>

      <section className={styles.content}>
        {!receivers ? (
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
            {pagination.paginatedData && (
              <>
                <Table
                  config={tableConfig}
                  data={pagination.paginatedData[pagination.currentPage]}
                  disabledRows={isRemoving ? receiversToRemove : []}
                  onRowClick={handleEdit}
                  onCheck={handleCheckReceivers}
                />
                <Pagination
                  pagination={pagination}
                  setCurrentPage={setCurrentPage}
                />
              </>
            )}
          </div>
        )}
      </section>
    </>
  );
}
