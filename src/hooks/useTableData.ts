// 处理里列表数据/搜索的hook
/**
 @param tableRef - 表格的ref
 * whereParams: 搜索参数
 * tableData: 表格数据
 * search: 搜索方法
 * **/

import { ref } from "vue";
export function useTableData(tableRef: any, config = {} as any) {
  const {
    getApi,
    needLimit = true, // 是否需要分页
    whereParams = { params: {} },
  } = config;

  const where = ref<any>({
    ...whereParams,
  });

  const page = ref(1);

  const updateTablePageSize = (size: number | undefined) => {};

  // 刷新表格
  const reload = async (page?: any) => {
    tableRef.value.cleardata();
    if (page) {
      page.value = page;
    }
    await createDatasource();
  };

  const search = async () => {
    console.log("执行search");
    createDatasource();
  };
  // 获取数据
  const createDatasource = async () => {
    console.log("执行createDatasource");
    const params = {
      ...whereParams.params,
      page: page,
    };
    const response = await getApi(params).then((res: any) => {
      return res || [];
    });
    tableRef.value.getTableData(response);
  };

  //   const handleSizeChange = (size) => {
  //   console.log("切换数据条数");
  //   cleardata();
  //   loading.value = true;
  //   if (size === userStore.tablePageSize) return;
  //   userStore.tablePageSize = size || 20;
  //   userStore.setUserHabit("tablePageSize", "表格每页数量", size);

  //   loading.value = false;
  // };

  // const handlePageChange = (newpage: number) => {
  //   page.value = newpage;
  //   reload()
  // }

  const handleSizeChange = (newSize: number) => {
    page.value = 1;
    reload(); // 自动调用刷新
  };

  return {
    createDatasource,
    reload,
    handleSizeChange,
    where,
    search,
  };
}
