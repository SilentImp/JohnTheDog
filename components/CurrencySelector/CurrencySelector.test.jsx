import React from 'react';
import "@testing-library/jest-dom/extend-expect";
import { render, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CurrencySelector from "./CurrencySelector";

const renderComponent = (onChangeHandler) => render(
  <CurrencySelector 
    label="Currency: "
    name="currency"
    onChange={onChangeHandler} 
    value="USD"
  >
    <option value="USD">USD</option>
    <option value="EUR">EUR</option>
    <option value="RUB">RUB</option>
  </CurrencySelector>
);

describe("Currency Option", () => {
  it("renders without crashing", () => {
    const { container } = render(
      <CurrencySelector 
        label="Currency: "
        name="currency"
        onChange={() => {}} 
        value="USD"
      />);
      const select = container.querySelector('select');
      expect(select).toHaveAttribute('name', 'currency');
  });

  it("rendering options and allow to switch them", () => {
    const onChangeHandler = jest.fn();
    const { container } = renderComponent(onChangeHandler);
    const select = container.querySelector('select');
    act(() => {
      userEvent.selectOptions(select, 'RUB');
    });
    expect(onChangeHandler).toHaveBeenCalledTimes(1);
  });
});
