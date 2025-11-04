import { keyValueSum } from "@/untils";
import i18n from "@/i18n/index";
import { computed } from "vue";
const { t } = i18n.global;

export const homeColumns = computed(() => [
  {
    label: t("base.home.serialNumber"),
    ellipsis: true,
    width: 80,
    fixed: "left",
    customRender: ({ index }: any) => {
      return index + 1;
    },
  },
  {
    name: "id",
    label: t("base.home.date"),
    width: 150,
    summaryRender: ({ data }: any) => {
      return keyValueSum(data, "id");
    },
  },
  {
    name: "date",
    label: t("base.home.date"),
    width: 150,
  },
  {
    name: "purchasecount",
    label: "购买数量",
    width: 150,
    summaryRender: ({ data }: any) => {
      return keyValueSum(data, "purchasecount");
    },
  },
  {
    name: "name",
    label: t("base.home.name"),
    width: 120,
  },
  {
    name: "address",
    label: t("base.home.address"),
    width: 200,
  },
  {
    name: "age",
    label: t("base.home.age"),
    width: 80,
  },
  {
    name: "sex",
    label: t("base.home.sex"),
    width: 80,
  },
  {
    name: "phone",
    label: t("base.home.phone"),
    width: 150,
  },
  {
    name: "email",
    label: t("base.home.email"),
    width: 200,
  },
  {
    name: "phone",
    label: t("base.home.phone"),
    width: 150,
  },
  {
    name: "email",
    label: t("base.home.email"),
    width: 200,
  },
  {
    name: "operate",
    label: t("base.home.operate"),
    fixed: "right",
    width: 120,
  },
]);

export const baseColumns = computed(() => {
  return [
    {
      columns: [
        { label: "姓名1", value: "name1" },
        { label: "年龄1", value: "age1" },
        { label: "地址1", value: "address1" },
        {
          label: "操作1",
          value: "action1",
          customRender: (row: any, col: any) => {
            return row.name1 + "/" + col.label;
          },
        },
      ],
    },
    {
      columns: [
        { label: "姓名2", value: "name2" },
        { label: "年龄2", value: "age2" },
        { label: "地址2", value: "address2" },
        { label: "操作2", value: "action2" },
      ],
    },
    {
      columns: [
        { label: "姓名3", value: "name3" },
        { label: "年龄3", value: "age3" },
        { label: "地址3", value: "address3" },
        { label: "操作3", value: "action3" },
      ],
    },
  ];
});
