// 处理里列表数据/搜索的hook
/**
 @param tableRef - 表格的ref
 * whereParams: 搜索参数
 * loading: 加载状态
 * tableData: 表格数据
 * search: 搜索方法
 * **/

import { nextTick, ref, toRaw } from "vue";

export function useTableData(tableRef: any, config = {} as any) {
  const {
    needLimit = true, // 是否需要分页
    whereParams = { params: {} },
    getApi,
  } = config;

  const where = ref<any>({
    ...whereParams,
  });

  const page = ref(1);

  const updateTablePageSize = (size: number | undefined) => {};

  // 刷新表格
  const reload = (page?: any) => {
    if (page) {
      page.value = page;
    }
    createDatasource();
  };

  //分页变化刷新数据
  const handlePageChange = (newpage: any) => {
    page.value = newpage;
  };

  // 获取数据
  const createDatasource = async () => {
    const params = {
      ...whereParams.params,
      page: page,
    };
    const response = await getApi(params).then((res: any) => {
      return res || [];
    });
    return response;
  };

  return {
    createDatasource,
    reload,
    handlePageChange,
    where,
  };
}
