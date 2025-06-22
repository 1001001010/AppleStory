"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Heart, ShoppingCart, Eye, Zap } from "lucide-react";

const products = [
  {
    id: 1,
    name: "iPhone 15 Pro Max",
    price: "от 129 990 ₽",
    originalPrice: "139 990 ₽",
    image: "../../public/apple-iphone-15-pro-natural-titanium-1x-1200x630.jpg",
    badge: "Новинка",
    rating: 4.9,
    reviews: 2847,
    description:
      "Титановый корпус. Чип A17 Pro. Камера с 5x зумом. ProRAW и ProRes.",
    colors: ["#000000", "#333333", "#666666", "#ffffff"],
    features: ["5G", "Face ID", "Wireless Charging"],
  },
  {
    id: 2,
    name: "iPhone 15 Pro",
    price: "от 99 990 ₽",
    originalPrice: "109 990 ₽",
    image: "/placeholder.svg?height=400&width=400",
    badge: "Популярное",
    rating: 4.8,
    reviews: 1923,
    description: "Титановый корпус. Чип A17 Pro. Профессиональная камера.",
    colors: ["#000000", "#333333", "#666666", "#ffffff"],
    features: ["5G", "Face ID", "MagSafe"],
  },
  {
    id: 3,
    name: 'MacBook Pro 16"',
    price: "от 249 990 ₽",
    image: "/placeholder.svg?height=400&width=400",
    badge: "Pro",
    rating: 4.9,
    reviews: 856,
    description: "Чип M3 Max. 128 ГБ памяти. Liquid Retina XDR дисплей.",
    colors: ["#333333", "#ffffff"],
    features: ["M3 Max", "128GB RAM", "8TB SSD"],
  },
  {
    id: 4,
    name: "MacBook Air M3",
    price: "от 129 990 ₽",
    image: "/placeholder.svg?height=400&width=400",
    rating: 4.8,
    reviews: 1247,
    description: "Невероятная производительность. До 18 часов работы. Тишина.",
    colors: ["#333333", "#ffffff", "#666666"],
    features: ["M3 Chip", "18h Battery", "Fanless"],
  },
  {
    id: 5,
    name: 'iPad Pro 12.9"',
    price: "от 109 990 ₽",
    image: "/placeholder.svg?height=400&width=400",
    badge: "Скидка",
    rating: 4.7,
    reviews: 634,
    description: "Чип M4. Дисплей Tandem OLED. Apple Pencil Pro в комплекте.",
    colors: ["#333333", "#ffffff"],
    features: ["M4 Chip", "OLED", "Apple Pencil Pro"],
  },
  {
    id: 6,
    name: "iPad Air",
    price: "от 64 990 ₽",
    image: "/placeholder.svg?height=400&width=400",
    rating: 4.6,
    reviews: 892,
    description: "Чип M2. Поддержка Apple Pencil. Идеален для творчества.",
    colors: ["#333333", "#ffffff", "#000000", "#666666"],
    features: ["M2 Chip", "Apple Pencil", '10.9" Display'],
  },
  {
    id: 7,
    name: "Apple Watch Ultra 2",
    price: "от 89 990 ₽",
    image: "/placeholder.svg?height=400&width=400",
    badge: "Экстрим",
    rating: 4.8,
    reviews: 445,
    description:
      "Титановый корпус. GPS + Cellular. Для экстремальных приключений.",
    colors: ["#333333", "#000000"],
    features: ["Titanium", "GPS+Cellular", "100m Water"],
  },
  {
    id: 8,
    name: "Apple Watch Series 9",
    price: "от 39 990 ₽",
    originalPrice: "44 990 ₽",
    image: "/placeholder.svg?height=400&width=400",
    rating: 4.6,
    reviews: 1567,
    description: "Самые продвинутые датчики здоровья и фитнеса. Double Tap.",
    colors: ["#000000", "#ffffff", "#333333", "#666666"],
    features: ["Health Sensors", "Double Tap", "Always-On"],
  },
  {
    id: 9,
    name: "AirPods Pro (3-го поколения)",
    price: "от 24 990 ₽",
    image: "/placeholder.svg?height=400&width=400",
    badge: "Новинка",
    rating: 4.8,
    reviews: 2134,
    description: "Адаптивное шумоподавление. Пространственный звук. USB-C.",
    colors: ["#ffffff"],
    features: ["Noise Cancelling", "Spatial Audio", "USB-C"],
  },
  {
    id: 10,
    name: "AirPods Max",
    price: "от 59 990 ₽",
    originalPrice: "64 990 ₽",
    image: "/placeholder.svg?height=400&width=400",
    rating: 4.7,
    reviews: 723,
    description: "Премиальные наушники с активным шумоподавлением.",
    colors: ["#333333", "#ffffff", "#000000", "#666666"],
    features: ["Premium Audio", "Active Noise", "20h Battery"],
  },
  {
    id: 11,
    name: "Mac Studio",
    price: "от 199 990 ₽",
    image: "/placeholder.svg?height=400&width=400",
    badge: "Pro",
    rating: 4.9,
    reviews: 234,
    description:
      "Чип M2 Max или M2 Ultra. Профессиональная мощность в компактном корпусе.",
    colors: ["#333333"],
    features: ["M2 Ultra", "Pro Performance", "Compact"],
  },
  {
    id: 12,
    name: "Mac Pro",
    price: "от 699 990 ₽",
    image: "/placeholder.svg?height=400&width=400",
    badge: "Максимум",
    rating: 4.9,
    reviews: 89,
    description:
      "Чип M2 Ultra. Максимальная производительность для профессионалов.",
    colors: ["#333333"],
    features: ["M2 Ultra", "Max Performance", "Expandable"],
  },
];

const categories = [
  { name: "Все", count: products.length, active: true },
  { name: "iPhone", count: 2 },
  { name: "Mac", count: 4 },
  { name: "iPad", count: 2 },
  { name: "Watch", count: 2 },
  { name: "AirPods", count: 2 },
];

export function Products() {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center space-y-6 mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
            Наша коллекция
            <span className="block text-muted-foreground text-2xl sm:text-3xl lg:text-4xl font-normal mt-2">
              Более 500 продуктов Apple
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Выберите из широкого ассортимента продукции Apple с официальной
            гарантией и быстрой доставкой
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category.name}
              variant={category.active ? "default" : "outline"}
              className="rounded-full px-6 py-2"
            >
              {category.name}
              <Badge variant="secondary" className="ml-2">
                {category.count}
              </Badge>
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <Card
              key={product.id}
              className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 bg-card/50 backdrop-blur-sm overflow-hidden"
              style={{
                animationDelay: `${index * 50}ms`,
              }}
            >
              <CardContent className="p-0">
                {/* Image Container */}
                <div className="relative">
                  <div className="aspect-square bg-gradient-to-br from-muted to-muted/50 p-8 flex items-center justify-center overflow-hidden">
                    {/* <img
                      src="/client/public/iphone.jpg"
                      alt={product.name}
                      width={800}
                      height={500}
                      className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                    /> */}
                    {/* <img src="" alt="" /> */}
                  </div>

                  {/* Badges */}
                  {product.badge && (
                    <Badge className="absolute top-3 left-3 bg-black text-white border-0">
                      {product.badge}
                    </Badge>
                  )}

                  {/* Action Buttons */}
                  <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      size="icon"
                      variant="secondary"
                      className="bg-white/90 backdrop-blur-sm hover:bg-white"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="secondary"
                      className="bg-white/90 backdrop-blur-sm hover:bg-white"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Quick Features */}
                  <div className="absolute bottom-3 left-3 flex gap-1">
                    {product.features?.slice(0, 2).map((feature, i) => (
                      <Badge
                        key={i}
                        variant="secondary"
                        className="text-xs bg-black/70 text-white border-0"
                      >
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  {/* Rating and Colors */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-black text-black" />
                        <span className="text-sm font-medium">
                          {product.rating}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          ({product.reviews})
                        </span>
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      {product.colors.map((color, i) => (
                        <div
                          key={i}
                          className="w-4 h-4 rounded-full border-2 border-gray-300 shadow-sm"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Product Name */}
                  <h3 className="font-semibold text-lg group-hover:text-primary transition-colors line-clamp-1">
                    {product.name}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Features */}
                  {product.features && (
                    <div className="flex flex-wrap gap-1">
                      {product.features.slice(0, 3).map((feature, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          <Zap className="h-3 w-3 mr-1" />
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {/* Price */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="font-bold text-xl">{product.price}</div>
                        {product.originalPrice && (
                          <div className="text-sm text-muted-foreground line-through">
                            {product.originalPrice}
                          </div>
                        )}
                      </div>
                      {product.originalPrice && (
                        <Badge variant="destructive" className="text-xs">
                          Скидка{" "}
                          {Math.round(
                            ((Number.parseInt(
                              product.originalPrice.replace(/\D/g, "")
                            ) -
                              Number.parseInt(
                                product.price.replace(/\D/g, "")
                              )) /
                              Number.parseInt(
                                product.originalPrice.replace(/\D/g, "")
                              )) *
                              100
                          )}
                          %
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <Button className="w-full group/btn">
                    <ShoppingCart className="mr-2 h-4 w-4 transition-transform group-hover/btn:scale-110" />
                    В корзину
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-16">
          <Button variant="outline" size="lg" className="px-8 py-3">
            Загрузить ещё продукты
          </Button>
        </div>
      </div>
    </section>
  );
}
