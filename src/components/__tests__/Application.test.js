import React from "react";

import { render, cleanup, waitForElement, fireEvent } from "@testing-library/react";

import { getByText, prettyDOM, getByAltText, getByPlaceholderText, getAllByTestId, queryByText } from "@testing-library/react";

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


  
  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {

    //1 . Render the application.
    const { container } = render(<Application />);

    //2. Wait until the text Archie Cohen is displayed
    await waitForElement(() => getByText(container, "Archie Cohen"));

  // 3. Click the "Delete" button on the booked appointment.
  // 4. Check that the confirmation message is shown.
  // 5. Click the "Confirm" button on the confirmation.
  // 6. Check that the element with the text "Deleting" is displayed.
  // 7. Wait until the element with the "Add" button is displayed.
  // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".

  });

});
