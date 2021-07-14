import React from "react";

import { render, cleanup, waitForElement, fireEvent, prettyDOM,getAllByTestId, getByText, getByAltText,getByPlaceholderText, querySelectorAll, queryByText,waitForElementToBeRemoved } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe("Appointment", () => { 
  // it.only("renders without crashing", () => {
  //   render(<Application />);
  // });

  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const {getByText} = render(<Application />);
    
    // return waitForElement(() => getByText("Monday")).then(() => {
    //   fireEvent.click(getByText("Tuesday"));
    //   expect(getByText("Leopold Silvers")).toBeInTheDocument();
    // });

    await waitForElement(() => getByText("Monday"));
    fireEvent.click(getByText("Tuesday"));
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async() => {
    const {container, debug} = render(<Application />);
   
    await waitForElement(() => getByText(container,"Archie Cohen"));
    //prettyDOM(container);

    const appointment = getAllByTestId(container, "appointment")[0];
    // const appointment = appointments[0]

    fireEvent.click(getByAltText(appointment, "Add"));
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones"}
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"));
    // debug();
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    //getBy: if the element isn't found, then the getByText function will throw the error "Unable to find an element with the text: Lydia Miller-Jones" ---useful msg

    //queryBy: f the element isn't found, return a null value. The error message shown in the test output is "Timed out in waitForElement" ---won' break test
    await waitForElement(() => queryByText(appointment, "Lydia Miller-Jones"));

    const day = getAllByTestId(container, "day").find(day =>
      //use queryBy: need the return value null if nonexist and keep test going
      queryByText(day, "Monday")
    );
  
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });

  
});


