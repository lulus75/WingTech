import {Item} from "./ItemInterface";

export interface ParcelInterface {
  order_id: string;
  items: Item[];
  weight: number;
  tracking_id: string;
  palette_number: number;
}
