import React from 'react';
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent, screen, act, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Config from "configs/currencyConfig";
import Convertor from "./Convertor";

const rates = {"CAD":1.5274,"HKD":9.3498,"ISK":153.9,"PHP":58.531,"DKK":7.436,"HUF":362.86,"CZK":26.087,"AUD":1.557,"RON":4.8749,"SEK":10.1833,"IDR":17254.29,"INR":88.6665,"BRL":6.7244,"RUB":89.3155,"HRK":7.5775,"JPY":128.63,"THB":36.436,"CHF":1.1014,"SGD":1.6042,"PLN":4.5263,"BGN":1.9558,"TRY":8.7175,"CNY":7.797,"NOK":10.36,"NZD":1.6629,"ZAR":18.1498,"USD":1.205,"MXN":25.0317,"ILS":3.9828,"GBP":0.86558,"KRW":1352.8,"MYR":4.8881};
const defaultProps = {
  rates: {},
  from: Config.DEFAULT_SOURCE,
  to: Config.DEFAULT_TARGET,
  value: Config.DEFAULT_AMOUNT,
};

beforeEach(() => {
  global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
    ok: true,
    json: () => ({
      rates,
    })
  }));
});

const renderComponent = (props = defaultProps) => render(<Convertor {...props} />);

describe("Convertor", () => {

  it("renders without crashing", async () => {
    renderComponent();
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
  });

  it("renders with default rates", async () => {
    renderComponent({
      ...defaultProps,
      rates,
      value: 1,
    });
    await screen.findByText('1.205');
    await screen.findByText('$1.21');
  });

  it("allow to change currency", async () => {
    const { container } = renderComponent({
      ...defaultProps,
      rates,
      value: 1,
    });

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    const selectSource = container.querySelector('select[name="from"]');
    const selectTarget = container.querySelector('select[name="to"]');

    act(() => {
      userEvent.selectOptions(selectSource, 'RUB');
    });

    await screen.findByText('1.205');

    act(() => {
      userEvent.selectOptions(selectTarget, 'EUR');
    });

    await screen.findByText('0.0112');
  });

  it("allow to switch currency", async () => {
    const { container } = renderComponent({
      ...defaultProps,
      rates,
      value: 1,
    });

    await screen.findByText('1.205');

    const switchButton = container.querySelector('button[formAction="/?switch=true"]');

    act(() => {
      userEvent.click(switchButton);
    });

    await screen.findByText('0.8299');
  });

  it("allow to enter amount to convert", async () => {
    const { container } = renderComponent({
      ...defaultProps,
      rates,
      value: 1,
    });

    await screen.findByText('1.205');
    const inputElement = container.querySelector('input[name="value"]');

    act(() => {
      fireEvent.change(inputElement, { target: { value: '235' } })
    });

    await screen.findByText('$283.18');
  });

  it("allow to convert on submit", async () => {
    renderComponent({
      ...defaultProps,
      rates,
      value: 12,
    });

    await screen.findByText('1.205');
    const inputElement = screen.getByLabelText('€');
    userEvent.type(inputElement, '10');

    act(() => {
      fireEvent.submit(inputElement);
    });

    await screen.findByText('$1,458.05');
  });

  it("show currency depending on specified locale", async () => {
    Config.DEFAULT_LOCALE = "ru";
    renderComponent({
      ...defaultProps,
      rates,
      value: 1,
    });
    await screen.findByText('1,205');
  });
});
