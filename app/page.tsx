import Image from "next/image";
import Header from "./components/header";
import SearchInput from "./components/search-input";
import banner from "../public/banner.png";
import BookingItem from "./components/booking-item";
import { prisma } from "@/lib/prisma";
import BarbershopItem from "./components/barbershop-item";

const Home = async () => {
  const recommendedBarberShops = await prisma.barberShop.findMany({
    orderBy: {
      name: "asc",
    },
  });
  const popularBarberShops = await prisma.barberShop.findMany({
    orderBy: {
      name: "asc",
    },
  });
  return (
    <main>
      <Header />
      <div className="space-y-4 p-5">
        <SearchInput />
        <Image
          src={banner}
          alt="Agende agora!"
          sizes="100vw"
          className="h-auto w-full"
        />
        <h2 className="text-foreground text-xs font-semibold uppercase">
          Agendamentos
        </h2>
        <BookingItem
          serviceName="Corte de cabelo"
          barbershopName="Barbearia do João"
          barbershopImageUrl="https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png"
          date={new Date()}
        />
        <h2 className="text-foreground text-xs font-semibold uppercase">
          Recomendados
        </h2>
        <div className="[&:: -webkit-scrollbar]:hidden flex gap-4 overflow-x-auto">
          {recommendedBarberShops.map((barberShop) => (
            <BarbershopItem key={barberShop.id} barbershop={barberShop} />
          ))}
        </div>
        <h2 className="text-foreground text-xs font-semibold uppercase">
          Populares
        </h2>
        <div className="[&:: -webkit-scrollbar]:hidden flex gap-4 overflow-x-auto">
          {popularBarberShops.map((barberShop) => (
            <BarbershopItem key={barberShop.id} barbershop={barberShop} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Home;
