import React from 'react';
import { MdxCard } from './mdx-card';

const ExerciseCard = ({ exerciseId, children }) => {
    return (
        <MdxCard>
            {children}
            <div className="space-y-2 [&>h3]:!mt-0 [&>h4]:!mt-0 [&>p]:text-muted-foreground">
                <p>დავალების შესამოწმებლად:</p>
                <pre className="bg-black p-3 rounded-md border border-gray-700 overflow-x-auto">
                    <code className="font-normal block">check50 bitcamp50/problems/2023/python/{exerciseId}</code>
                </pre>
            </div>
            <div className="space-y-2 [&>h3]:!mt-0 [&>h4]:!mt-0 [&>p]:text-muted-foreground">
                <p>დავალების დადასტურება (submit):</p>
                <pre className="bg-black p-3 rounded-md border border-gray-700 overflow-x-auto">
                    <code className="font-normal block whitespace-nowrap">submit50 bitcamp50/problems/2023/python/{exerciseId}</code>
                </pre>
            </div>
        </MdxCard>
    );
};

export default ExerciseCard;
