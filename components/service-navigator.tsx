"use client"
import * as React from "react"
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
import { RocketIcon } from "lucide-react"
import { intentItems } from "@/config/site"
import { IntentItem } from "@/types"
import { getServiceByMachineName } from "@/lib/services"
import Link from "next/link"
import { Button } from "./ui/button"
import { useSession } from "next-auth/react"
import IntentNavigator from "./intent-navigator"
import { ServiceCard } from "./service-card"
import { useState, useEffect } from "react"

type Enrollment = {
    id: number;
    user_id: number;
    service_id: number;
    program_id: number;
    mentor_id: number;
    status: string;
    service: any;
    program: any;
    payments: any;
}

export default function ServiceNavigator() {
    const user = useSession().data?.user;
    const [enrollments, setEnrollments] = useState<Enrollment[]>([]);

    useEffect(() => {
        if (user) {
            fetchEnrollments(user).then((enrollments) => {
                setEnrollments(enrollments);
            });
        }
    }, [user]);

    const fetchEnrollments = async (user) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/enrollments`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${user.accessToken}`
            }
        });
        const enrollments = await res.json();

        console.log(enrollments);

        return enrollments;
    }

    const triggerEnrollment = async (payload, openPaymentUrl = false) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/enroll`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${user?.accessToken}`
            },
            body: JSON.stringify(payload)
        });

        const enrollments = await fetchEnrollments(user);
        setEnrollments(enrollments);


        const firstEnrollment = enrollments[0];

        if (openPaymentUrl) {
            const paymentUrl = firstEnrollment.payments[0].paymentUrl;
            window.open(paymentUrl, "_blank");
        }
    }

    console.log("enrollments", enrollments.length === 0)


    return (<div>
        <section className="space-y-6 bg-slate-50 dark:bg-transparent ">
            {enrollments.length === 0 && (
                <IntentNavigator triggerEnrollment={triggerEnrollment} />
            )}
            {enrollments.length > 0 && (
                <div className="space-y-4">
                    <h3 className="text-xl font-semibold">შეძენილი სერვისები</h3>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {enrollments.map((enrollment) => {
                            return (
                                <ServiceCard
                                    key={enrollment.id}
                                    cardTitle={enrollment.service_id}
                                    cardDescription={enrollment.program_id}
                                    payments={enrollment.payments}
                                    service={enrollment.service}
                                    program={enrollment.program}
                                    status={enrollment.status}
                                />)
                        })}
                    </div>
                </div>
            )}
            
        </section>
    </div>)


}