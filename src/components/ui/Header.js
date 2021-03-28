import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import { makeStyles } from "@material-ui/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import Menu from "@material-ui/core/Menu";

import logo from '../../assets/logo.svg'

function ElevationScroll(props) {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: "3em",
  },

  logo: {
    height: "8em",
    [theme.breakpoints.down("md")]: {
      height: "7em"
    },
    [theme.breakpoints.down("xs")]: {
      height: "5.5em"
    }
  },
  logoContainer:{
    padding: 0,
    "&:hover":{
      backgroundColor: "transparent",
    }
  },
  tabContainer:{
    marginLeft: "auto",
  },
  tab:{
    ...theme.typography.tab,
    minWidth: 10,
    marginLeft: "25px",
  },
  button:{
    ...theme.typography.estimate,
    borderRadius: "50px",
    marginLeft: "50px",
    marginRight: "25px",
    height: "45px",
    "&:hover": {
      backgroundColor: theme.palette.secondary.light
    }
  }
}));

export default function Header(props) {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (e, value) => {
    setValue(value);
  }

  useEffect(() => {
    if(window.location.pathname === "/" && value !== 0){
      setValue(0)
    }  else if(window.location.pathname === "/services" && value !== 1) {
      setValue(1)
    }else if(window.location.pathname === "/revolution" && value !== 2) {
      setValue(2)
    }else if(window.location.pathname === "/about" && value !== 3) {
      setValue(3)
    }else if(window.location.pathname === "/contacts" && value !== 4) {
      setValue(4)
    }else if(window.location.pathname === "/estimate" && value !== 5) {
      setValue(5)
    }
  }, [value])


  return (
    <React.Fragment>
      <ElevationScroll>
        <AppBar position="fixed">
          <Toolbar disableGutters>
            <Button component={Link} to="/" className={classes.logoContainer} onClick={() => setValue(0)} disableRipple >
              <img src={logo} className={classes.logo} alt="company logo"/> 
            </Button>
            <Tabs value={value} className={classes.tabContainer} onChange={handleChange} indicatorColor="primary">
              <Tab className={classes.tab} component={Link} to="/" label="Home"/>
              <Tab className={classes.tab} component={Link} to="/services"  label="Services"/>
              <Tab className={classes.tab} component={Link} to="/revolution"  label="The Revolution"/>
              <Tab className={classes.tab} component={Link} to="/about" label="About Us"/>
              <Tab className={classes.tab} component={Link} to="/contact"  label="Contact Us"/>
            </Tabs>
            <Button variant="contained" color="secondary" className={classes.button}>
              Free Estimate
            </Button>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </React.Fragment>
  );
}
