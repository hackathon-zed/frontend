import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { produce } from "immer";
import { ICustomer } from "@/interfaces";
import { useEffect } from "react";
import { useRouter } from "next/router";


type UserStore = {
  user: ICustomer | null;
  setUser: (user: ICustomer) => void;
  clearUser: () => void;
  getUser: () => ICustomer | null;
};

export const useUserStore = create(
    persist<UserStore>(
        (set, get) => ({
            user: null,
            setUser: (user: ICustomer) => {
                set({ user });
            },
            clearUser: () => {
                set({ user: null });
            },
            getUser: () => {
                return get().user;
            }
        }),
        {
            name: "user",
            storage: createJSONStorage(() => localStorage)
        }
    )
);

export const useAuth = () => {
    const router = useRouter();
    const { setUser } = useUserStore();

    useEffect(() => {
        const { user } = router.query;
        if (user) {
            try {
                const parsedUser = JSON.parse(user as string) as ICustomer;
                setUser(parsedUser);
            } catch (error) {
                console.error("Failed to parse user from query params", error);
            }
        }
    }, [router.query, setUser]);
};