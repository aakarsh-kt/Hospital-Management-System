-- Create the database and use it
CREATE DATABASE Project;
USE Project;

-- Create the Patient table
CREATE TABLE Patient (
    email VARCHAR(50) PRIMARY KEY,
    password VARCHAR(30) NOT NULL,
    name VARCHAR(50) NOT NULL,
    address VARCHAR(60) NOT NULL,
    gender VARCHAR(20) NOT NULL
) ENGINE=InnoDB;

-- Create the MedicalHistory table with a BLOB column for storing files
-- Limiting file size for `PreviousDocuments` to 5 MB
CREATE TABLE MedicalHistory (
    id INT PRIMARY KEY,
    date DATE NOT NULL,
    conditions VARCHAR(100) NOT NULL, 
    surgeries VARCHAR(100) NOT NULL, 
    medication VARCHAR(100) NOT NULL,
    PreviousDocuments BLOB CHECK (OCTET_LENGTH(PreviousDocuments) <= 5242880)  -- 5 MB limit
) ENGINE=InnoDB;

-- Create the Doctor table
CREATE TABLE Doctor (
    email VARCHAR(50) PRIMARY KEY,
    gender VARCHAR(20) NOT NULL,
    password VARCHAR(30) NOT NULL,
    name VARCHAR(50) NOT NULL
) ENGINE=InnoDB;

-- Create the Appointment table
CREATE TABLE Appointment (
    id INT PRIMARY KEY,
    date DATE NOT NULL,
    starttime TIME NOT NULL,
    endtime TIME NOT NULL,
    status VARCHAR(15) NOT NULL
) ENGINE=InnoDB;

-- Create the PatientsAttendAppointments junction table
CREATE TABLE PatientsAttendAppointments (
    patient VARCHAR(50) NOT NULL,
    appt INT NOT NULL,
    concerns VARCHAR(40) NOT NULL,
    symptoms VARCHAR(40) NOT NULL,
    FOREIGN KEY (patient) REFERENCES Patient (email) ON DELETE CASCADE,
    FOREIGN KEY (appt) REFERENCES Appointment (id) ON DELETE CASCADE,
    PRIMARY KEY (patient, appt)
) ENGINE=InnoDB;

-- Create the Schedule table
CREATE TABLE Schedule (
    id INT NOT NULL,
    starttime TIME NOT NULL,
    endtime TIME NOT NULL,
    breaktime TIME NOT NULL,
    day VARCHAR(20) NOT NULL,
    PRIMARY KEY (id, starttime, endtime, breaktime, day)
) ENGINE=InnoDB;

-- Create the PatientsFillHistory junction table
-- Links each medical history record to a specific patient
CREATE TABLE PatientsFillHistory (
    patient VARCHAR(50) NOT NULL,
    history INT NOT NULL,
    FOREIGN KEY (patient) REFERENCES Patient (email) ON DELETE CASCADE,
    FOREIGN KEY (history) REFERENCES MedicalHistory (id) ON DELETE CASCADE,
    PRIMARY KEY (patient, history)  -- Ensures each patient-history combination is unique
) ENGINE=InnoDB;

-- Create the Diagnose table with RelevantDocuments column for storing BLOB data
CREATE TABLE Diagnose (
    appt INT NOT NULL,
    doctor VARCHAR(50) NOT NULL,
    diagnosis VARCHAR(40) NOT NULL,
    prescription VARCHAR(50) NOT NULL,
    RelevantDocuments BLOB,
    FOREIGN KEY (appt) REFERENCES Appointment (id) ON DELETE CASCADE,
    FOREIGN KEY (doctor) REFERENCES Doctor (email) ON DELETE CASCADE,
    PRIMARY KEY (appt, doctor)
) ENGINE=InnoDB;

-- Create the DocsHaveSchedules junction table
CREATE TABLE DocsHaveSchedules (
    sched INT NOT NULL,
    doctor VARCHAR(50) NOT NULL,
    FOREIGN KEY (sched) REFERENCES Schedule (id) ON DELETE CASCADE,
    FOREIGN KEY (doctor) REFERENCES Doctor (email) ON DELETE CASCADE,
    PRIMARY KEY (sched, doctor)
) ENGINE=InnoDB;

-- Create the DoctorViewsHistory junction table
CREATE TABLE DoctorViewsHistory (
    history INT NOT NULL,
    doctor VARCHAR(50) NOT NULL,
    FOREIGN KEY (doctor) REFERENCES Doctor (email) ON DELETE CASCADE,
    FOREIGN KEY (history) REFERENCES MedicalHistory (id) ON DELETE CASCADE,
    PRIMARY KEY (history, doctor)
) ENGINE=InnoDB;

-- Create the LoginLog table to track login times of doctors and patients
CREATE TABLE LoginLog (
    email VARCHAR(50) NOT NULL,
    login_timestamp DATETIME NOT NULL,
    role ENUM('Doctor', 'Patient') NOT NULL,
    FOREIGN KEY (email) REFERENCES Patient(email) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Set the Isolation Level to Serializable for high isolation
SET SESSION TRANSACTION ISOLATION LEVEL SERIALIZABLE;