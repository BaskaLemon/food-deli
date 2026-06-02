/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCart, removeFromCart, clearCart, CartItem } from "@/lib/cart";

/* eslint-disable @next/next/no-img-element */

export default function CartSidebar() {
  const [open, setOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [orders, setOrders] = useState<
    {
      id: string;
      total_price: number;
      created_at: string;
      status: string;
    }[]
  >([]);
  const [showOrders, setShowOrders] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setCart(getCart());
    const saved = localStorage.getItem("delivery_address");
    if (saved) setAddress(saved);
  }, [open]);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleRemove = (id: string) => {
    removeFromCart(id);
    setCart(getCart());
  };

  const handleQuantityChange = (id: string, delta: number) => {
    const c = getCart();
    const item = c.find((i) => i.id === id);
    if (!item) return;
    item.quantity = Math.max(1, item.quantity + delta);
    localStorage.setItem("cart", JSON.stringify(c));
    setCart(getCart());
  };

  const fetchOrders = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    const res = await fetch("/api/orders", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      const data = await res.json();
      setOrders(data);
    }
  };

  const handleCheckout = async () => {
    setError("");

    const token = localStorage.getItem("token");
    if (!token) {
      setError("You need to log in first");
      return;
    }

    if (!address.trim()) {
      setError("Please enter a delivery address");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        address,
        items: cart.map((item) => ({
          dish_id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image_url: item.image_url,
        })),
        total,
      }),
    });

    setLoading(false);

    if (res.ok) {
      clearCart();
      setCart([]);
      setSuccess(true);
    } else {
      setError("Failed to place order. Please try again.");
    }
  };

  return (
    <>
      <button
        onClick={() => {
          setOpen(true);
          setSuccess(false);
          setError("");
          setShowOrders(false);
        }}
        className="relative p-2 rounded-full border border-white/20 hover:border-white/40 transition-colors"
      >
        <svg
          className="w-5 h-5 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        {cart.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            {cart.reduce((sum, i) => sum + i.quantity, 0)}
          </span>
        )}
      </button>
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setOpen(false)}
        />
      )}
      <div
        className={`fixed top-0 right-0 h-full w-96 bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex gap-2">
            <button
              onClick={() => setShowOrders(false)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                !showOrders
                  ? "bg-red-500 text-white"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              Cart
            </button>
            <button
              onClick={() => {
                setShowOrders(true);
                fetchOrders();
              }}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                showOrders
                  ? "bg-red-500 text-white"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              Order
            </button>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="w-7 h-7 flex items-center justify-center rounded-full border border-gray-200 text-gray-400 hover:bg-gray-100"
          >
            ✕
          </button>
        </div>
        {!showOrders ? (
          <>
            {success ? (
              <div className="flex-1 flex flex-col items-center justify-center gap-4 px-6">
                <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center text-4xl">
                  🛵
                </div>
                <p className="text-lg font-black text-center">
                  Your order has been successfully placed!
                </p>
                <button
                  onClick={() => {
                    setSuccess(false);
                    setOpen(false);
                  }}
                  className="mt-2 bg-black text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-800 transition-colors"
                >
                  Back to menu
                </button>
              </div>
            ) : cart.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center gap-4 px-6">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center text-4xl">
                  🛒
                </div>
                <p className="text-lg font-black text-gray-700">
                  Your cart is empty
                </p>
                <p className="text-sm text-gray-400 text-center">
                  Add some delicious food to get started
                </p>
                <button
                  onClick={() => setOpen(false)}
                  className="bg-black text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-800 transition-colors"
                >
                  Browse menu
                </button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-3">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">
                    My cart
                  </p>

                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 bg-gray-50 rounded-2xl p-3"
                    >
                      <img
                        src={item.image_url || "https://placehold.co/60x60"}
                        alt={item.name}
                        className="w-14 h-14 rounded-xl object-cover shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-gray-800 truncate">
                          {item.name}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          ${item.price.toFixed(2)} each
                        </p>
                        <div className="flex items-center gap-2 mt-1.5">
                          <button
                            onClick={() => handleQuantityChange(item.id, -1)}
                            className="w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-200 text-sm font-bold"
                          >
                            −
                          </button>
                          <span className="text-sm font-bold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleQuantityChange(item.id, 1)}
                            className="w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-200 text-sm font-bold"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <button
                          onClick={() => handleRemove(item.id)}
                          className="text-gray-300 hover:text-red-400 transition-colors text-sm"
                        >
                          ✕
                        </button>
                        <p className="text-sm font-black text-gray-800">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div className="mt-3">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">
                      Delivery location
                    </p>
                    <textarea
                      value={address}
                      onChange={(e) => {
                        setAddress(e.target.value);
                        localStorage.setItem(
                          "delivery_address",
                          e.target.value,
                        );
                      }}
                      placeholder="Enter delivery address..."
                      rows={2}
                      className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm resize-none focus:outline-none focus:border-gray-400"
                    />
                  </div>
                  <div className="mt-2">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">
                      Payment info
                    </p>
                    <div className="flex flex-col gap-1.5 text-sm">
                      {cart.map((item) => (
                        <div
                          key={item.id}
                          className="flex justify-between text-gray-500"
                        >
                          <span className="truncate flex-1">{item.name}</span>
                          <span className="font-medium ml-2">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                      <div className="flex justify-between font-black text-base border-t border-gray-100 pt-2 mt-1">
                        <span>Total</span>
                        <span className="text-red-500">
                          ${total.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                  {error && (
                    <p className="text-red-500 text-sm bg-red-50 px-3 py-2 rounded-xl">
                      {error}
                    </p>
                  )}
                </div>
                <div className="px-5 py-4 border-t border-gray-100">
                  <button
                    onClick={handleCheckout}
                    disabled={loading}
                    className="w-full bg-red-500 text-white rounded-2xl py-3.5 font-bold hover:bg-red-600 transition-colors disabled:opacity-50 text-sm"
                  >
                    {loading
                      ? "Placing order..."
                      : `Checkout • $${total.toFixed(2)}`}
                  </button>
                </div>
              </>
            )}
          </>
        ) : (
          <div className="flex-1 overflow-y-auto px-5 py-4">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
              Order history
            </p>
            {orders.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-3 h-48">
                <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center text-2xl">
                  📋
                </div>
                <p className="text-sm text-gray-400">No orders yet</p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {orders.map((order) => (
                  <div key={order.id} className="bg-gray-50 rounded-2xl p-4">
                    <div className="flex justify-between items-start mb-1">
                      <p className="text-sm font-bold text-gray-800">
                        ${Number(order.total_price).toFixed(2)}
                      </p>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          order.status === "DELIVERED"
                            ? "bg-green-100 text-green-600"
                            : order.status === "CANCELLED"
                              ? "bg-gray-100 text-gray-500"
                              : "bg-red-100 text-red-500"
                        }`}
                      >
                        {order.status.charAt(0) +
                          order.status.slice(1).toLowerCase()}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400">
                      {new Date(order.created_at).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
