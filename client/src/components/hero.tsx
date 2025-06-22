"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles, Play } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden video-container">
      {/* Видео фон - замените src на ваше видео */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        poster="/video-poster.jpg"
      >
        <source src="/xlarge.mp4" type="video/mp4" />
        {/* Fallback для браузеров без поддержки видео */}
        <div className="absolute inset-0 bg-black" />
      </video>

      {/* Overlay для затемнения видео */}
      <div className="video-overlay" />

      {/* Контент поверх видео */}
      <div className="content-over-video container mx-auto px-4 py-24 text-center">
        <div className="space-y-8 max-w-4xl mx-auto">
          {/* Анимированный бейдж */}
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20 animate-float">
            <Sparkles className="h-5 w-5 text-white" />
            <span className="text-sm font-medium text-white">Новинка 2024</span>
            <Badge
              variant="secondary"
              className="bg-white text-black border-0 px-3 py-1"
            >
              iPhone 15 Pro Max
            </Badge>
          </div>

          {/* Главный заголовок */}
          <div className="space-y-6">
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold text-white leading-tight">
              Будущее в ваших
              <span className="block text-gray-300 animate-float-delayed">
                руках
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
              Откройте для себя новейшие технологии Apple. Революционные
              устройства, которые изменят ваш мир.
            </p>
          </div>

          {/* Кнопки действий */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-float-delayed-2">
            <Button
              size="lg"
              className="bg-white text-black hover:bg-gray-100 group px-8 py-4 text-lg font-semibold"
            >
              Смотреть новинки
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg backdrop-blur-sm"
            >
              <Play className="mr-2 h-5 w-5" />
              Смотреть презентацию
            </Button>
          </div>

          {/* Статистика */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16 pt-8 border-t border-white/20">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-white mb-2">
                2.5M+
              </div>
              <div className="text-gray-300">Довольных клиентов</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-white mb-2">
                500+
              </div>
              <div className="text-gray-300">Продуктов в наличии</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-white mb-2">
                24/7
              </div>
              <div className="text-gray-300">Поддержка клиентов</div>
            </div>
          </div>
        </div>

        {/* Floating элементы */}
        <div className="absolute top-20 left-10 w-24 h-24 bg-white/10 rounded-full blur-xl animate-float" />
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-float-delayed" />
        <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-white/10 rounded-full blur-xl animate-float-delayed-2" />
        <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-white/10 rounded-full blur-xl animate-float" />
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 content-over-video">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
