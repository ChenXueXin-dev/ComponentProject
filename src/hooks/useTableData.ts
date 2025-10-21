// 处理里列表数据/搜索的hook
/**
 @param tableRef - 表格的ref
 * whereParams: 搜索参数
 * loading: 加载状态
 * tableData: 表格数据
 * search: 搜索方法
 * **/

import { ref } from "vue";

export function useTableData(tableRef: any, config = {} as any) {
    const {
        whereParams = { params: {} },
        searchRef = undefined,
    } = config;
    const where = ref<any>({
    ...whereParams,
})

    

}
