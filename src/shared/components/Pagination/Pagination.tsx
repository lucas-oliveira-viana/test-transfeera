import React, { useEffect } from "react";
import Button from "../Button/Button";
import { TPagination } from "@core/types";
import styles from "./Pagination.module.scss";

type Props = {
  pagination: TPagination<any>;
  setCurrentPage: (page: number) => void;
};

export default function Pagination({ pagination, setCurrentPage }: Props) {

  function getAdjacentPages(currentPage: number, totalPages: number) {
    const VIEW_PAGES = 3;
    const LAST_PAGE_FROM_THE_FIRST_GROUP = VIEW_PAGES - 1;

    const arrayOfPages = Array.from(
      Array(totalPages).keys()
    );

    if (currentPage < LAST_PAGE_FROM_THE_FIRST_GROUP) {
      return arrayOfPages.slice(0, VIEW_PAGES);
    }

    if (currentPage + 1 >= totalPages) {
      return arrayOfPages.slice(-VIEW_PAGES);
    }

    const adjacentPages = [];

    for (
      let i = Math.max(1, currentPage - 1);
      i <= Math.min(totalPages, currentPage + 1);
      i++
    ) {
      adjacentPages.push(i);
    }

    return adjacentPages;
  }

  const pages = getAdjacentPages(pagination.currentPage, pagination.totalPages);

  return (
    <>
      {pages.length && (
        <div className={styles.wrapper}>
          <Button
            className={styles.button}
            onClick={() => setCurrentPage(0)}
            disabled={pagination.currentPage === 0}
          >
            {"<<"}
          </Button>
          {pages.map((page) => (
            <Button
              className={`${styles.button} ${
                pagination.currentPage === page ? styles.current_page : ""
              }`}
              key={page}
              onClick={() => setCurrentPage(page)}
            >
              {page + 1}
            </Button>
          ))}
          <Button
            disabled={pagination.currentPage === pagination.totalPages - 1}
            onClick={() => setCurrentPage(pagination.totalPages - 1)}
            className={styles.button}
          >
            {">>"}
          </Button>
        </div>
      )}
    </>
  );
}
