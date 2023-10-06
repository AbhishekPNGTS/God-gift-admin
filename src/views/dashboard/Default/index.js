import { useEffect, useState } from "react";

// material-ui
import { Grid } from "@mui/material";

// project imports
import EarningCard from "./EarningCard";
import { gridSpacing } from "store/constant";

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);
  const [totalUser, setTotalUser] = useState(0);
  const [activeProduct, setActiveProduct] = useState(0);
  const [totalQr, setTotalQr] = useState(0);
  const [totalQrRedeem, setTotalQrRedeem] = useState(0);
  const [totalQrApply, setTotalQrApply] = useState(0);
  const [totalPendingQr, setTotalPendingQr] = useState(0);

  function getdashboard() {
    var myHeaders = new Headers();
    myHeaders.append("authkey", process.env.REACT_APP_AUTH_KEY);
    myHeaders.append("token", localStorage.getItem("token"));
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      adminId: localStorage.getItem("userId"),
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_API_URL}dashboard`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.code == 200) {
          setTotalUser(result.data.user);
          setActiveProduct(result.data.product);
          setTotalQr(result.data.qrCount);
          setTotalQrRedeem(result.data.totalRedeem);         
          setTotalPendingQr(result.data.coupon);         
          setTotalQrApply(result.data.qrApply);         
        }
      })
      .catch((error) => {});
  }
  useEffect(() => {
    setLoading(false);
    getdashboard();
  }, []);

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <EarningCard
              isLoading={isLoading}
              isCount={totalUser}
              isTitle={`Total User`}
            />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <EarningCard
              isLoading={isLoading}
              isCount={activeProduct}
              isTitle={`Total Active Product`}
            />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <EarningCard
              isLoading={isLoading}
              isCount={totalPendingQr}
              isTitle={`Total Coupon`}
            />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <EarningCard
              isLoading={isLoading}
              isCount={totalQr}
              isTitle={`Total QR`}
            />
          </Grid>

          <Grid item lg={4} md={6} sm={6} xs={12}>
            <EarningCard
              isLoading={isLoading}
              isCount={totalQrApply}
              isTitle={`Total QR Apply`}
            />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <EarningCard
              isLoading={isLoading}
              isCount={totalQrRedeem}
              isTitle={`Total Redeem QR`}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
