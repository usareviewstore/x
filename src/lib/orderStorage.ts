import { Order, OrderStatus, PaymentRecord } from '../types';

const STORAGE_KEY = 'urs_orders_v1';

export function generateClientOrderNumber(): string {
  const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  let rand = '';
  for (let i = 0; i < 5; i++) {
    rand += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `URS-2026-${rand}`;
}

export function getAllLocalOrders(): Order[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error('Error reading local orders:', e);
    return [];
  }
}

export function getLocalOrder(orderNumber: string): Order | null {
  if (!orderNumber) return null;
  const cleanNumber = orderNumber.trim().toUpperCase();
  const orders = getAllLocalOrders();
  return orders.find((o) => o.orderNumber?.toUpperCase() === cleanNumber) || null;
}

export function saveOrderLocally(order: Order): void {
  if (typeof window === 'undefined') return;
  try {
    const orders = getAllLocalOrders();
    const existingIndex = orders.findIndex(
      (o) => o.orderNumber?.toUpperCase() === order.orderNumber?.toUpperCase()
    );
    if (existingIndex >= 0) {
      orders[existingIndex] = { ...orders[existingIndex], ...order, updatedAt: new Date().toISOString() };
    } else {
      orders.unshift(order);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders.slice(0, 50)));
  } catch (e) {
    console.error('Error saving local order:', e);
  }
}

export function updateLocalOrderStatus(
  orderNumber: string,
  status: OrderStatus,
  payment?: PaymentRecord
): Order | null {
  if (!orderNumber) return null;
  const cleanNumber = orderNumber.trim().toUpperCase();
  const orders = getAllLocalOrders();
  const index = orders.findIndex((o) => o.orderNumber?.toUpperCase() === cleanNumber);
  if (index >= 0) {
    const updated: Order = {
      ...orders[index],
      status,
      ...(payment ? { payment } : {}),
      updatedAt: new Date().toISOString(),
    };
    orders[index] = updated;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
    } catch (e) {
      console.error('Error updating local order status:', e);
    }
    return updated;
  }
  return null;
}
