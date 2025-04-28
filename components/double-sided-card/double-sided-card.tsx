"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import styles from "./double-sided-card.module.css";
import Image from "next/image";
import { Phone, Timer } from "lucide-react";
import { useRouter } from "next/navigation";
import { useService } from "@/context/service";
import { useState, useEffect } from "react";

interface Props {
  frontTitle: string;
  backTitle: string;
  frontImage: string;
  backImage: string;
  phone: string;
  service: string;
}

const DoubleSidedCard: React.FC<Props> = ({
  frontTitle,
  backTitle,
  frontImage,
  backImage,
  phone,
  service,
}) => {
  const { setService } = useService();
  const router = useRouter();
  const [isFlipped, setIsFlipped] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth <= 768);
    }
  }, []);

  const handleCardClick = () => {
    if (isMobile) {
      setIsFlipped(true); // Tap card → flip to back
    }
  };

  const handleCardContentClick = (e: React.MouseEvent) => {
    if (isMobile) {
      e.stopPropagation(); // Prevent also triggering card flip
      setIsFlipped(false); // Tap inside CardContent → flip back
    }
  };

  return (
    <div
      className={`${styles.card} ${isFlipped ? styles.flipped : ""}`}
      onClick={handleCardClick}
    >
      <div className={styles["card-inner"]}>
        <div className={styles["card-front"]}>
          <Card className="bg-pink-200 opacity-80 w-56">
            <CardHeader>
              <CardTitle>{frontTitle}</CardTitle>
            </CardHeader>
            <CardContent className="relative" onClick={handleCardContentClick}>
              <Image
                src={frontImage}
                alt="front image"
                sizes="100vw"
                width={0}
                height={0}
                className="object-cover w-full h-auto"
              />
            </CardContent>
          </Card>
        </div>
        <div className={styles["card-back"]}>
          <Card className="bg-pink-200 opacity-80 w-56">
            <CardHeader>
              <CardTitle className="text-xl cursor-text">{backTitle}</CardTitle>
              <CardDescription className="text-lg text-amber cursor-text flex flex-col items-center gap-2">
                <div className="flex flex-row w-full hover:text-white">
                  <Phone size={20} color="#802200" />
                  <a href={`tel:${phone.replace(/\s/g, "")}`}>{phone}</a>
                </div>
                <div
                  className="flex flex-row w-full cursor-pointer hover:text-white"
                  onClick={(e) => {
                    e.stopPropagation(); // Don't flip when clicking reserve button
                    setService(service);
                    router.push("/booking");
                  }}
                >
                  <Timer color="#802200" /> Резервирай
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent onClick={handleCardContentClick}>
              <Image
                src={backImage}
                alt="back image"
                sizes="100vw"
                width={0}
                height={0}
                className="object-cover w-full h-auto"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DoubleSidedCard;
