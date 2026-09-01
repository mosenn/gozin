"use client";

import { Toaster } from "sonner";


export default function Providers({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            {children}
            <Toaster
                position="top-right"
                richColors
                closeButton
            />
        </div>
    );
}