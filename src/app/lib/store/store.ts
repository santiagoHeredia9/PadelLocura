import { create } from "zustand";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from 'next/image';
type StaticImport = typeof Image;
import { ReactNode } from "react";

interface Product {
  material: ReactNode;
  form: ReactNode;
  thickness: ReactNode;
  nucleo: ReactNode;
  description: ReactNode;
  rating: number;
  stock: undefined;
  title: string;
  thumbnail: string | StaticImport;
  id: string;
  name: string;
  price: number;
  brand: string;
  quantity?: number;
}

interface Order {
  products: boolean;
  user: any;
  id: ReactNode;
  userId: number;
  ProductsIds: [];
  totalAmount: number;
}

interface StoreState {
  products: Product[];
  filteredProducts: Product[];
  cartProducts: Product[];
  productDetail: Product | null;
  appear: boolean;
  quantity: [];
  user: any;
  orders: Order[];
  fetchProducts: () => Promise<void>;
  addToCart: (product: Product, quantity: number) => void;
  filters: (brand: string) => void;
  detail: (id: string) => Promise<void>;
  setAppear: (appear: boolean) => void;
  removeFromCart: (id: string) => void;
  perPages: number;
  currentPage: number;
  changePage: (page: number) => void;
  changeQuantity: (id: string, quantity: number) => void;
  register: (formData: {
    username: string;
    email: string;
    phoneNumber: string;
    password: string;
  }) => Promise<{ success: boolean; user?: any; error?: string }>;
  login: (formData: {
    username: string;
    password: string;
  }) => Promise<{ success: boolean; user?: any; error?: string }>;
  setUser: (user: any) => void;
  setQuantity: (quantity: []) => void;
  setOrder: (
    userId: any,
    productIds: any,
    totalAmount: any
  ) => Promise<{ success: boolean; order?: any }>;
  getOrders: () => Promise<void>;
  resetPage: () => void;
}

export const useStore = create<StoreState>((set) => ({
  products: [],
  filteredProducts: [],
  cartProducts: [],
  orders: [],
  quantity: [],
  productDetail: null,
  appear: false,
  perPages: 8,
  currentPage: 1,
  user: null,
  fetchProducts: async () => {
    try {
      const { data } = await axios.get("/api/get-products");
      set({ products: data, filteredProducts: data });
    } catch (error) {
      console.error(error);
    }
  },
  addToCart: (product, quantity) => {
    set((state) => {
      const existingProductIndex = state.cartProducts.findIndex(
        (cartProduct) => cartProduct.id === product.id
      );
      if (existingProductIndex !== -1) {
        const updatedCartProducts = state.cartProducts.map(
          (cartProduct, index) => {
            if (index === existingProductIndex) {
              const newQuantity = cartProduct.quantity! + quantity;
              if (
                cartProduct.stock !== undefined &&
                newQuantity > cartProduct.stock
              ) {
                toast.error(
                  "No puedes agregar más productos de los que hay en stock.",
                  {
                    autoClose: 1500,
                  }
                );
                return cartProduct;
              }
              toast.success("Producto agregado al carrito", {
                autoClose: 1500,
              });
              return {
                ...cartProduct,
                quantity: newQuantity,
              };
            }

            return cartProduct;
          }
        );
        return {
          cartProducts: updatedCartProducts,
        };
      } else {
        toast.success("Producto agregado al carrito", {
          autoClose: 1500,
        });
        return {
          cartProducts: [...state.cartProducts, { ...product, quantity }],
        };
      }
    });
  },

  detail: async (id) => {
    try {
      const { data } = await axios.get(`/api/get-detail/${id}`);
      set({ productDetail: data });
    } catch (error) {
      console.error(error);
    }
  },
  setAppear: (appear) => set({ appear }),
  removeFromCart: (id) => {
    set((state) => ({
      cartProducts: state.cartProducts.filter((product) => product.id !== id),
    }));
  },

  changePage: (page) => set({ currentPage: page }),
  changeQuantity: (id: string, quantity: number) => {
    set((state) => {
      const updatedCartProducts = state.cartProducts.map((product) => {
        if (product.id === id) {
          const newQuantity = product.quantity! + quantity;
          if (product.stock !== undefined && newQuantity > product.stock) {
            toast.error(
              "No puedes agregar más productos de los que hay en stock."
            );
            return product;
          }
          return {
            ...product,
            quantity: Math.max(newQuantity, 1), // asegura que la cantidad no sea menor que 1
          };
        }
        return product;
      });

      return {
        cartProducts: updatedCartProducts,
      };
    });
  },

  register: async (formData) => {
    try {
      const formattedData = {
        ...formData,
        phoneNumber: String(formData.phoneNumber),
      };

      const response = await fetch("/api/create-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });

      if (response.ok) {
        const data = await response.json();
        set({ user: data });
        return { success: true, user: data };
      } else {
        const error = await response.json();
        return { success: false, error: error.error };
      }
    } catch (error) {
      console.error("Error:", error);
      return { success: false, error: "Error desconocido" };
    }
  },

  login: async (formData) => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        set({ user: data });
        localStorage.setItem("user", JSON.stringify(data));
        return { success: true, user: data };
      } else {
        const error = await response.json();
        return { success: false, error: error.error };
      }
    } catch (error) {
      console.error("Error:", error);
      return { success: false, error: "Error desconocido" };
    }
  },
  setUser: (user) => set({ user }),

  setQuantity: (quantity) => set({ quantity }),

  setOrder: async (
    userId: any,
    products: { id: number; quantity: number }[],
    totalAmount: any
  ) => {
    try {
      const { data } = await axios.post("/api/create-order", {
        userId,
        products,
        totalAmount,
      });
      set((state) => ({ orders: [...state.orders, data] }));
      return { success: true, order: data };
    } catch (error) {
      console.error(error);
      return { success: false, order: undefined };
    }
  },

  getOrders: async () => {
    try {
      const { data } = await axios.get("/api/get-orders");
      set({ orders: data });
    } catch (error) {
      console.error(error);
    }
  },
  filters: async (brand) => {
    try {
      const { data } = await axios.get(`/api/get-brand?brand=${brand}`);
      set({ filteredProducts: data });
    } catch (error) {
      console.error("Error filtering products by brand:", error);
    }
  },
  resetPage: () => set({ currentPage: 1 }),
}));
