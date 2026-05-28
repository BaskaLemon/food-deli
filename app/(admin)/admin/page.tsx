/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

/* eslint-disable @next/next/no-img-element */

type OrderItem = {
  id: string;
  dish_id: string;
  quantity: number;
  price: number;
  dishes: {
    name: string;
    image_url: string;
  } | null;
};

type Order = {
  id: string;
  users: { email: string } | null;
  food_order_items: OrderItem[];
  created_at: string;
  total_price: number;
  status: string;
};

const STATUS_STYLES: Record<string, string> = {
  PENDING: "border border-red-400 text-red-500",
  DELIVERED: "border border-green-500 text-green-600",
  CANCELLED: "border border-gray-300 text-gray-500",
};

const STATUSES = ["PENDING", "DELIVERED", "CANCELLED"];
const PAGE_SIZE = 10;

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/admin/orders?page=${page}&limit=${PAGE_SIZE}`)
      .then((res) => res.json())
      .then((data) => {
        setOrders(data.orders);
        setTotal(data.total);
        setLoading(false);
      });
  }, [page]);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  const toggleSelect = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );
  };

  const toggleAll = () => {
    if (selected.length === orders.length) {
      setSelected([]);
    } else {
      setSelected(orders.map((o) => o.id));
    }
  };

  const handleStatusChange = async (id: string, status: string) => {
    await fetch(`/api/admin/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  };

  const handleBulkStatusChange = async (status: string) => {
    await Promise.all(
      selected.map((id) =>
        fetch(`/api/admin/orders/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        }),
      ),
    );
    setOrders((prev) =>
      prev.map((o) => (selected.includes(o.id) ? { ...o, status } : o)),
    );
    setSelected([]);
  };

  const getPaginationPages = (): (number | string)[] => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    return [1, 2, 3, 4, 5, "...", totalPages];
  };

  return (
    <div className="flex min-h-screen bg-white">
      <aside className="w-44 border-r border-gray-100 flex flex-col gap-2 p-4 pt-6">
        <Link href="/" className="flex items-center gap-2 mb-8">
          <img src="/app-logo.svg" alt="" />

          <div>
            <p className="font-black text-sm">NomNom</p>
            <p className="text-xs text-gray-400">Swift delivery</p>
          </div>
        </Link>
        <Link
          href={"/food-menu"}
          className="flex items-center gap-2 text-sm text-gray-500 px-3 py-2 rounded-lg hover:bg-gray-50"
        >
          <span>⊞</span> Food menu
        </Link>
        <button className="flex items-center gap-2 text-sm text-white px-3 py-2 rounded-lg bg-gray-900 font-medium">
          <span>🚚</span> Orders
        </button>
      </aside>
      <main className="flex-1 p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-black">Orders</h1>
            <p className="text-sm text-gray-400">{total} items</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-600">
              <span>📅</span>
              <span>Filter by date</span>
            </div>
            <button
              disabled={selected.length === 0}
              onClick={() => {
                const status = prompt(
                  "Enter status: PENDING, DELIVERED, CANCELLED",
                );
                if (status) handleBulkStatusChange(status.toUpperCase());
              }}
              className="bg-gray-200 text-gray-500 px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-50 hover:bg-gray-300 transition-colors"
            >
              Change delivery state
            </button>
          </div>
        </div>
        <div className="border border-gray-100 rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-gray-400 text-left">
                <th className="p-4 w-10">
                  <input
                    type="checkbox"
                    checked={
                      selected.length === orders.length && orders.length > 0
                    }
                    onChange={toggleAll}
                    className="rounded"
                  />
                </th>
                <th className="p-4 w-10">№</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Food</th>
                <th className="p-4">Date</th>
                <th className="p-4">Total</th>
                <th className="p-4">Delivery state</th>
              </tr>
            </thead>
            <tbody>
              {loading
                ? Array.from({ length: 8 }).map((_, i) => (
                    <tr
                      key={i}
                      className="border-b border-gray-50 animate-pulse"
                    >
                      {Array.from({ length: 7 }).map((_, j) => (
                        <td key={j} className="p-4">
                          <div className="h-4 bg-gray-100 rounded w-3/4" />
                        </td>
                      ))}
                    </tr>
                  ))
                : orders.map((order, idx) => (
                    <tr
                      key={order.id}
                      className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                    >
                      <td className="p-4">
                        <input
                          type="checkbox"
                          checked={selected.includes(order.id)}
                          onChange={() => toggleSelect(order.id)}
                          className="rounded"
                        />
                      </td>
                      <td className="p-4 text-gray-500">
                        {idx + 1 + (page - 1) * PAGE_SIZE}
                      </td>
                      <td className="p-4 text-gray-700">
                        {order.users?.email ?? "Unknown"}
                      </td>
                      <td className="p-4 relative">
                        <button
                          onClick={() =>
                            setExpandedId(
                              expandedId === order.id ? null : order.id,
                            )
                          }
                          className="flex items-center gap-1 text-gray-600 hover:text-black"
                        >
                          {order.food_order_items.length} foods
                          <span className="text-xs">▾</span>
                        </button>

                        {expandedId === order.id && (
                          <div className="absolute top-10 left-0 z-20 bg-white border border-gray-100 rounded-xl shadow-lg p-3 flex flex-col gap-2 min-w-56">
                            {order.food_order_items.map((item) => (
                              <div
                                key={item.id}
                                className="flex items-center gap-3"
                              >
                                <img
                                  src={
                                    item.dishes?.image_url ||
                                    "https://placehold.co/40x40"
                                  }
                                  alt={item.dishes?.name ?? "dish"}
                                  className="w-10 h-10 rounded-lg object-cover"
                                />
                                <span className="text-sm text-gray-700 flex-1">
                                  {item.dishes?.name ?? "Unknown"}
                                </span>
                                <span className="text-sm text-gray-400">
                                  x {item.quantity}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </td>

                      <td className="p-4 text-gray-500">
                        {new Date(order.created_at).toLocaleDateString()}
                      </td>
                      <td className="p-4 font-semibold">
                        ${Number(order.total_price).toFixed(2)}
                      </td>
                      <td className="p-4">
                        <div
                          className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium w-fit ${
                            STATUS_STYLES[order.status] ??
                            "border border-gray-300 text-gray-500"
                          }`}
                        >
                          <select
                            value={order.status}
                            onChange={(e) =>
                              handleStatusChange(order.id, e.target.value)
                            }
                            className="bg-transparent border-none outline-none cursor-pointer text-sm"
                          >
                            {STATUSES.map((s) => (
                              <option key={s} value={s}>
                                {s.charAt(0) + s.slice(1).toLowerCase()}
                              </option>
                            ))}
                          </select>
                        </div>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end items-center gap-2 mt-6">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-30"
          >
            ‹
          </button>

          {getPaginationPages().map((p, i) =>
            p === "..." ? (
              <span
                key={i}
                className="w-8 h-8 flex items-center justify-center text-gray-400"
              >
                ...
              </span>
            ) : (
              <button
                key={i}
                onClick={() => setPage(Number(p))}
                className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium transition-colors ${
                  page === p
                    ? "bg-gray-900 text-white"
                    : "border border-gray-200 text-gray-500 hover:bg-gray-50"
                }`}
              >
                {p}
              </button>
            ),
          )}

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-30"
          >
            ›
          </button>
        </div>
      </main>
    </div>
  );
}
