import PropTypes from "prop-types";
import Link from "next/link";
import { ButtonBase } from "@mui/material";
import Logo from "./Logo";

const LogoSection = () => {
  return (
    <ButtonBase
      disableRipple
      component={Link}
      // onClick={() => dispatch(activeItem({ openItem: [defaultId] }))}
      href={'/'}
      // sx={sx}
    >
      <Logo />
    </ButtonBase>
  );
};

LogoSection.propTypes = {
  sx: PropTypes.object,
  to: PropTypes.string,
};

export default LogoSection;
