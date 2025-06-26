"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  User,
  Mail,
  Calendar,
  ShoppingBag,
  Heart,
  Settings,
  Edit3,
  Save,
  X,
  Package,
  Star,
  CreditCard,
  ArrowRight,
} from "lucide-react";

export default function ProfilePage() {
  const { user, token, fetchProfile, logout } = useAuthStore();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    if (!token) {
      router.push("/auth/login");
      return;
    }

    if (user) {
      setEditForm({
        name: user.name,
        email: user.email,
      });
    }

    fetchProfile();
  }, [token, user, fetchProfile, router]);

  const handleSave = () => {
    console.log("Saving profile:", editForm);
    setIsEditing(false);
  };

  const handleCancel = () => {
    if (user) {
      setEditForm({
        name: user.name,
        email: user.email,
      });
    }
    setIsEditing(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-2 border-foreground border-t-transparent"></div>
      </div>
    );
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ru-RU", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <main>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-24 max-w-6xl">
          {/* Hero Section */}
          <div className="text-center space-y-8 mb-24">
            <div className="space-y-6">
              <Avatar className="w-32 h-32 mx-auto border-2 border-border bg-muted">
                <AvatarFallback className="text-3xl font-bold bg-black text-white">
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
                  {user.name}
                </h1>
                <p className="text-xl text-muted-foreground">{user.email}</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => setIsEditing(!isEditing)}
                className="bg-black text-white hover:bg-gray-800 group"
              >
                {isEditing ? (
                  <X className="mr-2 h-4 w-4" />
                ) : (
                  <Edit3 className="mr-2 h-4 w-4" />
                )}
                {isEditing ? "Отмена" : "Редактировать профиль"}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="outline" onClick={logout}>
                Выйти из аккаунта
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
            {/* Profile Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-8">Информация профиля</h2>

                {isEditing ? (
                  <Card className="border bg-background">
                    <CardContent className="p-8 space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm font-medium">
                          Имя
                        </Label>
                        <Input
                          id="name"
                          value={editForm.name}
                          onChange={(e) =>
                            setEditForm({ ...editForm, name: e.target.value })
                          }
                          className="border-border"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium">
                          Email
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={editForm.email}
                          onChange={(e) =>
                            setEditForm({ ...editForm, email: e.target.value })
                          }
                          className="border-border"
                        />
                      </div>
                      <div className="flex gap-3 pt-4">
                        <Button
                          onClick={handleSave}
                          className="bg-black text-white hover:bg-gray-800"
                        >
                          <Save className="w-4 h-4 mr-2" />
                          Сохранить
                        </Button>
                        <Button variant="outline" onClick={handleCancel}>
                          Отмена
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4 p-6 border rounded-lg hover:shadow-lg transition-shadow">
                      <div className="w-12 h-12 border-2 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Имя</p>
                        <p className="text-lg font-semibold">{user.name}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 p-6 border rounded-lg hover:shadow-lg transition-shadow">
                      <div className="w-12 h-12 border-2 rounded-full flex items-center justify-center">
                        <Mail className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="text-lg font-semibold">{user.email}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 p-6 border rounded-lg hover:shadow-lg transition-shadow">
                      <div className="w-12 h-12 border-2 rounded-full flex items-center justify-center">
                        <Calendar className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Дата регистрации
                        </p>
                        <p className="text-lg font-semibold">
                          {formatDate(user.created_at)}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Statistics */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-8">Статистика</h2>
                <div className="grid grid-cols-2 gap-6">
                  <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border bg-background">
                    <CardContent className="p-8">
                      <div className="w-16 h-16 border-2 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                        <ShoppingBag className="w-8 h-8" />
                      </div>
                      <div className="text-3xl font-bold mb-2">12</div>
                      <div className="text-muted-foreground">Заказов</div>
                    </CardContent>
                  </Card>

                  <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border bg-background">
                    <CardContent className="p-8">
                      <div className="w-16 h-16 border-2 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                        <Heart className="w-8 h-8" />
                      </div>
                      <div className="text-3xl font-bold mb-2">5</div>
                      <div className="text-muted-foreground">Избранное</div>
                    </CardContent>
                  </Card>

                  <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border bg-background">
                    <CardContent className="p-8">
                      <div className="w-16 h-16 border-2 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                        <CreditCard className="w-8 h-8" />
                      </div>
                      <div className="text-3xl font-bold mb-2">₽2.1M</div>
                      <div className="text-muted-foreground">Потрачено</div>
                    </CardContent>
                  </Card>

                  <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border bg-background">
                    <CardContent className="p-8">
                      <div className="w-16 h-16 border-2 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                        <Star className="w-8 h-8" />
                      </div>
                      <div className="text-3xl font-bold mb-2">VIP</div>
                      <div className="text-muted-foreground">Статус</div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="mb-24">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
                Последние заказы
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                История ваших покупок продукции Apple
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((order) => (
                <Card
                  key={order}
                  className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border bg-background group"
                >
                  <CardContent className="p-8">
                    <div className="w-16 h-16 border-2 rounded-2xl mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Package className="w-8 h-8" />
                    </div>
                    <h3 className="font-semibold text-xl mb-2">
                      Заказ #{order}001
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      iPhone 15 Pro Max
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge className="bg-black text-white border-0">
                        Доставлен
                      </Badge>
                      <span className="font-bold">₽129,990</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-16">
              <Button variant="outline" size="lg" className="px-8 py-3">
                Посмотреть все заказы
              </Button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              Быстрые действия
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border bg-background group">
              <CardContent className="p-8">
                <div className="w-20 h-20 border-2 rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Heart className="w-10 h-10" />
                </div>
                <h3 className="font-semibold text-xl mb-3">Избранное</h3>
                <p className="text-muted-foreground text-sm mb-6">
                  Ваши любимые продукты Apple
                </p>
                <Button variant="outline" className="w-full">
                  Перейти
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border bg-background group">
              <CardContent className="p-8">
                <div className="w-20 h-20 border-2 rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <CreditCard className="w-10 h-10" />
                </div>
                <h3 className="font-semibold text-xl mb-3">Способы оплаты</h3>
                <p className="text-muted-foreground text-sm mb-6">
                  Управление картами и платежами
                </p>
                <Button variant="outline" className="w-full">
                  Настроить
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border bg-background group">
              <CardContent className="p-8">
                <div className="w-20 h-20 border-2 rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Settings className="w-10 h-10" />
                </div>
                <h3 className="font-semibold text-xl mb-3">Настройки</h3>
                <p className="text-muted-foreground text-sm mb-6">
                  Персонализация аккаунта
                </p>
                <Button variant="outline" className="w-full">
                  Открыть
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
