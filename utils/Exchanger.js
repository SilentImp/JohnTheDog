import dayjs from 'dayjs';

class Exchanger {
  static async getExchangeRate(currency) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/latest?base=${currency}`);
    if (!response.ok) throw new Error('Network Error');
    const data = await response.json();
    return data?.rates;
  }

  static async getHistoryForMonth(sourceCurrency, targetCurrency) {
    const endDate = dayjs();
    const startDate = endDate.subtract(1, 'month');
    const format = 'YYYY-MM-DD';
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/history?start_at=${startDate.format(format)}&end_at=${endDate.format(format)}&base=${sourceCurrency}&symbols=${targetCurrency}`);
    if (!response.ok) throw new Error('Network Error');
    const data = await response.json();
    return data?.rates;
  }
}

export default Exchanger;
