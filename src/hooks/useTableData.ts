// 处理里列表数据/搜索的hook
/**
 @param tableRef - 表格的ref
 * whereParams: 搜索参数
 * tableData: 表格数据
 * search: 搜索方法
 * **/

import { computed, ref } from "vue";

import { useUserStore } from "@/store/modules/user";
export function useTableData(tableRef: any, config = {} as any) {
  const userStore = useUserStore();
  const {
    getApi,
    needLimit = true, // 是否需要分页
    whereParams = { params: {} },
  } = config;

  const where = ref<any>({
    ...whereParams,
  });

  const page = ref(1);
  const pageSize = computed(() => userStore.tablePageSize);

  // 刷新表格
  const reload = async (page?: any) => {
    tableRef.value.cleardata();
    if (page) {
      page.value = page;
    }
    await createDatasource();
  };

  const search = async (newparams?: any) => {
    createDatasource(newparams);
  };
  // 获取数据
  const createDatasource = async (newparams?: any) => {
    const params = {
      ...whereParams.params,
      page: page.value,
      size: pageSize.value,
      ...newparams,
    };
    console.log("params", params);
    const response = await getApi(params).then((res: any) => {
      return res || [];
    });
    tableRef.value.getTableData(response);
  };

  return {
    createDatasource,
    reload,
    where,
    search,
  };
}
