import {
  Users,
  Settings,
  LayoutGrid,
  LucideIcon,
  ShoppingCart,
  ShoppingBag,
  PictureInPicture,
  Notebook,
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active?: boolean;
};

type Menu = {
  href: string;
  label: string;
  active?: boolean;
  icon: LucideIcon;
  submenus?: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getAdminMenuList(pathname: string): Group[] {
  console.log(pathname);
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "Dashboard",
          icon: LayoutGrid,
          submenus: [],
        },
        // {
        //   href: "/dashboard/products",
        //   label: "Products",
        //   icon: LayoutGrid,
        //   submenus: [],
        // },
      ],
    },

    {
      groupLabel: "Settings",
      menus: [
        {
          href: "/dashboard/users",
          label: "Users",
          icon: Users,
        },
        {
          href: "/dashboard/faq",
          label: "Faq",
          icon: Settings,
        },
      ],
    },
  ];
}
export function getSellerMenuList(pathname: string): Group[] {
  console.log(pathname);
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "Dashboard",
          icon: LayoutGrid,
          submenus: [],
        },
        {
          href: "/dashboard/products",
          label: "Products",
          icon: ShoppingBag,
          submenus: [],
        },
        {
          href: "/dashboard/orders",
          label: "Orders",
          icon: ShoppingCart,
          submenus: [],
        },
        {
          href: "/dashboard/reviews",
          label: "Reviews",
          icon: Notebook,
          submenus: [],
        },
      ],
    },

    {
      groupLabel: "Settings",
      menus: [
        {
          href: "/dashboard/profile",
          label: "Profile",
          icon: Settings,
        },
        {
          href: "/dashboard/media",
          label: "Media Bucket",
          icon: PictureInPicture,
        },
      ],
    },
  ];
}
