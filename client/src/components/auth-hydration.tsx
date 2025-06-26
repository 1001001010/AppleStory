"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";

export function AuthHydration() {
  const setHydrated = useAuthStore((state) => state.setHydrated);

  useEffect(() => {
    // Устанавливаем флаг гидратации после монтирования компонента
    setHydrated();
  }, [setHydrated]);

  return null;
}
