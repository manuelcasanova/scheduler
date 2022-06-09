import React from "react";

import { render, cleanup, waitForElement, fireEvent } from "@testing-library/react";

import { getByText, prettyDOM, getByAltText,getByPlaceholderText, getAllByTestId, queryByText } from "@testing-library/react";

import Application from "components/Application";



afterEach(cleanup);

// it("renders without crashing", () => {
//   render(<Application />);
// });

describe("Form", () => {

  //Test now passing (I changed the http:// in axios.js)
it("defaults to Monday and changes the schedule when a new day is selected", () => {
  const { getByText } = render(<Application />);

  return waitForElement(() => getByText("Monday")).then(() => {
    fireEvent.click(getByText("Tuesday"));
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });
});


//Test no passing
it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
  const { container, debug } = render(<Application />);

  // console.log(prettyDOM(container));
  

  await waitForElement(() => getByText(container, "Archie Cohen"));

  const appointments = getAllByTestId(container, "appointment");
  const appointment = appointments[0];

  fireEvent.click(getByAltText(appointment, "Add"));

  fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
    target: { value: "Lydia Miller-Jones" }
  });

  fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
  fireEvent.click(getByText(appointment, "Save"));

  // console.log(prettyDOM(debug));

  expect(getByText(appointment, "Saving")).toBeInTheDocument();

  await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

  const day = getAllByTestId(container, "day").find(day =>
    queryByText(day, "Monday")
  );

  expect(getByText(day, "no spots remaining")).toBeInTheDocument();
});

});
