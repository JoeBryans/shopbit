"use client";
import React from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";


export const AddInfo = ({ additionalInfo, setAdditionalInfo }) => {
    console.log("additionalInfo :", additionalInfo);
    const [fields, setFields] = React.useState([{ title: "", value: "" }]);
    const handleChange = (index, field, value) => {
        console.log("value :", value);

        const newFields = [...fields];
        newFields[index][field] = value;
        setAdditionalInfo(newFields);
        console.log("newFields :", newFields);


    };
    const AddField = () => {
        setFields([...fields, { title: "", value: "" }]);
    };
    const RemoveField = (index) => {
        const newFields = fields.filter((_, i) => i !== index);
        setAdditionalInfo(newFields);
        setFields(newFields);
        console.log("newFields after delete :", newFields);


    };
    return (
        <Dialog>
            <DialogTrigger asChild>
                <span className="border px-3 py-1.5 cursor-pointer rounded-lg bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50">
                    Additional Info
                </span>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="opacity-80">
                        <div className="flex justify-between items-center mt-5">
                            <span>                            Additional Infomations
                            </span>
                            <Button
                                type="button"
                                variant={"primary"}
                                className="cursor-pointer w-max "
                                onClick={AddField}
                            >
                                Add
                            </Button>
                        </div>
                    </DialogTitle>
                </DialogHeader>

                <div className="flex w-full flex-wrap items-center gap-4  ">
                    {
                        fields.map((item, index) => {
                            return (
                                <div className="flex w-full  items-center gap-4  z-40">
                                    <div className=" max-w-md w-full space-y-2 mx-auto">
                                        <Label>Title</Label>
                                        <Input placeholder="Title"
                                            name="title"
                                            value={item.title}
                                            onChange={(e) => handleChange(index, "title", e.target.value)}
                                        />
                                    </div>
                                    <div className=" max-w-md w-full space-y-2 mx-auto">
                                        <Label>Value</Label>
                                        <Input placeholder="value"
                                            name="value"
                                            value={item.value}
                                            onChange={(e) => handleChange(index, "value", e.target.value)}
                                        />
                                    </div>
                                    <X className="cursor-pointer" onClick={() => RemoveField(index)} />
                                </div>
                            )
                        })
                    }


                </div>

            </DialogContent>
        </Dialog>
    );
};
export const Sizes = ({ size, setSize }) => {
    console.log("size :", size);

    const [fields, setFields] = React.useState([{ value: "" }]);
    const handleChange = (index, field, value) => {

        const newFields = [...fields];
        newFields[index][field] = value;
        setSize(newFields);
        console.log("newFields :", newFields);


    };
    const AddField = () => {
        setFields([...fields, { value: "" }]);
    };
    const RemoveField = (index) => {
        const newFields = fields.filter((_, i) => i !== index);
        setSize(newFields);
        setFields(newFields);
        console.log("newFields after delete :", newFields);


    };
    return (
        <Dialog>
            <DialogTrigger asChild>
                <span className="border px-3 py-1.5 cursor-pointer rounded-lg bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50">
                    Sizes
                </span>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="opacity-80">
                        <div className="flex justify-between items-center mt-5">
                            <span>                           Sizes
                            </span>
                            <Button
                                type="button"
                                variant={"primary"}
                                className="cursor-pointer w-max "
                                onClick={AddField}
                            >
                                Add
                            </Button>
                        </div>
                    </DialogTitle>
                </DialogHeader>

                <div className="flex w-full flex-wrap items-center gap-4  ">
                    {
                        fields.map((item, index) => {
                            return (
                                <div className="flex w-full  items-center gap-4  z-40">

                                    <div className=" max-w-md w-full space-y-2 mx-auto">
                                        <Label>size</Label>
                                        <Input placeholder="value"
                                            name="value"
                                            value={item.value}
                                            onChange={(e) => handleChange(index, "value", e.target.value)}
                                        />
                                    </div>
                                    <X className="cursor-pointer" onClick={() => RemoveField(index)} />
                                </div>
                            )
                        })
                    }


                </div>

            </DialogContent>
        </Dialog>
    );
};

