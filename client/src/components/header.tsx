"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Menu,
  ShoppingCart,
  Search,
  LogOut,
  Settings,
  User,
  Heart,
} from "lucide-react";
import { useAuthStore } from "@/store/authStore";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, token, logout, fetchProfile, isHydrated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (token && !user && isHydrated) {
      fetchProfile();
    }
  }, [token, user, fetchProfile, isHydrated]);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const navItems = [
    { name: "iPhone", href: "/iphone" },
    { name: "iPad", href: "/ipad" },
    { name: "Mac", href: "/mac" },
    { name: "Apple Watch", href: "/watch" },
    { name: "AirPods", href: "/airpods" },
    { name: "Аксессуары", href: "/accessories" },
  ];

  // Показываем скелетон пока не произошла гидратация
  const renderAuthSection = () => {
    if (!isHydrated) {
      return (
        <div className="flex items-center space-x-2">
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      );
    }

    if (user) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative h-10 w-10 rounded-full ring-2 ring-transparent hover:ring-primary/20 transition-all duration-200"
            >
              <Avatar className="h-9 w-9">
                <AvatarFallback className=" text-white font-semibold">
                  {user.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-2 p-2">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className=" text-white font-semibold">
                      {user.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user.name}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href="/profile">
              <DropdownMenuItem className="cursor-pointer">
                <User className="mr-3 h-4 w-4" />
                <span>Профиль</span>
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem className="cursor-pointer">
              <Heart className="mr-3 h-4 w-4" />
              <span>Избранное</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Settings className="mr-3 h-4 w-4" />
              <span>Настройки</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleLogout}
              className="cursor-pointer text-red-600 focus:text-red-600"
            >
              <LogOut className="mr-3 h-4 w-4" />
              <span>Выйти</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }

    return (
      <div className="flex items-center space-x-3">
        <Button variant="ghost" size="sm" className="font-medium" asChild>
          <Link href="/auth/login">Войти</Link>
        </Button>
        <Button
          size="sm"
          className="font-medium transition-all duration-200"
          asChild
        >
          <Link href="/auth/register">Регистрация</Link>
        </Button>
      </div>
    );
  };

  const renderMobileAuthSection = () => {
    if (!isHydrated) {
      return (
        <div className="pt-4 border-t">
          <Skeleton className="h-10 w-full mb-2" />
          <Skeleton className="h-10 w-full" />
        </div>
      );
    }

    if (user) {
      return (
        <div className="pt-6 border-t space-y-4">
          <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50">
            <Avatar className="h-12 w-12">
              <AvatarFallback className=" text-white font-semibold text-lg">
                {user.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>
          </div>
          <div className="space-y-2">
            <Button variant="ghost" className="w-full justify-start" size="sm">
              <User className="mr-3 h-4 w-4" />
              Профиль
            </Button>
            <Button variant="ghost" className="w-full justify-start" size="sm">
              <Heart className="mr-3 h-4 w-4" />
              Избранное
            </Button>
            <Button variant="ghost" className="w-full justify-start" size="sm">
              <Settings className="mr-3 h-4 w-4" />
              Настройки
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-red-600 hover:text-red-600 hover:bg-red-50"
              size="sm"
              onClick={handleLogout}
            >
              <LogOut className="mr-3 h-4 w-4" />
              Выйти
            </Button>
          </div>
        </div>
      );
    }

    return (
      <div className="pt-6 border-t space-y-3">
        <Button variant="outline" className="w-full font-medium" asChild>
          <Link href="/auth/login" onClick={() => setIsOpen(false)}>
            Войти
          </Link>
        </Button>
        <Button className="w-full font-medium" asChild>
          <Link href="/auth/register" onClick={() => setIsOpen(false)}>
            Регистрация
          </Link>
        </Button>
      </div>
    );
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="h-9 w-9 rounded-xl border flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-200 group-hover:scale-105">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent dark:from-white dark:to-gray-300">
              Apple Store
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 relative group"
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 group-hover:w-full transition-all duration-200"></span>
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          {/* Search */}
          <Button
            variant="ghost"
            size="icon"
            className="hidden sm:flex hover:bg-muted/80 transition-colors duration-200"
          >
            <Search className="h-4 w-4" />
          </Button>

          {/* Wishlist */}
          <Button
            variant="ghost"
            size="icon"
            className="hidden sm:flex hover:bg-muted/80 transition-colors duration-200"
          >
            <Heart className="h-4 w-4" />
          </Button>

          {/* Cart */}
          <Button
            variant="ghost"
            size="icon"
            className="relative hover:bg-muted/80 transition-colors duration-200"
          >
            <ShoppingCart className="h-4 w-4" />
            <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs border-0">
              2
            </Badge>
          </Button>

          {/* Auth Section - Desktop */}
          <div className="hidden sm:flex items-center ml-2">
            {renderAuthSection()}
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden hover:bg-muted/80 transition-colors duration-200"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[320px] sm:w-[400px]">
              <div className="flex flex-col h-full">
                {/* Mobile Logo */}
                <div className="flex items-center space-x-3 pb-6 border-b">
                  <div className="h-8 w-8 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">A</span>
                  </div>
                  <span className="font-bold text-lg">Apple Store</span>
                </div>

                {/* Mobile Navigation */}
                <nav className="flex flex-col space-y-1 py-6 flex-1">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-base font-medium py-3 px-3 rounded-lg hover:bg-muted/80 transition-colors duration-200"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>

                {/* Mobile Auth */}
                {renderMobileAuthSection()}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
