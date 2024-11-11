import React, { useState } from 'react';
import {
  Box,
  Button,
  Heading,
  Grommet,
  Text,
  Grid
} from 'grommet';
import Contact from './Contact';
import './App.css';

const theme = {
  global: {
    colors: {
      brand: '#000000',
      focus: '#000000'
    },
    font: {
      family: 'Lato',
    },
  },
};

const SidebarButton = ({ label, ...rest }) => (
  <Button plain {...rest}>
    {({ hover }) => (
      <Box
        background={hover ? "#DADADA" : undefined}
        pad={{ horizontal: "large", vertical: "medium" }}
      >
        <Text size="large">{label}</Text>
      </Box>
    )}
  </Button>
);

const SidebarButtons = () => {
  const [active, setActive] = useState();

  const handleButtonClick = (label) => {
    setActive(label);
    if (label === "Schedule Appointment") {
      window.location = "/scheduleAppt";
    } else if (label === "Sign Out") {
      fetch("http://localhost:3001/endSession");
      window.location = "/";
    } else if (label === "View Appointments") {
      window.location = "/PatientsViewAppt";
    } else if (label === "View Medical History") {
      fetch("http://localhost:3001/userInSession")
        .then(res => res.json())
        .then(res => {
          const email_in_use = res.email;
          console.log("Email In Use Is :" + email_in_use);
          window.location = "/ViewOneHistory/" + email_in_use;
        });
    } else if (label === "Settings") {
      window.location = "/Settings";
    }
  };

  return (
    <Box background="brand">
      {["View Medical History", "View Appointments", "Schedule Appointment", "Settings", "Sign Out"].map(label => (
        <SidebarButton
          key={label}
          label={label}
          active={label === active}
          onClick={() => handleButtonClick(label)}
        />
      ))}
    </Box>
  );
};

const Header = () => (
  <Box
    tag='header'
    background='brand'
    pad='small'
    elevation='small'
    justify='between'
    direction='row'
    align='center'
    flex={false}
    style={{ borderBottom: "1px solid grey" }}
  >
    <a style={{ color: 'inherit', textDecoration: 'inherit' }} href="/">
      <Heading level='3' margin='none'>HMS</Heading>
    </a>
    <Contact />
  </Box>
);

const Home = () => {
  return (
    <Grommet full theme={theme}>
      <Box fill>
        <Header />
        <Grid
          fill
          rows={['auto', 'flex']}
          columns={['auto', 'flex']}
          areas={[
            { name: 'sidebar', start: [0, 1], end: [0, 1] },
            { name: 'main', start: [1, 1], end: [1, 1] },
          ]}
        >
          <Box
            gridArea="sidebar"
            width="small"
            animation={[
              { type: 'fadeIn', duration: 300 },
              { type: 'slideRight', size: 'xlarge', duration: 150 },
            ]}
          >
            <SidebarButtons />
          </Box>
          <Box
            gridArea="main"
            justify="top"
            align="center"
          >
            <Box align="center" pad="large">
              <Heading color="#000000">Welcome Patient</Heading>
            </Box>
          </Box>
        </Grid>
      </Box>
    </Grommet>
  );
};

export default Home;
