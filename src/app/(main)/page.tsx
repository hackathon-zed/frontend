import AddProduct from "@/components/product-add/new_product";
import Arts from "@/components/shared/Arts";
import Header from "@/components/shared/Header";
import Hero from "@/components/shared/Hero";

export default function Home() {
  return (
    <div className="space-y-12">
      <Hero backgroundImage="/hero.png" />
      <Header />
      <Arts />
      <AddProduct />
    </div>
  );
}
