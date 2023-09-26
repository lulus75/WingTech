import * as itemsData from "../data/items.json";
import * as ordersData from "../data/orders.json";
import {OrderInterface} from "../interfaces/orderInterface";
import {ItemInterface} from "../interfaces/itemInterface";

// retrieving items from json data
export const items: ItemInterface[] = itemsData.items.map(item => ({
    ...item,
    weight: parseFloat(item.weight)
}));

// retrieving orders from json data
export const orders: OrderInterface[] = ordersData.orders.map(order => ({
    ...order,
    date: new Date(order.date)
}));