import { lazy } from "react";
// project imports
import MainLayout from "layout/MainLayout";
import Loadable from "ui-component/Loadable";
// dashboard routing
const Dashboard = Loadable(lazy(() => import("views/dashboard/Default")));
// utilities routing
const Users = Loadable(lazy(() => import("views/utilities/users/users")));
const AddUser = Loadable(lazy(() => import("views/utilities/users/AddUser")));
const EditUser = Loadable(lazy(() => import("views/utilities/users/EditUser")));
const ViewUser = Loadable(lazy(() => import("views/utilities/users/ViewUser")));
const UserQrDetails = Loadable(lazy(() => import("views/utilities/users/UserQrDetails")));

const Wallet = Loadable(lazy(() => import("views/utilities/Wallet/Wallet")));
const Product = Loadable(
  lazy(() => import("views/utilities/Product/ProductList"))
);
const AddProduct = Loadable(
  lazy(() => import("views/utilities/Product/AddProduct"))
);
const EditProduct = Loadable(
  lazy(() => import("views/utilities/Product/EditProduct"))
);
const QrList = Loadable(lazy(() => import("views/utilities/QR-List/QrList")));
const QRApplyHistory = Loadable(lazy(() => import("views/utilities/QR-List/QRApplyHistory")));
const ViewQr = Loadable(lazy(() => import("views/utilities/QR-List/ViewQr")));
const QrEdit = Loadable(lazy(() => import("views/utilities/QR-List/QrEdit")));
const KYCList = Loadable(lazy(() => import("views/utilities/KYC/AllKYC")));
const PendingKYC = Loadable(
  lazy(() => import("views/utilities/KYC/PendingKYC"))
);
const RejectedKYC = Loadable(
  lazy(() => import("views/utilities/KYC/RejectedKYC"))
);
const CompletedKYC = Loadable(
  lazy(() => import("views/utilities/KYC/CompletedKYC"))
);
const ViewKYC = Loadable(lazy(() => import("views/utilities/KYC/ViewKYC")));
const EditKYC = Loadable(lazy(() => import("views/utilities/KYC/EditKYC")));
const CreateQR = Loadable(
  lazy(() => import("views/utilities/QR-List/CreateQR"))
);

const BankDetails = Loadable(lazy(() => import("views/utilities/bank-details/Bank-Details")));
const WithdrawRequest = Loadable(lazy(() => import("views/utilities/bank-details/WithdrawRequest")));
const PaymentDetails = Loadable(lazy(() => import("views/utilities/bank-details/PaymentDetails")));
const EditBankDetails = Loadable(lazy(() => import("views/utilities/bank-details/EditBankDetails")));

const AddBanner = Loadable(
  lazy(() => import("views/utilities/Banner/AddBanner"))
);
const Banner = Loadable(lazy(() => import("views/utilities/Banner/Banner")));

const OrderHistory = Loadable(lazy(() => import("views/utilities/Order/OrderHistory")));
const CreateOrder = Loadable(lazy(() => import("views/utilities/Order/CreatOrder")));
// sample page routing

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: "/",
  element: <MainLayout />,
  children: [
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
    {
      path: "wallet",
      element: <Wallet />,
    },
    {
      children: [
        {
          path: "banner",
          element: <Banner />,
        },
        {
          path: "add-banner",
          element: <AddBanner />,
        },
      ],
    },
    {
      children: [
        {
          path: "order-history",
          element: <OrderHistory />,
        },
        {
          path: "create-order",
          element: <CreateOrder />,
        },
      ],
    },
    {
      children: [
        {
          path: "users",
          element: <Users />,
        },
        {
          path: "edit-user/:id",
          element: <EditUser />,
        },
        {
          path: "add-user",
          element: <AddUser />,
        },
        {
          path: "view-user/:id",
          element: <ViewUser />,
        },
      ],
    },
    {
      children: [
        {
          path: "product",
          element: <Product />,
        },
        {
          path: "edit-product/:id",
          element: <EditProduct />,
        },
        {
          path: "add-product",
          element: <AddProduct />,
        },
        {
          path: "view-user/:id",
          element: <ViewUser />,
        },
        {
          path: "user-qr-details/:id",
          element: <UserQrDetails />,
        },
      ],
    },
    {
      children: [
        {
          path: "qr-list",
          element: <QrList />,
        },
        {
          path: "view-qr/:id",
          element: <ViewQr />,
        },
        {
          path: "edit-qr/:id",
          element: <QrEdit />,
        },
        {
          path: "create-qr",
          element: <CreateQR />,
        },
        {
          path: "qr-apply-history",
          element: <QRApplyHistory />,
        },
      ],
    },
    {
      children: [
        {
          path: "bank-details",
          element: <BankDetails/>,
        },
        {
          path: "edit-bank-details/:id",
          element: <EditBankDetails/>,
        },
        {
          path: "withdraw-request",
          element: <WithdrawRequest />,
        },
        {
          path: "payment-details",
          element: <PaymentDetails />,
        },
      ],
    },
    {
      children: [
        {
          path: "all-kyc",
          element: <KYCList />,
        },
        {
          path: "view-kyc/:id",
          element: <ViewKYC />,
        },
        {
          path: "edit-kyc/:id",
          element: <EditKYC />,
        },
        {
          path: "pending-kyc",
          element: <PendingKYC />,
        },
        {
          path: "rejected-kyc",
          element: <RejectedKYC />,
        },
        {
          path: "completed-kyc",
          element: <CompletedKYC />,
        },
      ],
    },
  ],
};

export default MainRoutes;
