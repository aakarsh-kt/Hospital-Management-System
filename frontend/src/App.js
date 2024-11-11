import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './Home';
import LogIn from './logIn';
import CreateAccount from './CreateAccount';
import SchedulingAppt from './schedulingAppt';
import ViewMedHist from './ViewMedHist';
import DocHome from './DocHome';
import ViewOneHistory from './ViewOneHistory';
import Settings from './Settings';
import DocSettings from './DocSettings';
import PatientsViewAppt from './PatientsViewAppt';
import NoMedHistFound from './NoMedHistFound';
import DocViewAppt from './DocViewAppt';
import MakeDoc from './MakeDoc';
import Diagnose from './Diagnose';
import ShowDiagnoses from './ShowDiagnoses';
import ContactUs from "./ContactUs";

export default function App() {
  const [component, setComponent] = useState(<LogIn />);

  useEffect(() => {
    fetch("http://localhost:3001/userInSession")
      .then(res => res.json())
      .then(res => {
        const { email, who } = res;
        if (email) {
          setComponent(who === "pat" ? <Home /> : <DocHome />);
        } else {
          setComponent(<LogIn />);
        }
      });
  }, []);

  return (
    <Router>
      <Switch>
        <Route path="/NoMedHistFound" component={NoMedHistFound} />
        <Route path="/MakeDoc" component={MakeDoc} />
        <Route path="/Settings" component={Settings} />
        <Route path="/MedHistView" component={ViewMedHist} />
        <Route path="/scheduleAppt" component={SchedulingAppt} />
        <Route path="/showDiagnoses/:id" component={ShowDiagnoses} />
        <Route path="/Diagnose/:id" component={Diagnose} />
        <Route path="/ViewOneHistory/:email" component={ViewOneHistory} />
        <Route path="/Home" component={Home} />
        <Route path="/createAcc" component={CreateAccount} />
        <Route path="/DocHome" component={DocHome} />
        <Route path="/PatientsViewAppt" component={PatientsViewAppt} />
        <Route path="/DocSettings" component={DocSettings} />
        <Route path="/ApptList" component={DocViewAppt} />
        <Route path="/contactUs" component={ContactUs} />
        <Route exact path="/" render={() => component} />

      </Switch>
    </Router>
  );
}
