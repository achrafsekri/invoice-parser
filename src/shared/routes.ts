export interface Route {
  href: string;
  lable: string;
  exact: boolean;
  type?: string;
  icon?: string;
  subMenu?: Route[];
}
export const routes: Route[] = [
  {
    href: "/",
    lable: "Parse an invoice",
    exact: true,
    type: "simple",
    icon: "description",
  },
  {
    href: "/receipt",
    lable: "Parse a receipt",
    exact: true,
    type: "simple",
    icon: "receipt_long",
  },
  {
    href: "/my-invoices",
    lable: "My invoices",
    exact: true,
    type: "simple",
    icon: "folder",
  },
  {
    href: "/my-receipts",
    lable: "My receipts",
    exact: true,
    type: "simple",
    icon: "home_storage",
  },

  // {
  //   href: "/",
  //   lable: "Analyze feedback",
  //   exact: true,
  //   type: "complex",
  //   icon: "analytics",
  //   subMenu: [
  //     {
  //       href: "/chart_builder",
  //       lable: "Chart Builder",
  //       exact: false,
  //       icon: "bar_chart",
  //     },
  //   ],
  // },
];
