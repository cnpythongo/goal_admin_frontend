import { createContext } from 'react';
import { PaginationProps } from '@arco-design/web-react'

export const GlobalContext = createContext<{
  lang?: string;
  setLang?: (value: string) => void;
  theme?: string;
  setTheme?: (value: string) => void;
}>({});

export interface GoalAdminPaginationProps extends PaginationProps {
  /**
   * @zh 当前页
   * @en Current page
   */
  page?: number;
  /**
   * @zh 每页数据条数
   * @en Number of data items per page
   */
  limit?: number;
}
