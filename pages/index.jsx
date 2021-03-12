import Convertor from "components/Convertor";
import Exchanger from 'utils/Exchanger';
import Config from "configs/currencyConfig";
import { parseBody } from 'next/dist/next-server/server/api-utils';

export default Convertor;

export async function getServerSideProps(context) {
  const body = await parseBody(context.req);
  let rates = {};
  const fromDefault = body?.from || context?.query?.from || Config.DEFAULT_SOURCE;
  const toDefault = body?.to || context?.query?.to || Config.DEFAULT_TARGET;
  const from = context?.query?.switch ? toDefault : fromDefault;
  const to = context?.query?.switch ? fromDefault : toDefault;
  const value = body?.value || Config.DEFAULT_AMOUNT;
  
  try {
    rates = await Exchanger.getExchangeRate(from);
  } catch (error) {
    // @TODO Add error reporting.
    // @TODO Request data again for some error cases 
    // with a delay a couple of times.
  }
  return {
    props: { 
      rates,
      from,
      to,
      value,
    },
  }
}
