import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// material-ui
import { ButtonBase } from "@mui/material";
import Logo1 from "../../../assets/images/Logo_God_Gift.svg";
// project imports
import config from "config";
import { MENU_OPEN } from "store/actions";
// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => {
  const defaultId = useSelector((state) => state.customization.defaultId);
  const dispatch = useDispatch();
  return (
    <center>
      {" "}
      <ButtonBase
        disableRipple
        onClick={() => dispatch({ type: MENU_OPEN, id: defaultId })}
        component={Link}
        to={config.defaultPath}
      >
        <img src={Logo1} width={120} height={60} />
      </ButtonBase>
    </center>
  );
};

export default LogoSection;
