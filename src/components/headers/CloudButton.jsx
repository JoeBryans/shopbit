"use client"
import React, { useState } from 'react';
import { CldUploadButton } from 'next-cloudinary';
import { CldUploadWidget } from 'next-cloudinary';
import { Button } from '../ui/button';

const CloudUploadButton = ({ uploadFiles, setUploadFiles }) => {


    console.log("uploadFiles :", uploadFiles);

    //    for (const files of resource) {
    //        setUploadFiles({ ...uploadFiles, url: files?.url, id: files?.public_id });

    //    }

    return <div className='mt-10 w-full flex items-center gap-2 border-2 border-dashed border-slate-400 rounded-lg p-4 hover:border-slate-600 hover:bg-slate-100 hover:text-slate-600'>
        <CldUploadWidget
            uploadPreset="bryan-mall"
            maxFilesoptions={{
                // sources: ['local', 'url', 'unsplash'],
                multiple: true,
                maxFiles: 5
            }}
            // accept="image/*"
            onSuccess={(result, { widget }) => {
                if (result.event === "success") {
                    const info = result.info;
                    setUploadFiles((prev) => [...prev, {url: info.secure_url, id: info.public_id}] );
                }
            }}

            onBatchUploadSuccess={(results, { widget }) => {
                // setIsUploading(false); // End uploading state
                // Extract secure URLs from the batch results
                const successfulUrls = results.map((r) => r.info.secure_url);
                console.log("successfulUrls :", successfulUrls);

                // Pass the full results to the parent component
                // setUploadFiles((prev) => [...prev, ...successfulUrls]);
                onUploadSuccess(
                    results.map((r) => ({
                        secure_url: r.info.secure_url,
                        public_id: r.info.public_id,
                    }))
                );
                widget.close(); // Close the widget after the batch is complete
            }}
            // Callback for any errors during upload
            onError={(error, { widget }) => {
                console.error("Upload Error:", error);
                setIsUploading(false); // End uploading state on error
                onUploadError(error);
                widget.close(); // Close the widget on error
            }}
        // onQueuesEnd={(result, { widget }) => {
        //     // widget.close();
        // }}
        >
            {({ open }) => {
                function handleOnClick() {
                    // setUploadFiles(undefined);
                    open();
                }
                return (
                    <div onClick={handleOnClick}
                        className={"w-full mx-auto flex flex-col items-center"}
                    >
                        <span className="text-sm">Upload Image</span>
                        <p className="text-xs">Your are to upload maximum 10 images</p>                    </div>
                );
            }}
        </CldUploadWidget>
    </div>
}
export default CloudUploadButton