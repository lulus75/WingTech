// Define Order Item Interface
export interface OrderItemInterface {
    item_id: string;
    quantity: number;
}

// Define Order Interface
export interface OrderInterface {
    id: string;
    date: Date;
    items: OrderItemInterface[];
}
