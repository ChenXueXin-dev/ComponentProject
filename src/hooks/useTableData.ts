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
  const newparamsData = ref<any>();

  // 刷新表格
  const reload = async (page?: any) => {
    tableRef.value.cleardata();
    if (page) {
      page.value = page;
    }
    await createDatasource({ ...newparamsData.value });
  };

  const search = async (newparams?: any) => {
    if (typeof newparams === "string") {
      createDatasource({}, true);
    } else {
      createDatasource(newparams);
    }
  };

  // 获取数据
  const createDatasource = async (newparams?: any, isreset?: boolean) => {
    console.log("createDatasource", newparams);
    let params = {};
    if (isreset) {
      params = {
        ...where.value.params,
        page: page.value,
        size: pageSize.value,
      };
    } else {
      params = {
        ...where.value.params,
        page: page.value,
        size: pageSize.value,
        ...newparams,
      };
    }
    newparamsData.value = { ...newparams };

    const response = await getApi(params).then((res: any) => {
      return res || [];
    });
    tableRef?.value.getTableData(response);
    return () => {};
  };

  return {
    createDatasource,
    reload,
    where,
    search,
  };
}
