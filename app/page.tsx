"use client";

import DoubleSidedCard from "@/components/double-sided-card/double-sided-card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Services } from "@/types/service";

const contacts = [
  {
    frontTitle: "Апаратни процедури за тяло и солариум",
    service: Services.Solarium,
    backTitle: "Рени Папазова",
    frontImage: "/aparat.jpeg",
    backImage: "/reni.jpeg",
    phone: "0877 71 70 06",
  },
  {
    frontTitle: "Масаж и Терапия",
    service: Services.Massage,
    backTitle: "Симеон Иванов",
    frontImage: "/masaj.jpg",
    backImage: "/reni.jpeg",
    phone: "0877 09 75 79",
  },
  {
    frontTitle: "Маникюр и Педикюр",
    service: Services.Manicure,
    backTitle: "Добринка Симова",
    frontImage: "/pedikur.jpg",
    backImage: "/reni.jpeg",
    phone: "0879 27 22 07",
  },
];

export default function Home() {
  return (
    <div className="relative w-full">
      {/* Background Section with Fixed Background */}
      <div className="w-full h-dvh bg-[url('/studio-inner.jpg')] bg-cover bg-center bg-fixed">
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Content that scrolls over the fixed background */}
        <div className="relative hidden z-10 md:flex items-center justify-center h-dvh">
          {contacts.map((item, index) => (
            <DoubleSidedCard
              key={index}
              frontTitle={item.frontTitle}
              backTitle={item.backTitle}
              frontImage={item.frontImage}
              backImage={item.backImage}
              phone={item.phone}
              service={item.service}
            />
          ))}
        </div>

        <div className="md:hidden flex h-dvh items-center justify-center">
          <ScrollArea className="w-full whitespace-wrap rounded-md border border-pink-200">
            <div className="flex w-max space-x-4 p-4">
              {contacts.map((item, index) => (
                <DoubleSidedCard
                  key={index}
                  frontTitle={item.frontTitle}
                  backTitle={item.backTitle}
                  frontImage={item.frontImage}
                  backImage={item.backImage}
                  phone={item.phone}
                  service={item.service}
                />
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
