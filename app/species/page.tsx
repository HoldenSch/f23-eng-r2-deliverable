// Import necessary components and libraries.
import { Separator } from "@/components/ui/separator";
import { TypographyH2 } from "@/components/ui/typography";
import { createServerSupabaseClient } from "@/lib/server-utils";
import { redirect } from "next/navigation";
import AddSpeciesDialog from "./add-species-dialog";
import SpeciesCard from "./species-card";

// Define an asynchronous function called SpeciesList.
export default async function SpeciesList() {
  // Create a Supabase server component client and obtain the user session from a stored cookie.
  const supabase = createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    // Redirect to the home page if there is no user session.
    redirect("/");
  }

  // Fetch species data from the "species" table, order it by ID.
  const { data: species } = await supabase.from("species").select("*").order("id");

  return (
    <>
      {/* Display a header with "Species List" and an "Add Species" button */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
        <TypographyH2>Species List</TypographyH2>
        <AddSpeciesDialog key={new Date().getTime()} userId={session.user.id} />
      </div>
      {/* Display a separator */}
      <Separator className="my-4" />
      {/* Display a list of species cards */}
      <div className="flex flex-wrap justify-center">
        {species?.map((species) => <SpeciesCard key={species.id} userID={session.user.id} species={species} />)}
      </div>
    </>
  );
}
