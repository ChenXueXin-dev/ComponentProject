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
