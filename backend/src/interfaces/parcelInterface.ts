import {OrderItemInterface} from "./orderInterface";

// Define Parcel Interface
export interface ParcelInterface {
    order_id: string;
    items: OrderItemInterface[];
    weight: number;
    tracking_id: string;
    palette_number: number;
}