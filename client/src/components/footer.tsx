import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Facebook, Twitter, Instagram, Youtube, Mail } from "lucide-react";

export function Footer() {
  const footerSections = [
    {
      title: "Продукты",
      links: [
        { name: "iPhone", href: "/iphone" },
        { name: "iPad", href: "/ipad" },
        { name: "Mac", href: "/mac" },
        { name: "Apple Watch", href: "/watch" },
        { name: "AirPods", href: "/airpods" },
      ],
    },
    {
      title: "Поддержка",
      links: [
        { name: "Техподдержка", href: "/support" },
        { name: "Гарантия", href: "/warranty" },
        { name: "Ремонт", href: "/repair" },
        { name: "Статус заказа", href: "/order-status" },
        { name: "Возврат", href: "/returns" },
      ],
    },
    {
      title: "Компания",
      links: [
        { name: "О нас", href: "/about" },
        { name: "Карьера", href: "/careers" },
        { name: "Новости", href: "/news" },
        { name: "Инвесторы", href: "/investors" },
        { name: "Контакты", href: "/contact" },
      ],
    },
  ];

  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="font-bold text-xl">Apple Store</span>
            </div>
            <p className="text-muted-foreground max-w-md">
              Официальный магазин техники Apple в России. Широкий ассортимент,
              гарантия качества и профессиональная поддержка.
            </p>
            <div className="space-y-4">
              <h4 className="font-semibold">Подпишитесь на новости</h4>
              <div className="flex space-x-2">
                <Input placeholder="Ваш email" className="max-w-xs" />
                <Button>
                  <Mail className="h-4 w-4 mr-2" />
                  Подписаться
                </Button>
              </div>
            </div>
          </div>

          {/* Links Sections */}
          {footerSections.map((section) => (
            <div key={section.title} className="space-y-4">
              <h4 className="font-semibold">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-muted-foreground">
            © 2024 Apple Store Russia. Все права защищены.
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Youtube className="h-4 w-4" />
              </Button>
            </div>

            <Separator orientation="vertical" className="h-6" />

            <div className="flex space-x-4 text-sm">
              <Link
                href="/privacy"
                className="text-muted-foreground hover:text-foreground"
              >
                Конфиденциальность
              </Link>
              <Link
                href="/terms"
                className="text-muted-foreground hover:text-foreground"
              >
                Условия
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
