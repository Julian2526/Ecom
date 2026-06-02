'use client';

import { useEffect, useState } from 'react';

// 👇 Tipo correcto para los items del carrito en los pedidos
type CartItem = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  tipologia?: string; // 👈 AGREGADO: para distinguir grano/molido
};

type Order = {
  _id: string;
  total: number;
  createdAt: string;
  cart: CartItem[];
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://ecom-production-d108.up.railway.app';

  // 🔑 Generar clave única (mismo método que en Navbar y Checkout)
  const getItemKey = (item: CartItem): string => {
    return `${item._id}-${item.tipologia || 'sin-tipologia'}`;
  };

  // 📝 Formatear tipologia para mostrar
  const formatTipologia = (tipologia?: string) => {
    if (!tipologia) return null;
    switch(tipologia) {
      case 'grano': return '🌰 Grano';
      case 'molido': return '⚡ Molido';
      case 'liofilizado': return '❄️ Liofilizado';
      default: return `📌 ${tipologia}`;
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (!user.email) return;

    fetch(`${API_URL}/orders/${user.email}`)
      .then(res => res.json())
      .then(data => setOrders(data))
      .catch(() => console.log('Error cargando pedidos'));
  }, []);

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
      <h1>📦 Historial de pedidos</h1>

      {orders.length === 0 ? (
        <p>No tienes pedidos aún</p>
      ) : (
        orders.map((order, index) => (
          <div
            key={order._id}
            style={{
              border: '1px solid #ddd',
              marginBottom: '20px',
              padding: '15px',
              borderRadius: '12px',
              background: '#fff',
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
            }}
          >
            <h3 style={{ marginBottom: '10px' }}>Pedido #{index + 1}</h3>

            {/* FECHA */}
            <p style={{ marginBottom: '8px' }}>
              <strong>📅 Fecha:</strong>{' '}
              {order.createdAt
                ? new Date(order.createdAt).toLocaleString()
                : 'Sin fecha'}
            </p>

            <p style={{ marginBottom: '12px' }}>
              <strong>💰 Total:</strong> ${order.total.toLocaleString()}
            </p>

            <div>
              <strong>🛒 Productos:</strong>
              <div style={{ marginTop: '8px' }}>
                {/* ✅ CORREGIDO: key única usando ID + tipologia */}
                {order.cart.map((item: CartItem) => (
                  <div 
                    key={getItemKey(item)}  // 👈 CLAVE ÚNICA
                    style={{
                      borderBottom: '1px solid #eee',
                      padding: '8px 0',
                      marginBottom: '8px',
                    }}
                  >
                    <div style={{ fontWeight: '500' }}>{item.name}</div>
                    {item.tipologia && (
                      <div style={{ fontSize: '12px', color: '#666' }}>
                        {formatTipologia(item.tipologia)}
                      </div>
                    )}
                    <div style={{ fontSize: '14px' }}>
                      Cantidad: {item.quantity} - $
                      {(item.price * item.quantity).toLocaleString()}
                    </div>
                    <div style={{ fontSize: '12px', color: '#888' }}>
                      ${item.price.toLocaleString()} c/u
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}