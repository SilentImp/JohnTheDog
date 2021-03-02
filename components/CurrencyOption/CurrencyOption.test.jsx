import React from 'react';
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import CurrencyOption from "./CurrencyOption";

const renderComponent = (props) => render(<CurrencyOption {...props} />);

describe("Currency Option", () => {

  it("renders without crashing", async () => {
    renderComponent({
      currency: 'USD'
    });
  });

});
