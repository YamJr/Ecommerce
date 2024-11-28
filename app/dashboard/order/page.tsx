'use client';
import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ORDER_HISTORY } from '../../../graphql/orders';


type OrderItem = {
  id: string;
  quantity_ordered: number;
  product: {
    name: string;
    sku: string;
    price_range: {
      maximum_price: {
        final_price: {
          value: number;
          currency: string;
        };
      };
    };
  };
};

type Order = {
  id: string;
  order_number: string;
  status: string;
  created_at: string;
  items: OrderItem[];
  total: {
    grand_total: {
      value: number;
      currency: string;
    };
  };
};

type OrderHistoryData = {
  customer: {
    orders: {
      items: Order[];
    };
  };
};

const OrderHistory: React.FC = () => {
  const { loading, error, data } = useQuery<OrderHistoryData>(GET_ORDER_HISTORY);
  if (loading) return <p>Loading your order history...</p>;
  if (error) return <p>Error fetching order history: {error.message}</p>;
  console.log("data is",data);


  const orders = data?.customer?.orders?.items || [];
  // console.log('orders are', orders);
  return (
    <div className='container'>
      <h2 className="text-2xl font-bold mb-4">Your Order History</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul>
          {orders.map(order => (
            <li key={order.id} className="border-b py-4">
              <h3 className="text-lg font-semibold">Order Number: {order.order_number}</h3>
              <p>Status: {order.status}</p>
              <p>Ordered On: {new Date(order.created_at).toLocaleDateString()}</p>
              <div>
                <h4 className="font-medium">Items:</h4>
                <ul>
                  {order.items.map(item => (
                    <li key={item.id} className="flex justify-between">
                      <span>{item.product.name} (SKU: {item.product.sku})</span>
                      <span>Quantity: {item.quantity_ordered}</span>
                      <span>
                        Price: {item.product.price_range.maximum_price.final_price.value}{' '}
                        {item.product.price_range.maximum_price.final_price.currency}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="font-bold">
                Total: {order.total.grand_total.value} {order.total.grand_total.currency}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderHistory;
