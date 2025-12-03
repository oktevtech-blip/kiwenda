"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getServices, whyChooseUs, getTestimonials } from "@/lib/constants";
import * as Icons from "lucide-react";
import { LucideIcon } from "lucide-react";

// Backend base URL
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Home() {
  const [heroImage, setHeroImage] = useState<string | null>(null);
  const [services, setServices] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);

  // Fetch hero image
  const loadHeroImage = async () => {
    try {
      const res = await fetch("https://kiwendaserver.onrender.com/hero", {
        cache: "no-store",
      });
      const data = await res.json();
      setHeroImage(data.image || null);
    } catch (error) {
      console.error("Error fetching hero image:", error);
      setHeroImage(null);
    }
  };

  // Fetch services and testimonials
  const loadData = async () => {
    const [servicesData, testimonialsData] = await Promise.all([
      getServices(),
      getTestimonials(),
    ]);

    setServices(servicesData);

    const mappedTestimonials = testimonialsData.map((t: any) => ({
      name: t.patient_name,
      quote: t.message,
      imageUrl: t.photo_url ? `${API_URL}${t.photo_url}` : "/placeholder-user.jpg",
      condition: t.condition || "",
      rating: t.rating || 0,
    }));

    setTestimonials(mappedTestimonials);
  };

  useEffect(() => {
    loadHeroImage();
    loadData();
  }, []);

  return (
    <div className="flex flex-col min-h-dvh">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full h-[60vh] md:h-[80vh] flex items-center justify-center text-center text-white">
          {heroImage ? (
            <Image
              src={heroImage} // direct URL from backend
              alt="Hero background"
              fill
              className="object-cover -z-10 brightness-50"
              priority
            />
          ) : (
            <div className="absolute inset-0 bg-gray-800 -z-10 flex items-center justify-center text-white">
              <p>No hero image found</p>
            </div>
          )}

          <div className="container px-4 md:px-6 space-y-4 animate-fade-in-up">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-headline tracking-tight">
              Kiwenda Rehabilitation Centre and Clinic
            </h1>
            <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-200">
              Comprehensive health care for all ages and conditions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold"
              >
                <Link href="/contact">Book Appointment</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white hover:text-primary font-bold"
              >
                <Link href="#services">Learn More</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* About, Services, Why Choose Us, Testimonials, CTA sections remain the same */}
        {/* You can reuse the existing JSX from your original code for these sections */}
      </main>
    </div>
  );
}
