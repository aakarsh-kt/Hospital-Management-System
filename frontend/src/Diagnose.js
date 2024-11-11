import React, { useState } from 'react';
import {
  Box,
  Button,
  Heading,
  Form,
  TextArea,
  Grommet
} from 'grommet';
import './App.css';

const theme = {
  global: {
    colors: {
      brand: '#000000',
      focus: "#000000",
      active: "#000000",
    },
    font: {
      family: 'Lato',
    },
  },
};

const AppBar = (props) => (
  <Box
    tag='header'
    direction='row'
    align='center'
    justify='between'
    background='brand'
    pad={{ left: 'medium', right: 'small', vertical: 'small' }}
    style={{ zIndex: '1' }}
    {...props}
  />
);

const DiagnosisTextArea = ({ setDiagnosis }) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
    setDiagnosis(event.target.value);
  };

  return (
    <Grommet theme={theme}>
      <h4>Diagnosis</h4>
      <TextArea
        placeholder="Enter Diagnosis"
        value={value}
        onChange={onChange}
        style={{ width: "50vw", height: "12vw" }}
        fill
        required
      />
    </Grommet>
  );
};

const PrescriptionTextArea = ({ setPrescription }) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
    setPrescription(event.target.value);
  };

  return (
    <Grommet theme={theme}>
      <h4>Prescription</h4>
      <TextArea
        placeholder="Enter Prescription"
        value={value}
        onChange={onChange}
        style={{ width: "50vw", height: "12vw" }}
        fill
        required
      />
    </Grommet>
  );
};

const Diagnose = ({ match }) => {
  const [diagnosis, setDiagnosis] = useState("");
  const [prescription, setPrescription] = useState("");
  const id = match.params.id;

  const handleSubmit = () => {
    fetch(`http://localhost:3001/diagnose?diagnosis=${diagnosis}&prescription=${prescription}&id=${id}`)
      .then(() => {
        window.alert("Diagnosis Submitted!");
      })
      .catch(error => console.error("Error:", error));
  };

  return (
    <Grommet theme={theme} full>
      <AppBar>
        <a style={{ color: 'inherit', textDecoration: 'inherit' }} href="/">
          <Heading level='3' margin='none'>HMS</Heading>
        </a>
      </AppBar>
      <Box align="center" gap="small">
        <Form
          onSubmit={handleSubmit}
        >
          <DiagnosisTextArea setDiagnosis={setDiagnosis} />
          <PrescriptionTextArea setPrescription={setPrescription} />
          <br />
          <Box align="center">
            <Button
              label="Submit Diagnosis"
              type="submit"
              primary
            />
          </Box>
        </Form>
      </Box>
    </Grommet>
  );
};

export default Diagnose;
