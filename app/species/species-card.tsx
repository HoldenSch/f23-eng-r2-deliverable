// Import necessary types and components.
import type { Database } from "@/lib/schema";
import Image from "next/image";
import LearnMoreDialog from "./learn-more-dialog";

// Define the SpeciesCard component that displays information about a species.
export default function SpeciesCard({
  species,
  userID,
}: {
  species: Database["public"]["Tables"]["species"]["Row"];
  userID: string;
}) {
  return (
    <div className="min-w-72 m-4 w-72 flex-none rounded border-2 p-3 shadow">
      {/* Display the species image if available */}
      {species.image && (
        <div className="relative h-40 w-full">
          <Image
            className="rounded-sm"
            src={species.image}
            alt={species.scientific_name}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
      )}
      {/* Display the common name of the species */}
      <h3 className="mt-3 text-2xl font-semibold">{species.common_name}</h3>
      {/* Display the scientific name of the species in italic */}
      <h4 className="text-lg font-light italic">{species.scientific_name}</h4>
      {/* Display a short description of the species (up to 150 characters) */}
      <p>{species.description ? species.description.slice(0, 150).trim() + "..." : ""}</p>
      {/* Render a "Learn More" dialog for detailed species information */}
      <LearnMoreDialog key={species.id} userID={userID} species={species}></LearnMoreDialog>
    </div>
  );
}
