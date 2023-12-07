"use client"

import React, { useEffect } from "react"
import { MdxCard } from './mdx-card';

const ExerciseCard = ({ exerciseId, children }) => {
    return (
        <MdxCard>
            {children}
            <div className="space-y-2 [&>h3]:!mt-0 [&>h4]:!mt-0 [&>p]:text-muted-foreground">
                <p>დავალების შესამოწმებლად:</p>
                <pre className="m-auto flex h-auto overflow-x-auto border-2 border-gray-800 bg-black p-3 lg:m-auto">
                    <code className="block whitespace-nowrap font-normal text-white">check50 bitcamp50/problems/2023/python/{exerciseId}</code>
                </pre>
            </div>
            <div className="space-y-2 [&>h3]:!mt-0 [&>h4]:!mt-0 [&>p]:text-muted-foreground">
                <p>დავალების დადასტურება (submit):</p>
                <pre className="m-auto flex h-auto overflow-x-auto border-2 border-gray-800 bg-black p-3 lg:m-auto">
                    <code className="block whitespace-nowrap font-normal text-white">submit50 bitcamp50/problems/2023/python/{exerciseId}</code>
                </pre>
            </div>
        </MdxCard>
    );
};

export default ExerciseCard;
