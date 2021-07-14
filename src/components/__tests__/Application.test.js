import React from "react";
import axios from "../../__mocks__/axios";
import { render, cleanup, waitForElement, fireEvent, prettyDOM,getAllByTestId, getByText, getByAltText,getByPlaceholderText, querySelectorAll, queryByText,waitForElementToBeRemoved, queryByAltText, wait } from "@testing-library/react";

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

  it("loads data, cancel an interview and increase the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container, debug } = render(<Application />);
  
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
  
    // 3. Click the "Delete" button on the first  appointment.
    const appointment = getAllByTestId(container, "appointment").find( appointment => queryByText(appointment, "Archie Cohen"));

    fireEvent.click(queryByAltText(appointment, "Delete"));
    // 4. Check that the confirmation message is shown.
    expect(getByText(appointment, "Are you sure you want to cancel this interview?")).toBeInTheDocument();

    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(queryByText(appointment, "Confirm"));
    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();
    // 7. Wait until the element with the "Add" button is displayed.
    await waitForElement(() => getByAltText(appointment, "Add"))
    // 8. Check that the DayListItem with the text "Monday" has the text "2 spots remaining".
    const day = getAllByTestId(container, "day").find((day) =>
    queryByText(day, "Monday")
  );
    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
    // debug();
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    // 1. Render the Application.
    const { container } = render(<Application />);
    
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
  
    // 3. Click the "edit" button on the Archie Cohen's appointment.
    const appointment = getAllByTestId(container, "appointment").find( appointment => queryByText(appointment, "Archie Cohen"));
    fireEvent.click(getByAltText(appointment, "Edit"));
    // 4. change student name to test
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Test"}
    });
    // 5. Click the "Save" button.
    fireEvent.click(getByText(appointment, "Save"));
    // 6. Check that the element with the text "Saving" is displayed.
    await waitForElement(() => queryByText(appointment, "Saving") );
    // 7. Wait until the updated appointment is displayed.
    await waitForElement(() => getByText(container, "Test"));
    // 8. Check that the DayListItem with the text "Monday" has the text "1 spots remaining".
    const day = getAllByTestId(container, "day").find((day) =>
    queryByText(day, "Monday"));
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  });

  it("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();
    const {container, debug} = render(<Application />);
   
    await waitForElement(() => getByText(container,"Archie Cohen"));
    const appointment = getAllByTestId(container, "appointment")[0];

    fireEvent.click(getByAltText(appointment, "Add"));
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Test name"}
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"));
    await waitForElement(() => queryByText(appointment, "Saving"));
    expect(getByText(appointment, "Could not save appointment")).toBeInTheDocument();

  });
  
  it("shows the delete error when failing to delete an existing appointment", async () => {
    axios.delete.mockRejectedValueOnce();
    const {container} = render(<Application />);
   
    await waitForElement(() => getByText(container,"Archie Cohen"));
    const appointment = getAllByTestId(container, "appointment").find( appointment => queryByText(appointment, "Archie Cohen"));

    fireEvent.click(queryByAltText(appointment, "Delete"));

    expect(getByText(appointment, "Are you sure you want to cancel this interview?")).toBeInTheDocument();   
    fireEvent.click(queryByText(appointment, "Confirm"));
    await waitForElement(() => queryByText(appointment, "Deleting"));
    expect(getByText(appointment, "Could not delete appointment")).toBeInTheDocument();
  });


});