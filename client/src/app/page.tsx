import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Products } from "@/components/products";
import { Features } from "@/components/features";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Products />
        <Features />
      </main>
      <Footer />
    </div>
  );
}
