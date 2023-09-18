"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import type { Database } from "@/lib/schema";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

type Species = Database["public"]["Tables"]["species"]["Row"];

export default function DeleteSpecies(species: Species) {
  const router = useRouter();
  const submitDelete = async () => {
    // The `input` prop contains data that has already been processed by zod. We can now use it in a supabase query
    const supabase = createClientComponentClient<Database>();
    const { error } = await supabase.from("species").delete().eq("id", species.id);

    if (error) {
      return toast({
        title: "Something went wrong.",
        description: error.message,
        variant: "destructive",
      });
    }
    // Reset form values to the data values that have been processed by zod.
    // This way the user sees any changes that have occurred during transformation
    setIsOpen(false);

    // Refresh all server components in the current route. This helps display the newly created species because species are fetched in a server component, species/page.tsx.
    // Refreshing that server component will display the new species from Supabase
    router.refresh();

  };

  // You can then call this function elsewhere in your code when needed, passing the species ID as an argument.
  // For example:
  // deleteSpecies(species.id);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div>
      <div>
        {
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button variant="destructive" className="mt-0 w-full">
                Delete
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Are you sure you want to delete this species?</DialogTitle>
              </DialogHeader>
              <DialogDescription>
                This will delete this species permanently. You will not be able to undo this action.
              </DialogDescription>
              <DialogFooter>
                <div className="flex">
                  <Button
                    type="button"
                    className="ml-1 mr-1 flex-auto"
                    variant="secondary"
                    onClick={() => setIsOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" variant="destructive" className="ml-1 mr-1 flex-auto" onClick={submitDelete}>
                    Delete
                  </Button>
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        }
      </div>
    </div>
  );
}
