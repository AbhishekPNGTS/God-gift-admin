// assets
import {
  IconReport,
  IconUsers,
  IconShoppingCart,
  IconQrcode,
  IconPhoto,
  IconWallet,
  IconBuildingBank,
  IconTruckDelivery,
  IconTransferIn
} from "@tabler/icons";

// constant
const icons = {
  IconShoppingCart,
  IconUsers,
  IconQrcode,
  IconPhoto,
  IconWallet,
  IconReport,
  IconBuildingBank,
  IconTruckDelivery,
  IconTransferIn
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const utilities = {
  id: "utilities",
  title: "Utilities",
  type: "group",
  children: [
    {
      id: "banner",
      title: "Banner",
      type: "item",
      icon: icons.IconPhoto,
      url: "/banner",
      breadcrumbs: false,
    },
    {
      id: "product",
      title: "Product",
      type: "item",
      icon: icons.IconShoppingCart,
      url: "/product",
      breadcrumbs: false,
    },
    {
      id: "qr",
      title: "QR",
      type: "collapse",
      icon: icons.IconQrcode,
      children: [
        {
          id: "qr-list",
          title: "QR List",
          type: "item",
          url: "/qr-list",
          breadcrumbs: false,
        },
        {
          id: "qr-apply",
          title: "QR Apply History",
          type: "item",
          url: "/qr-apply-history",
          breadcrumbs: false,
        },
        {
          id: "create-qr",
          title: "Create QR",
          type: "item",
          url: "/create-qr",
          breadcrumbs: false,
        },
      ],
    },
    {
      id: "kyc",
      title: "KYC",
      type: "collapse",
      icon: icons.IconReport,
      children: [
        {
          id: "kyc-list",
          title: "All Kyc",
          type: "item",
          url: "/all-kyc",
          breadcrumbs: false,
        },
        {
          id: "pending-kyc",
          title: "Pending KYC",
          type: "item",
          url: "/pending-kyc",
          breadcrumbs: false,
        },
        ,
        {
          id: "rejected-kyc",
          title: "Rejected KYC",
          type: "item",
          url: "/rejected-kyc",
          breadcrumbs: false,
        },
        ,
        {
          id: "completed-kyc",
          title: "Completed KYC",
          type: "item",
          url: "/completed-kyc",
          breadcrumbs: false,
        },
      ],
    },
    {
      id: "order",
      title: "Orders",
      type: "collapse",
      icon: icons.IconTruckDelivery,
      children: [
        {
          id: "order-history",
          title: "Order History",
          type: "item",
          url: "/order-history",
          breadcrumbs: false,
        },
        {
          id: "create-order",
          title: "Create Order",
          type: "item",
          url: "/create-order",
          breadcrumbs: false,
        },
      ],
    },
    {
      id: "bank",
      title: "Bank",
      type: "collapse",
      icon: icons.IconBuildingBank,
      children: [
        {
          id: "bank-details",
          title: "Bank Details",
          type: "item",
          url: "/bank-details",
          breadcrumbs: false,
        },
        {
          id: "withdraw-request",
          title: "Withdraw Request",
          type: "item",
          url: "/withdraw-request",
          breadcrumbs: false,
        },
        {
          id: "payment-details",
          title: "Payment Details",
          type: "item",
          url: "/payment-details",
          breadcrumbs: false,
        },
      ],
    },
    {
      id: "wallet",
      title: "Wallet",
      type: "item",
      icon: icons.IconWallet,
      url: "/wallet",
      breadcrumbs: false,
    },
    {
      id: "user",
      title: "User",
      type: "item",
      icon: icons.IconUsers,
      url: "/users",
      breadcrumbs: false,
    },
  ],
};

export default utilities;
