import React from "react";

import { render, cleanup } from "@testing-library/react";

import Application from "components/Application";
import Form from "components/Appointment/Form";

afterEach(cleanup);

describe("Appointment", () => { 
  it.only("renders without crashing", () => {
    render(<Application />);
  });
})
