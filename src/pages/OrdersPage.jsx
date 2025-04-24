import React, { useState, useEffect } from 'react';

const OrdersPage = () => {
 
  const initialOrders = [
    {
        "id": 1,
        "customerName": "John Doe",
        "orderDate": "2023-05-15",
        "items": [
          { "name": "coffee", "quantity": 2, "price": 10 },
          { "name": "mojito", "quantity": 1, "price": 20 }
        ],
        "totalAmount": 30,
        "status": "pending",
        "deliveryLocation": "New York, USA"
      },
      {
        "id": 2,
        "customerName": "Jane Smith",
        "orderDate": "2023-05-16",
        "items": [
          { "name": "limejuice", "quantity": 3, "price": 15 }
        ],
        "totalAmount": 45,
        "status": "pending",
        "deliveryLocation": "London, UK"
      },
      {
        "id": 3,
        "customerName": "Mike Johnson",
        "orderDate": "2023-05-17",
        "items": [
          { "name": "fanta soda", "quantity": 1, "price": 25 },
          { "name": "martini", "quantity": 2, "price": 30 }
        ],
        "totalAmount": 85,
        "status": "pending",
        "deliveryLocation": "Paris, France"
      }
  ];

  const [orders, setOrders] = useState(initialOrders);
  const [filter, setFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(false);

  
  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      try {
       
        const response = await fetch('/api/orders');
        const data = await response.json();
        setOrders(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleApprove = (orderId) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: 'approved' } : order
    ));
    
  };

  const handleReject = (orderId) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: 'rejected' } : order
    ));
    
  };

  const filteredOrders = filter === 'all' 
    ? orders 
    : orders.filter(order => order.status === filter);


  const canApproveOrder = (deliveryLocation) => {
    //  allow approval for orders in certain locations
    const allowedLocations = ['New York, USA', 'London, UK', 'Berlin, Germany'];
    return allowedLocations.includes(deliveryLocation);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Orders Management</h1>
      
      <div className="mb-6 flex justify-between items-center">
        <div className="flex space-x-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            All Orders
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 rounded ${filter === 'pending' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            Pending
          </button>
          <button
            onClick={() => setFilter('approved')}
            className={`px-4 py-2 rounded ${filter === 'approved' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            Approved
          </button>
          <button
            onClick={() => setFilter('rejected')}
            className={`px-4 py-2 rounded ${filter === 'rejected' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            Rejected
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {filteredOrders.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No orders found matching your criteria.
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <li key={order.id} className="p-6 hover:bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        Order #{order.id} - {order.customerName}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Date: {order.orderDate} | Status: 
                        <span className={`ml-1 px-2 py-1 text-xs rounded-full ${
                          order.status === 'approved' ? 'bg-green-100 text-green-800' :
                          order.status === 'rejected' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {order.status}
                        </span>
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        Delivery: {order.deliveryLocation}
                      </p>
                      
                      <div className="mt-3">
                        <h4 className="text-sm font-medium text-gray-700">Items:</h4>
                        <ul className="mt-1 space-y-1">
                          {order.items.map((item, index) => (
                            <li key={index} className="text-sm text-gray-600">
                              {item.quantity} × {item.name} - ${item.price.toFixed(2)} each
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <p className="mt-3 font-medium">
                        Total: ${order.totalAmount.toFixed(2)}
                      </p>
                    </div>
                    
                    {order.status === 'pending' && (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleApprove(order.id)}
                          disabled={!canApproveOrder(order.deliveryLocation)}
                          className={`px-4 py-2 rounded text-white ${
                            canApproveOrder(order.deliveryLocation)
                              ? 'bg-green-600 hover:bg-green-700'
                              : 'bg-green-300 cursor-not-allowed'
                          }`}
                          title={
                            canApproveOrder(order.deliveryLocation)
                              ? 'Approve this order'
                              : 'Cannot approve orders to this location'
                          }
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(order.id)}
                          className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;