import { ReactNode, useEffect, useState } from "react";
import { Grid } from "@zendeskgarden/react-grid";
import { Toggle, Field } from "@zendeskgarden/react-forms";
import { ReactComponent as HomeIcon } from "@zendeskgarden/svg-icons/src/26/home-fill.svg";
import { ReactComponent as CustomersIcon } from "@zendeskgarden/svg-icons/src/26/tray-user-group.svg";
import { ReactComponent as SettingsIcon } from "@zendeskgarden/svg-icons/src/26/settings-fill.svg";
import { ReactComponent as ZendeskIcon } from "@zendeskgarden/svg-icons/src/26/zendesk.svg";
import { ReactComponent as CompanyLogo } from "../../icons/company_logo.svg";
import { Navigate } from "react-router-dom";

import { PALETTE } from "@zendeskgarden/react-theming";
import {
  Body,
  Chrome,
  Content,
  Header,
  Main,
  Nav,
  SkipNav,
} from "@zendeskgarden/react-chrome";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const HOME_PATH = "/";
const SETTING_PATH = "/settings";
const CUSTOMERS_PATH = "/customers";

type NavType = typeof HOME_PATH | typeof SETTING_PATH | typeof CUSTOMERS_PATH;

const MainNav = ({ children }: { children: ReactNode }) => {
  const [nav, setNav] = useState<NavType>();
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === HOME_PATH) {
      setNav(HOME_PATH);
    } else if (location.pathname === SETTING_PATH) {
      setNav(SETTING_PATH);
    } else if (location.pathname === CUSTOMERS_PATH) {
      setNav(CUSTOMERS_PATH);
    }
  }, [location]);

  return (
    <Chrome isFluid hue={PALETTE.green[900]}>
      <SkipNav targetId="example-navigation-main-content">
        Skip to main content
      </SkipNav>
      <Nav
        onChange={() => {
          setExpanded(!expanded);
        }}
        isExpanded={expanded}
        aria-label="chrome navigation example nav"
      >
        <Nav.Item hasLogo>
          <Nav.ItemIcon>
            <CompanyLogo />
          </Nav.ItemIcon>
          <Nav.ItemText>My company</Nav.ItemText>
        </Nav.Item>
        <Nav.List>
          <Nav.Item
            isCurrent={nav === HOME_PATH}
            onClick={() => {
              navigate(HOME_PATH);
            }}
          >
            <Nav.ItemIcon>
              <HomeIcon />
            </Nav.ItemIcon>
            <Nav.ItemText>Home</Nav.ItemText>
          </Nav.Item>
          <Nav.Item
            isCurrent={nav === CUSTOMERS_PATH}
            onClick={() => {
              navigate(CUSTOMERS_PATH);
            }}
          >
            <Nav.ItemIcon>
              <CustomersIcon />
            </Nav.ItemIcon>
            <Nav.ItemText>Customers</Nav.ItemText>
          </Nav.Item>
          <Nav.Item
            isCurrent={nav === SETTING_PATH}
            onClick={() => {
              navigate(SETTING_PATH);
            }}
          >
            <Nav.ItemIcon>
              <SettingsIcon />
            </Nav.ItemIcon>
            <Nav.ItemText>Settings</Nav.ItemText>
          </Nav.Item>
        </Nav.List>

        <Nav.Item hasBrandmark title="Zendesk">
          <Nav.ItemIcon>
            <ZendeskIcon />
          </Nav.ItemIcon>
          <Nav.ItemText>Zendesk</Nav.ItemText>
        </Nav.Item>
      </Nav>
      <Body>
        <Header />
        <Content id="example-navigation-main-content">
          <Main style={{ padding: 28 }}>
            <Grid.Row>
              <Grid.Col>
                {children}
                {/* <Field>
                  <Toggle
                    onChange={() => {
                      setExpanded(!expanded);
                    }}
                  >
                    <Field.Label>Show expanded</Field.Label>
                  </Toggle>
                </Field> */}
              </Grid.Col>
            </Grid.Row>
          </Main>
        </Content>
      </Body>
    </Chrome>
  );
};

export default MainNav;
