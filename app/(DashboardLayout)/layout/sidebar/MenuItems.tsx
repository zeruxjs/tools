import {
  IconLayoutDashboard,
  IconChartBar,
  IconTypography,
  IconSettings,
  IconAperture,
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
  {
    navlabel: true,
    subheader: "HOME",
  },

  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconLayoutDashboard,
    href: "/",
  },
  {
    navlabel: true,
    subheader: "CONTENT",
  },
  {
    id: uniqueId(),
    title: "Analytics",
    icon: IconChartBar,
    href: "/analytics",
  },
  {
    id: uniqueId(),
    title: "Utilities",
    icon: IconTypography,
    href: "/utilities",
  },
  {
    navlabel: true,
    subheader: "OTHER",
  },
  {
    id: uniqueId(),
    title: "Settings",
    icon: IconSettings,
    href: "/settings",
  },
  {
    id: uniqueId(),
    title: "Sample Page",
    icon: IconAperture,
    href: "/sample-page",
  },
];

export default Menuitems;


