import { ServerRespond } from './DataStreamer';

export interface Row {
  price_abc: number,
  price_def: number,
  ratio: number,
  upper_bound: number,
  lower_bound: number,
  trigger_alert: number | undefined,
  timestamp: Date,
}

export class DataManipulator {
  static generateRow(serverResponds: ServerRespond[]): Row[] {
    const priceABC = serverResponds[0].top_ask.price;
    const priceDEF = serverResponds[1].top_ask.price;
    const ratio = priceABC / priceDEF;
    const upperBound = 1.05;  // Example upper bound, adjust as needed
    const lowerBound = 0.95;  // Example lower bound, adjust as needed
    const triggerAlert = (ratio > upperBound || ratio < lowerBound) ? ratio : undefined;

    return [{
      price_abc: priceABC,
      price_def: priceDEF,
      ratio,
      upper_bound: upperBound,
      lower_bound: lowerBound,
      trigger_alert: triggerAlert,
      timestamp: serverResponds[0].timestamp,
    }];
  }
}