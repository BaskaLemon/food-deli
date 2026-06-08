/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useEffect, useRef, useState } from "react";
import { nanoid } from "nanoid";
import Link from "next/link";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";

/* eslint-disable @next/next/no-img-element */

type Category = {
  id: number;
  name: string;
};

type Dish = {
  id: string;
  name: string;
  price: number;
  image_url: string;
  description: string;
  category_id: number;
};

type Toast = {
  message: string;
} | null;

export default function FoodMenuPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<Toast>(null);
  const [addDishModal, setAddDishModal] = useState<number | null>(null);
  const [dishForm, setDishForm] = useState({
    name: "",
    price: "",
    description: "",
  });
  const [dishImage, setDishImage] = useState<string | null>(null);
  const [dishImageFile, setDishImageFile] = useState<File | null>(null);
  const dishImageRef = useRef<HTMLInputElement>(null);
  const [addCategoryModal, setAddCategoryModal] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [categoryIcon, setCategoryIcon] = useState("");
  const [editDish, setEditDish] = useState<Dish | null>(null);
  const [editForm, setEditForm] = useState({
    name: "",
    price: "",
    description: "",
  });
  const [editImage, setEditImage] = useState<string | null>(null);
  const [addingCategory, setAddingCategory] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [editCategory, setEditCategory] = useState<string>("");
  const editImageRef = useRef<HTMLInputElement>(null);
  const frameworks = [
    "Next.js",
    "SvelteKit",
    "Nuxt.js",
    "Remix",
    "Astro",
  ] as const;
  const showToast = (message: string) => {
    setToast({ message });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    Promise.all([
      fetch("/api/categories").then((r) => r.json()),
      fetch("/api/dishes").then((r) => r.json()),
    ]).then(([cats, dishs]) => {
      setCategories(cats);
      setDishes(Array.isArray(dishs) ? dishs : []);
      setLoading(false);
    });
  }, []);

  const visibleCategories = categories.map((cat) => ({
    ...cat,
    dishes: dishes.filter((d) => d.category_id === cat.id),
  }));

  const displayedCategories =
    selected !== null
      ? visibleCategories.filter((c) => c.id === selected)
      : visibleCategories;
  const handleAddDish = async () => {
    if (!dishForm.name || !dishForm.price || !addDishModal) return;

    let imageUrl = "";
    if (dishImageFile) {
      imageUrl = await uploadImage(dishImageFile);
    }

    const res = await fetch("/api/dishes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: dishForm.name,
        price: Number(dishForm.price),
        description: dishForm.description,
        category_id: selectedCategory ? Number(selectedCategory) : addDishModal,
        image_url: imageUrl,
      }),
    });

    const newDish = await res.json();
    setDishes((prev) => [...prev, newDish]);
    setAddDishModal(null);
    setDishForm({ name: "", price: "", description: "" });
    setDishImage(null);
    setDishImageFile(null);
    setSelectedCategory("");
    showToast("New dish added to the menu");
  };
  const openEditDish = (dish: Dish) => {
    setEditDish(dish);
    setEditForm({
      name: dish.name,
      price: String(dish.price),
      description: dish.description,
    });
    setEditImage(dish.image_url);
    setEditCategory(String(dish.category_id));
  };

  const handleEditDish = async () => {
    if (!editDish) return;

    const res = await fetch(`/api/dishes/${editDish.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: editForm.name,
        price: Number(editForm.price),
        description: editForm.description,
        image_url: editImage ?? editDish.image_url,
        category_id: editCategory ? Number(editCategory) : editDish.category_id,
      }),
    });

    const updated = await res.json();
    setDishes((prev) => prev.map((d) => (d.id === updated.id ? updated : d)));
    setEditDish(null);
    showToast("Dish updated successfully");
  };
  const handleAddCategory = async () => {
    if (!categoryName.trim()) return;
    setAddingCategory(true);

    await fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify([{ name: categoryName, icon: categoryIcon }]),
    });

    const newCat = await fetch("/api/categories").then((r) => r.json());
    setCategories(newCat);
    setAddCategoryModal(false);
    setCategoryName("");
    setCategoryIcon("");
    setAddingCategory(false);
    showToast("New Category is being added to the menu");
  };
  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setPreview: (v: string) => void,
    setFile: (f: File) => void,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFile(file);
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  };
  const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    return data.url;
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {toast && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-black text-white px-5 py-2.5 rounded-full text-sm font-medium flex items-center gap-2 shadow-lg">
          <span className="text-green-400">✓</span> {toast.message}
        </div>
      )}
      <aside className="w-44 border-r border-gray-100 flex flex-col gap-2 p-4 pt-6 bg-white">
        <Link href="/" className="flex items-center gap-2 mb-8">
          <img src="/app-logo.svg" alt="" />

          <div>
            <p className="font-black text-sm">NomNom</p>
            <p className="text-xs text-gray-400">Swift delivery</p>
          </div>
        </Link>
        <button className="flex items-center gap-2 text-sm text-white px-3 py-2 rounded-lg bg-gray-900 font-medium">
          <span>⊞</span> Food menu
        </button>
        <Link
          href={"/admin"}
          className="flex items-center gap-2 text-sm text-gray-500 px-3 py-2 rounded-lg hover:bg-gray-50"
        >
          <span>🚚</span> Orders
        </Link>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="bg-white rounded-2xl p-6 mb-6 border border-gray-100">
          <h1 className="text-xl font-black mb-4">Dishes category</h1>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelected(null)}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
                selected === null
                  ? "bg-black text-white border-black"
                  : "border-gray-200 text-gray-600 hover:border-gray-400"
              }`}
            >
              All Dishes
              <span
                className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${selected === null ? "bg-white text-black" : "bg-gray-100 text-gray-600"}`}
              >
                {dishes.length}
              </span>
            </button>
            {categories.map((cat) => (
              <div key={cat.id} className="flex items-center gap-1">
                <button
                  onClick={() => setSelected(cat.id)}
                  className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
                    selected === cat.id
                      ? "bg-black text-white border-black"
                      : "border-gray-200 text-gray-600 hover:border-gray-400"
                  }`}
                >
                  {cat.name}
                  <span
                    className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${selected === cat.id ? "bg-white text-black" : "bg-gray-100 text-gray-600"}`}
                  >
                    {dishes.filter((d) => d.category_id === cat.id).length}
                  </span>
                </button>
                <button
                  onClick={async () => {
                    if (!confirm(`Delete "${cat.name}"?`)) return;
                    await fetch(`/api/categories/${cat.id}`, {
                      method: "DELETE",
                    });
                    setCategories((prev) =>
                      prev.filter((c) => c.id !== cat.id),
                    );
                    setDishes((prev) =>
                      prev.filter((d) => d.category_id !== cat.id),
                    );
                    if (selected === cat.id) setSelected(null);
                    showToast(`"${cat.name}" category deleted`);
                  }}
                  className="w-5 h-5 flex items-center justify-center rounded-full bg-red-100 text-red-500 hover:bg-red-200 transition-colors text-xs"
                >
                  ✕
                </button>
              </div>
            ))}

            <button
              onClick={() => setAddCategoryModal(true)}
              disabled={addingCategory}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors text-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {addingCategory ? "..." : "+"}
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-8">
          {loading
            ? Array.from({ length: 2 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-6 border border-gray-100 animate-pulse"
                >
                  <div className="h-6 w-40 bg-gray-100 rounded mb-6" />
                  <div className="grid grid-cols-4 gap-4">
                    {Array.from({ length: 4 }).map((_, j) => (
                      <div key={j} className="rounded-2xl overflow-hidden">
                        <div className="h-36 bg-gray-100" />
                        <div className="p-3 space-y-2">
                          <div className="h-4 bg-gray-100 rounded w-3/4" />
                          <div className="h-3 bg-gray-100 rounded w-full" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            : displayedCategories.map((cat) => (
                <div
                  key={cat.id}
                  className="bg-white rounded-2xl p-6 border border-gray-100"
                >
                  <h2 className="text-lg font-black mb-5">
                    {cat.name}{" "}
                    <span className="text-gray-400 font-normal text-base">
                      ({cat.dishes.length})
                    </span>
                  </h2>

                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    <button
                      onClick={() => {
                        setAddDishModal(cat.id);
                        setSelectedCategory(String(cat.id));
                      }}
                      className="flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-red-300 p-6 hover:border-red-400 hover:bg-red-50 transition-all min-h-50"
                    >
                      <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white text-2xl font-bold">
                        +
                      </div>
                      <p className="text-sm text-gray-500 text-center font-medium">
                        Add new Dish to {cat.name}
                      </p>
                    </button>
                    {cat.dishes.map((dish) => (
                      <div
                        key={dish.id}
                        className="rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
                      >
                        <div className="relative">
                          <img
                            src={
                              dish.image_url || "https://placehold.co/400x200"
                            }
                            alt={dish.name}
                            className="w-full h-36 object-cover"
                          />
                          <button
                            onClick={() => openEditDish(dish)}
                            className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow hover:bg-red-50 transition-colors"
                          >
                            <span className="text-red-500 text-sm">✏️</span>
                          </button>
                        </div>
                        <div className="p-3">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <p className="text-sm font-bold text-red-500 leading-tight">
                              {dish.name}
                            </p>
                            <p className="text-sm font-black text-gray-800 whitespace-nowrap">
                              ${Number(dish.price).toFixed(2)}
                            </p>
                          </div>
                          <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                            {dish.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
        </div>
      </main>
      {addDishModal !== null && (
        <>
          <div
            className="fixed inset-0 bg-black/30 z-40"
            onClick={() => {
              setAddDishModal(null);
              setSelectedCategory("");
            }}
          />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-black">
                Add new Dish to{" "}
                {categories.find((c) => c.id === addDishModal)?.name}
              </h2>
              <button
                onClick={() => {
                  setAddDishModal(null);
                  setSelectedCategory("");
                }}
                className="w-7 h-7 flex items-center justify-center rounded-full border border-gray-200 text-gray-400 hover:bg-gray-100"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-xs font-semibold text-gray-500 mb-1 block">
                  Food name
                </label>
                <input
                  type="text"
                  placeholder="Type food name"
                  value={dishForm.name}
                  onChange={(e) =>
                    setDishForm((p) => ({ ...p, name: e.target.value }))
                  }
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-gray-400"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 mb-1 block">
                  Food price
                </label>
                <input
                  type="number"
                  placeholder="Enter price..."
                  value={dishForm.price}
                  onChange={(e) =>
                    setDishForm((p) => ({ ...p, price: e.target.value }))
                  }
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-gray-400"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="text-xs font-semibold text-gray-500 mb-1 block">
                Category
              </label>
              <Combobox
                items={categories.map((c) => String(c.id))}
                value={selectedCategory}
                onValueChange={(val) => setSelectedCategory(val ?? "")}
              >
                <ComboboxInput
                  placeholder={
                    categories.find((c) => c.id === addDishModal)?.name ??
                    "Select category"
                  }
                />
                <ComboboxContent>
                  <ComboboxEmpty>No categories found.</ComboboxEmpty>
                  <ComboboxList>
                    {(item) => (
                      <ComboboxItem key={item} value={item}>
                        {categories.find((c) => String(c.id) === item)?.name ??
                          item}
                      </ComboboxItem>
                    )}
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
            </div>

            <div className="mb-4">
              <label className="text-xs font-semibold text-gray-500 mb-1 block">
                Ingredients
              </label>
              <textarea
                placeholder="List ingredients..."
                value={dishForm.description}
                onChange={(e) =>
                  setDishForm((p) => ({ ...p, description: e.target.value }))
                }
                rows={3}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm resize-none focus:outline-none focus:border-gray-400"
              />
            </div>

            <div className="mb-5">
              <label className="text-xs font-semibold text-gray-500 mb-1 block">
                Food image
              </label>
              {dishImage ? (
                <div className="relative rounded-xl overflow-hidden">
                  <img
                    src={dishImage}
                    alt="preview"
                    className="w-full h-40 object-cover"
                  />
                  <button
                    onClick={() => setDishImage(null)}
                    className="absolute top-2 right-2 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow text-gray-500 hover:bg-gray-100"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => dishImageRef.current?.click()}
                  className="w-full border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center gap-2 hover:border-gray-400 transition-colors"
                >
                  <span className="text-2xl text-gray-300">🖼️</span>
                  <p className="text-sm text-gray-400">
                    Choose a file or drag & drop it here
                  </p>
                </button>
              )}
              <input
                ref={dishImageRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) =>
                  handleImageChange(e, setDishImage, setDishImageFile)
                }
              />
            </div>

            <button
              onClick={handleAddDish}
              className="w-full bg-black text-white rounded-xl py-2.5 text-sm font-semibold hover:bg-gray-800 transition-colors"
            >
              Add Dish
            </button>
          </div>
        </>
      )}
      {editDish && (
        <>
          <div
            className="fixed inset-0 bg-black/30 z-40"
            onClick={() => setEditDish(null)}
          />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-black">Edit Dish</h2>
              <button
                onClick={() => setEditDish(null)}
                className="w-7 h-7 flex items-center justify-center rounded-full border border-gray-200 text-gray-400 hover:bg-gray-100"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-xs font-semibold text-gray-500 mb-1 block">
                  Food name
                </label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) =>
                    setEditForm((p) => ({ ...p, name: e.target.value }))
                  }
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-gray-400"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 mb-1 block">
                  Food price
                </label>
                <input
                  type="number"
                  value={editForm.price}
                  onChange={(e) =>
                    setEditForm((p) => ({ ...p, price: e.target.value }))
                  }
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-gray-400"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="text-xs font-semibold text-gray-500 mb-1 block">
                Category
              </label>
              <Combobox
                items={categories.map((c) => String(c.id))}
                value={editCategory}
                onValueChange={(val) => setEditCategory(val ?? "")}
              >
                <ComboboxInput
                  placeholder={
                    categories.find((c) => String(c.id) === editCategory)
                      ?.name ?? "Select category"
                  }
                />
                <ComboboxContent>
                  <ComboboxEmpty>No categories found.</ComboboxEmpty>
                  <ComboboxList>
                    {(item) => (
                      <ComboboxItem key={item} value={item}>
                        {categories.find((c) => String(c.id) === item)?.name ??
                          item}
                      </ComboboxItem>
                    )}
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
            </div>
            <div className="mb-4">
              <label className="text-xs font-semibold text-gray-500 mb-1 block">
                Ingredients
              </label>
              <textarea
                value={editForm.description}
                onChange={(e) =>
                  setEditForm((p) => ({ ...p, description: e.target.value }))
                }
                rows={3}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm resize-none focus:outline-none focus:border-gray-400"
              />
            </div>

            <div className="mb-5">
              <label className="text-xs font-semibold text-gray-500 mb-1 block">
                Food image
              </label>
              {editImage ? (
                <div className="relative rounded-xl overflow-hidden">
                  <img
                    src={editImage}
                    alt="preview"
                    className="w-full h-40 object-cover"
                  />
                  <button
                    onClick={() => setEditImage(null)}
                    className="absolute top-2 right-2 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow text-gray-500 hover:bg-gray-100"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => editImageRef.current?.click()}
                  className="w-full border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center gap-2 hover:border-gray-400 transition-colors"
                >
                  <span className="text-2xl text-gray-300">🖼️</span>
                  <p className="text-sm text-gray-400">
                    Choose a file or drag & drop it here
                  </p>
                </button>
              )}
              <input
                ref={dishImageRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) =>
                  handleImageChange(e, setDishImage, setDishImageFile)
                }
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={async () => {
                  await fetch(`/api/dishes/${editDish.id}`, {
                    method: "DELETE",
                  });
                  setDishes((prev) => prev.filter((d) => d.id !== editDish.id));
                  setEditDish(null);
                  showToast("Dish deleted successfully");
                }}
                className="flex-1 border border-red-200 text-red-500 rounded-xl py-2.5 text-sm font-semibold hover:bg-red-50 transition-colors"
              >
                Delete
              </button>
              <button
                onClick={() => setEditDish(null)}
                className="flex-1 border border-gray-200 text-gray-600 rounded-xl py-2.5 text-sm font-semibold hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleEditDish}
                className="flex-1 bg-black text-white rounded-xl py-2.5 text-sm font-semibold hover:bg-gray-800 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </>
      )}
      {addCategoryModal && (
        <>
          <div
            className="fixed inset-0 bg-black/30 z-40"
            onClick={() => setAddCategoryModal(false)}
          />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-black">Add new category</h2>
              <button
                onClick={() => setAddCategoryModal(false)}
                className="w-7 h-7 flex items-center justify-center rounded-full border border-gray-200 text-gray-400 hover:bg-gray-100"
              >
                ✕
              </button>
            </div>

            <div className="mb-5">
              <label className="text-xs font-semibold text-gray-500 mb-1 block">
                Category name
              </label>
              <input
                type="text"
                placeholder="Type category name..."
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-gray-400"
              />

              <label className="text-xs font-semibold text-gray-500 mt-3 mb-1 block">
                Icon
              </label>
              <input
                type="text"
                placeholder="Type an emoji e.g. 🍕"
                value={categoryIcon}
                onChange={(e) => setCategoryIcon(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-gray-400"
              />
            </div>

            <button
              onClick={handleAddCategory}
              disabled={addingCategory}
              className="w-full bg-black text-white rounded-xl py-2.5 text-sm font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add category
            </button>
          </div>
        </>
      )}
    </div>
  );
}
