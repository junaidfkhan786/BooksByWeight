export class ShipRocketOrders {
    order_id: string;
    order_date: string;
    pickup_location: string = "pickup";
    channel_id: string;
    comment: string = "Reseller: M/s Goku";
    billing_customer_name: string;
    billing_last_name: string = "";
    billing_address: string;
    billing_address_2: string = "";
    billing_city: string;
    billing_pincode: number;
    billing_state: string;
    billing_country: string = "India";
    billing_email: string;
    billing_phone: number;
    shipping_is_billing: boolean = true;
    shipping_customer_name: string;
    shipping_last_name: string;
    shipping_address: string;
    shipping_address_2: string;
    shipping_city: string;
    shipping_pincode: string;
    shipping_country: string;
    shipping_state: string;
    shipping_email: string;
    shipping_phone: string;
    order_items: [];
    payment_method: string = "Prepaid";
    shipping_charges: number = 0;
    giftwrap_charges: number = 0;
    transaction_charges: number = 0;
    total_discount: number = 0;
    sub_total: number;
    length: number = 10;
    breadth: number = 15;
    height: number = 20;
    weight: number;
}
// export class ShiprocketResponse {

//     awb_code: string
//     courier_company_id: string
//     courier_name: string
//     onboarding_completed_now: number
//     order_id: number
//     shipment_id: number
//     status: string
//     status_code: number

// }
