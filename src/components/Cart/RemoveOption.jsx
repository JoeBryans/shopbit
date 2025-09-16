import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { RemoveButton } from "./cartButton";

export default function RemoveOption({ CartItems }) {
  console.log("remove", CartItems);

  return (
    <Dialog>
      <DialogTrigger>
        <span className="py-1 px-1.5 text-white rounded-lg  bg-orange-600  hover:bg-white cursor-pointer hover:text-orange-600 hover:border-orange-600  hover:border-2 font-semibold transition:all w-max  ">
          Remove
        </span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="opacity-80">
            Are your sure of removing the product from cart
          </DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <span>
            Click on the save button to save the item in your favourite or click
            the remove button to remove the product from your cart
          </span>
        </DialogDescription>

        <DialogFooter  >
          <DialogClose asChild>
            <div className="flex items-center w-full   justify-between ">
              <RemoveButton items={CartItems} />
              <Button
                size={"sm"}
                variant={"outline"}
                className=" font-semibold cursor-pointer w-max  "
              >
                Save
              </Button>
            </div></DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
