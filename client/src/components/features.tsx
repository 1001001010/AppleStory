"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Truck,
  Shield,
  Headphones,
  CreditCard,
  Award,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Быстрая доставка",
    description:
      "Бесплатная доставка по России от 3000 ₽. Доставка в день заказа в Москве и СПб.",
    badge: "Бесплатно",
  },
  {
    icon: Shield,
    title: "Официальная гарантия",
    description:
      "Все товары с официальной гарантией Apple. Сервисная поддержка по всей стране.",
    badge: "2 года",
  },
  {
    icon: Headphones,
    title: "Поддержка 24/7",
    description:
      "Круглосуточная техническая поддержка и консультации по всем продуктам Apple.",
    badge: "24/7",
  },
  {
    icon: CreditCard,
    title: "Удобная оплата",
    description:
      "Рассрочка 0%, Trade-in, оплата картой или наличными при получении.",
    badge: "0%",
  },
  {
    icon: Award,
    title: "Лучшие цены",
    description:
      "Гарантируем лучшие цены на рынке. Если найдете дешевле - вернем разницу.",
    badge: "Гарантия",
  },
  {
    icon: Zap,
    title: "Быстрая настройка",
    description:
      "Бесплатная настройка и перенос данных. Готовое к работе устройство за 30 минут.",
    badge: "30 мин",
  },
];

export function Features() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            Почему выбирают нас
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Мы предлагаем лучший сервис и условия для покупки техники Apple в
            России
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border bg-background group"
              >
                <CardContent className="p-8">
                  <div className="relative inline-flex items-center justify-center w-20 h-20 border-2 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent
                      className="h-10 w-10 text-black dark:text-white"
                      strokeWidth={1.5}
                    />
                    <Badge className="absolute -top-2 -right-2 bg-black text-white border-0 text-xs px-2 py-1">
                      {feature.badge}
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-xl mb-3 text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t">
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold mb-2">2.5M+</div>
            <div className="text-muted-foreground">Довольных клиентов</div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold mb-2">500+</div>
            <div className="text-muted-foreground">Продуктов в наличии</div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold mb-2">99.9%</div>
            <div className="text-muted-foreground">Время работы</div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold mb-2">4.9 ★</div>
            <div className="text-muted-foreground">Средний рейтинг</div>
          </div>
        </div>
      </div>
    </section>
  );
}
