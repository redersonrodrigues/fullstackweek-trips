import TripItem from "@/components/TripItem";
import { prisma } from "@/lib/prisma";
import { Trip } from "@prisma/client";
import React from "react";

async function getTrips() {
  // Evita quebrar em dev quando não há DATABASE_URL configurada
  if (!process.env.DATABASE_URL) {
    console.warn("DATABASE_URL não configurada. Renderizando sem destinos recomendados.");
    return [] as Trip[];
  }

  try {
    const trips = await prisma.trip.findMany({});
    return trips;
  } catch (err) {
    console.error("Falha ao buscar trips:", err);
    return [] as Trip[];
  }
}

const RecommendedTrips = async () => {
  const data = await getTrips();

  return (
    <div className="container mx-auto p-5">
      <div className="flex items-center">
        <div className="w-full h-[1px] bg-grayLighter"></div>
        <h2 className="px-5 font-medium text-grayPrimary whitespace-nowrap">Destinos Recomendados</h2>
        <div className="w-full h-[1px] bg-grayLighter"></div>
      </div>

      <div className="flex flex-col items-center mt-5 lg:mt-12 gap-5 lg:flex-row gap lg:flex-wrap lg:justify-center lg:gap-10">
        {data.length === 0 ? (
          <p className="text-grayPrimary">Nenhuma viagem para exibir no momento.</p>
        ) : (
          data.map((trip: Trip) => <TripItem key={trip.id} trip={trip} />)
        )}
      </div>
    </div>
  );
};

export default RecommendedTrips;
