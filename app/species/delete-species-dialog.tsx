"use client"; // Make this a client component
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
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Species = Database["public"]["Tables"]["species"]["Row"]; //Define type for Species

export default function DeleteSpecies(species: Species) {
  const router = useRouter(); // Initializing the router from Next.js.

  // Function to handle the deletion of a species.
  const submitDelete = async () => {
    // Initialize a Supabase client using the helper function.
    const supabase = createClientComponentClient<Database>();

    // Attempt to delete the species with the given ID.
    const { error } = await supabase.from("species").delete().eq("id", species.id);

    // Check for errors during deletion and display a toast message if there's an error.
    if (error) {
      return toast({
        title: "Something went wrong.",
        description: error.message,
        variant: "destructive",
      });
    }

    setIsOpen(false); // Close the dialog after successful deletion.

    // Refresh all server components in the current route to display the updated data.
    // This is done by triggering a route refresh using the router.
    router.refresh();
  };

  // State to manage the open/close state of the dialog.
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div>
      <div>
        {
          // Conditionally render the dialog based on the isOpen state.
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              {/* Button that triggers the opening of the dialog */}
              <Button variant="destructive" className="mt-0 w-full">
                Delete
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                {/* Title of the dialog */}
                <DialogTitle>Are you sure you want to delete this species?</DialogTitle>
              </DialogHeader>
              <DialogDescription>
                {/* Description of the dialog */}
                This will delete this species permanently. You will not be able to undo this action.
              </DialogDescription>
              <DialogFooter>
                <div className="flex">
                  {/* Button to cancel the deletion */}
                  <Button
                    type="button"
                    className="ml-1 mr-1 flex-auto"
                    variant="secondary"
                    onClick={() => setIsOpen(false)}
                  >
                    Cancel
                  </Button>
                  {/* Button to confirm and trigger the deletion */}
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
