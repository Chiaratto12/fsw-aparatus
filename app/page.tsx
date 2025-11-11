import Image from "next/image";
import Header from "./components/header";
import SearchInput from "./components/search-input";
import banner from "../public/banner.png";
import BookingItem from "./components/booking-item";
import { prisma } from "@/lib/prisma";
import BarbershopItem from "./components/barbershop-item";
import Footer from "./components/footer";
import {
  PageContainer,
  PageSection,
  PageSectionScroller,
  PageSectionTitle,
} from "./components/ui/page";

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
      <PageContainer>
        <SearchInput />
        <Image
          src={banner}
          alt="Agende agora!"
          sizes="100vw"
          className="h-auto w-full"
        />
        <PageSection>
          <PageSectionTitle>Agendamentos</PageSectionTitle>
          <BookingItem
            serviceName="Corte de cabelo"
            barbershopName="Barbearia do João"
            barbershopImageUrl="https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png"
            date={new Date()}
          />
        </PageSection>
        <PageSection>
          <PageSectionTitle>Recomendados</PageSectionTitle>
          <PageSectionScroller>
            {recommendedBarberShops.map((barberShop) => (
              <BarbershopItem key={barberShop.id} barbershop={barberShop} />
            ))}
          </PageSectionScroller>{" "}
        </PageSection>
        <PageSection>
          <PageSectionTitle>Populares</PageSectionTitle>
          <PageSectionScroller>
            {popularBarberShops.map((barberShop) => (
              <BarbershopItem key={barberShop.id} barbershop={barberShop} />
            ))}
          </PageSectionScroller>
        </PageSection>
      </PageContainer>
      <Footer />
    </main>
  );
};

export default Home;
