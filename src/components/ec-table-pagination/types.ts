import { type PageSize } from '../../composables/use-ec-pagination/types';

export interface PageSizeItem {
  text: string,
  value: PageSize,
}

export interface TablePaginationProps {
  page?: number,
  numberOfItems?: PageSize,
  total?: number,
  itemsPerPageText?: string,
  isPageSizeHidden?: boolean,
  isTotalHidden?: boolean,
  isResponsive?: boolean,
}
