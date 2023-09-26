import { OrderInterface } from "../interfaces/orderInterface";
import { ParcelInterface } from "../interfaces/parcelInterface";
import { items } from "../utils/data";
import { getTrackingId } from "./trackingService";
import { calculateFee } from "../utils/feeCalculator";

export async function generateParcels(orders: OrderInterface[]): Promise<{ parcels: ParcelInterface[], total: number }> {
    let parcels: ParcelInterface[] = [];
    let paletteNumber = 1;
    let total = 0;

    // loop into the orders
    for (const order of orders) {
        // Init empty parcel
        let parcel: ParcelInterface = {
            order_id: order.id,
            items: [],
            weight: 0,
            tracking_id: "",
            palette_number: paletteNumber
        };

        // Loop into the current order items
        for (const orderItem of order.items) {
            // Retrieve the corresponding item from the json data
            const item = items.find(i => i.id === orderItem.item_id);
            // Check if we found an item
            if (item) {
                // Determine the total weight of items into the order
                let totalWeight = item.weight * orderItem.quantity;
                // Check if total items weight + parcelWeight exceed 30 kg
                while (totalWeight + parcel.weight > 30) {
                    // determining remaining weight available into the parcel
                    const remainingWeight = 30 - parcel.weight;
                    // Determining how many items can fit into the parcel
                    const remainingQuantity = Math.floor(remainingWeight / item.weight);

                    // if an item can fit add it to the parcel
                    if (remainingQuantity > 0) {
                        parcel.items.push({
                            ...orderItem,
                            quantity: remainingQuantity
                        });
                        // increment parcel weight with new item
                        parcel.weight += Number((item.weight * remainingQuantity).toFixed(3));
                        // decrement item's weight from total weight
                        totalWeight -= item.weight * remainingQuantity;
                    }
                    // generate parcel tracking id
                    parcel.tracking_id = await getTrackingId();
                    parcels.push(parcel);
                    // Calculate earned fees for this parcel
                    total += calculateFee(parcel.weight);
                    // If parcel amount is a multiple of 15, new palette
                    if (parcels.length % 15 === 0){
                        paletteNumber++;
                    }
                    // New empty parcel if we had items left
                    parcel = {
                        order_id: order.id,
                        items: [],
                        weight: 0,
                        tracking_id: "",
                        palette_number: paletteNumber
                    };
                }

                parcel.weight += Number(totalWeight.toFixed(3));
                parcel.items.push(orderItem);
            }
        }

        if (parcel.weight > 0) {
            parcel.tracking_id = await getTrackingId();
            parcels.push(parcel);
            total += calculateFee(parcel.weight);
            // If parcel amount is a multiple of 15, new palette
            if (parcels.length % 15 === 0) paletteNumber++;
        }
    }

    return {
        parcels: parcels,
        total: total
    };
}


