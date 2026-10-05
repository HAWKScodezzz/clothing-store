import { OrderFixture } from '@/types';

export const ORDER_FIXTURES: OrderFixture[] = [
  {
    id: 'EL-1001',
    contact: '7204154843',
    status: 2, // Packed
    events: [
      { label: 'Order Placed & Payment Confirmed', at: '2026-10-03 14:20' },
      { label: 'Quality Check & Packing Completed at Bengaluru Hub', at: '2026-10-04 10:15' },
      { label: 'Awaiting Courier Dispatch Handover', at: '2026-10-04 16:40' },
    ],
    courier: {
      name: 'Delhivery Express',
      url: 'https://www.delhivery.com/tracking',
    },
  },
  {
    id: 'EL-1002',
    contact: '9876543210',
    status: 3, // In Transit
    events: [
      { label: 'Order Placed', at: '2026-10-01 09:12' },
      { label: 'Order Confirmed', at: '2026-10-01 10:00' },
      { label: 'Package Picked Up by Courier', at: '2026-10-02 11:30' },
      { label: 'In Transit — Arrived at Regional Sorting Hub', at: '2026-10-03 04:45' },
    ],
    courier: {
      name: 'Blue Dart Surface',
      url: 'https://www.bluedart.com/tracking',
    },
  },
  {
    id: 'EL-1003',
    contact: 'customer@ellane.store',
    status: 5, // Delivered
    events: [
      { label: 'Order Placed', at: '2026-09-28 16:04' },
      { label: 'Order Packed & Dispatched', at: '2026-09-29 11:20' },
      { label: 'In Transit across Inter-City Linehaul', at: '2026-09-30 08:15' },
      { label: 'Out for Delivery by Rider', at: '2026-10-01 10:30' },
      { label: 'Package Delivered to Customer (Signature Verified)', at: '2026-10-01 14:10' },
    ],
    courier: {
      name: 'XpressBees Priority',
      url: 'https://www.xpressbees.com/track',
    },
  },
];

export function findOrderFixture(orderId: string, contact: string): OrderFixture | undefined {
  const normalizedId = orderId.replace('#', '').trim().toUpperCase();
  const normalizedContact = contact.trim().toLowerCase();

  return ORDER_FIXTURES.find(
    (o) =>
      o.id.toUpperCase() === normalizedId &&
      (o.contact.toLowerCase() === normalizedContact ||
        o.contact.replace(/\D/g, '') === normalizedContact.replace(/\D/g, ''))
  );
}
