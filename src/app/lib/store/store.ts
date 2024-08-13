// src/store/store.ts
import create from "zustand";
import axios from "axios";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

interface Product {
  stock: undefined;
  title: string;
  thumbnail: string | StaticImport;
  id: string;
  name: string;
  price: number;
  brand: string;
  quantity?: number;
}

interface StoreState {
  products: Product[];
  filteredProducts: Product[];
  cartProducts: Product[];
  productDetail: Product | null;
  appear: boolean;
  user: any;
  fetchProducts: () => Promise<void>;
  addToCart: (product: Product, quantity: number) => void;
  filters: (brand: string, minPrice: number) => void;
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
}

export const useStore = create<StoreState>((set) => ({
  products: [],
  filteredProducts: [],
  cartProducts: [],
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
              return {
                ...cartProduct,
                quantity:
                  cartProduct.stock! &&
                  cartProduct.stock >= cartProduct.quantity!
                    ? cartProduct.quantity! + quantity
                    : quantity,
              };
            }
            return cartProduct;
          }
        );
        return {
          cartProducts: updatedCartProducts,
        };
      } else {
        return {
          cartProducts: [...state.cartProducts, { ...product, quantity }],
        };
      }
    });
  },
  filters: (brand, minPrice) => {
    set((state) => ({
      filteredProducts: state.products.filter(
        (product) =>
          product.price >= minPrice &&
          (brand === "all" || product.brand === brand)
      ),
    }));
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
          // Verifica que la nueva cantidad no exceda el stock disponible
          const newQuantity = product.quantity! + quantity;
          if (product.stock !== undefined && newQuantity > product.stock) {
            alert("No puedes agregar más productos de los que hay en stock.");
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
      // Asegúrate de que phoneNumber sea un string
      const formattedData = {
        ...formData,
        phoneNumber: String(formData.phoneNumber), // Convertir a string
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
}));
