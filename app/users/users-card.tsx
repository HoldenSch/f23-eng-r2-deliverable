import type { Database } from "@/lib/schema";

type Users = Database["public"]["Tables"]["profiles"]["Row"];

export default function SpeciesCard(users: Users) {
  return (
    <div className="m-4 w-1/4 flex-none rounded border-2 p-3 shadow">
      <h1 className="mt-1 overflow-hidden text-xl font-semibold">{users.email}</h1>
      <h2 className="text-lg font-light">{users.display_name}</h2>
      <p className="whitespace-normal">{users.biography}</p>
    </div>
  );
}
