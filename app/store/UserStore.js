import { create } from "zustand";


export const useUserAuth = create((set) => ({
    
    ipAddress: "192.168.1.101",

    isLoggedIn: false,

    userData : {},

    loading : false,

    // increasePopulation: () => set((state) => ({ bears:  
  }))