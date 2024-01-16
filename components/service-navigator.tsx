"use client"
import * as React from "react"
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
import { RocketIcon, ZapIcon } from "lucide-react"
import { intentItems } from "@/config/site"
import { IntentItem } from "@/types"
import { getServiceByMachineName } from "@/lib/services"
import Link from "next/link"
import { useSession } from "next-auth/react"
import IntentNavigator from "./intent-navigator"
import { ServiceCard } from "./service-card"
import { useState, useEffect } from "react"
import { set } from "date-fns"

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
    const [intent, setIntent] = useState<IntentItem>(intentItems.none);
    const [fetching, setFetching] = useState<any>(false);



    // I need to find Enrollments with status "Active" and set this to true
    const activeEnrollment = enrollments.find((enrollment) => {
        return enrollment.status === "Active";
    })
    const pendingEnrollment = enrollments.find((enrollment) => {
        return enrollment.status === "Pending";
    })

    console.log(enrollments);

    useEffect(() => {
        if (user) {
            const currentIntent = localStorage.getItem("intent");
            if (currentIntent) {
                setIntent(intentItems[currentIntent]);
            }

            fetchEnrollments(user).then((enrollments) => {
                // filter out Cancelled enrollments
                const enrollmentsWithoutCanceled = enrollments.filter((enrollment) => {
                    return enrollment.status !== "Cancelled";
                })
                setEnrollments(enrollmentsWithoutCanceled);
            });
        }
    }, [user]);

    const payload = {
        service_id: intent.program_id,
        program_id: intent.service_id,
        mentor_id: intent.mentor_id,
        status: intent.status,
    }

    const fetchEnrollments = async (user) => {
        setFetching(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/enrollments`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${user.accessToken}`
            }
        });
        const enrollments = await res.json();
        setFetching(false);
        return enrollments;
    }

    const triggerEnrollment = async (openPaymentUrl = false) => {
        console.log("Triggered");
        setFetching(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/enroll`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${user?.accessToken}`
            },
            body: JSON.stringify(payload)
        });

        const enrollments = await fetchEnrollments(user);
        const enrollmentsWithoutCanceled = enrollments.filter((enrollment) => {
            return enrollment.status !== "Cancelled";
        })
        setEnrollments(enrollmentsWithoutCanceled);

        console.log("enrollmentsWithoutCanceled", enrollmentsWithoutCanceled);

        const firstEnrollment = enrollmentsWithoutCanceled[0];

        if (openPaymentUrl) {
            const paymentUrl = firstEnrollment.payments[0].paymentUrl;
            window.open(paymentUrl, "_blank");
        }

        setFetching(false);
        return firstEnrollment;
    }

    const triggerCancel = async (id) => {
        console.log("Triggered - Cancel", id);
        setFetching(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/enrollments/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${user?.accessToken}`
            },
            body: JSON.stringify({ status: "Cancelled" })
        });

        const enrollments = await fetchEnrollments(user);
        const enrollmentsWithoutCanceled = enrollments.filter((enrollment) => {
            return enrollment.status !== "Cancelled";
        })
        setEnrollments(enrollmentsWithoutCanceled);

        console.log("enrollmentsWithoutCanceled", enrollmentsWithoutCanceled);

        setFetching(false);
        return enrollmentsWithoutCanceled;
    }

    console.log("enrollments", enrollments.length === 0)


    return (<div>
        <section className="space-y-6 bg-slate-50 dark:bg-transparent ">
            {!(activeEnrollment || pendingEnrollment) && (
                <>
                    <IntentNavigator triggerEnrollment={triggerEnrollment} payload={payload} />
                    <Alert variant="destructive">
                        <ZapIcon className="h-4 w-4" />
                        <AlertTitle>ყურადღება!</AlertTitle>
                        <AlertDescription>
                            <div className="text-white">
                                <br />
                                თუ გსურთ სხვა სერვისის შერჩევა, დააკლიკეთ &quot;შერჩევის&quot; ღილაკს ქვემოთ მოცემულ სასურველ სერვისზე.
                                <br />
                            </div>
                        </AlertDescription>
                    </Alert>
                </>
            )}
            {enrollments.length > 0 && (
                <div className="space-y-4">
                    <h3 className="text-xl font-semibold">შეძენილი სერვისები</h3>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {enrollments.map((enrollment) => {
                            console.log("enrollment.id", enrollment.id)
                            return (
                                <ServiceCard
                                    key={enrollment.id}
                                    enrollmentId={enrollment.id}
                                    cardTitle={enrollment.service_id}
                                    cardDescription={enrollment.program_id}
                                    payments={enrollment.payments}
                                    service={enrollment.service}
                                    program={enrollment.program}
                                    status={enrollment.status}
                                    triggerEnrollment={triggerEnrollment}
                                    triggerCancel={triggerCancel}
                                />)
                        })}
                    </div>

                    <Alert variant="destructive">
                        <ZapIcon className="h-4 w-4" />
                        <AlertTitle>ყურადღება!</AlertTitle>
                        <AlertDescription>
                            <div className="text-white">
                                <br />
                                თუ გსურთ სხვა სერვისის არჩევა, ჯერ გააუქმეთ უკვე არჩეული &quot;გაუქმების&quot; ღილაკზე დაკლიკებით.
                                <br />
                            </div>
                        </AlertDescription>
                    </Alert>

                </div>
            )}

        </section>
    </div>)


}