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
import { Button } from "./ui/button"
import { useSession } from "next-auth/react"
import { ReloadIcon } from "@radix-ui/react-icons"

export default function IntentNavigator({ triggerEnrollment, payload }) {
    const [intent, setIntent] = React.useState<IntentItem>(intentItems.none);
    const { data: user } = useSession();
    const [fetchingEnrollment, setFetchingEnrollment] = React.useState<any>(false);

    React.useEffect(() => {
        const currentIntent = localStorage.getItem("intent");
        if (currentIntent) {
            setIntent(intentItems[currentIntent]);
        }
    }, [])

    const currentService = getServiceByMachineName(intent.machine_name);

    return (
        <>
            {currentService && intent.machine_name !== "none" && (
                <Alert>
                    <RocketIcon className="h-4 w-4" />
                    <AlertTitle>{currentService.title}</AlertTitle>
                    <AlertDescription>
                        <br />
                        {intent.description}
                        <br />
                        {intent.action === 'link' && (
                            <Link href={intent.url}>
                                <Button className="my-4" disabled={fetchingEnrollment}>
                                    {fetchingEnrollment && (
                                        <>
                                            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />  მოითმინეთ
                                        </>
                                    )}
                                    {!fetchingEnrollment && (
                                        <>
                                            {intent.actionLabel}
                                        </>
                                    )}
                                </Button>
                            </Link>
                        )}

                        {intent.action === 'buy' && (
                            <Button disabled={fetchingEnrollment} className="my-4" onClick={async () => {
                                setFetchingEnrollment(true);
                                await triggerEnrollment(true);
                                setFetchingEnrollment(false);
                                }}>
                            {fetchingEnrollment && (
                                <>
                                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />  მოითმინეთ
                                </>
                            )}
                            {!fetchingEnrollment && (
                                <>
                                    გადახდა
                                </>
                            )}
                            </Button>
                        )}
                    </AlertDescription>
                </Alert>
            )}


            {currentService && intent.machine_name === "kids" && (
                <Alert variant="destructive">
                    <ZapIcon className="h-4 w-4" />
                    <AlertTitle>ყურადღება!</AlertTitle>
                    <AlertDescription>
                        <div className="text-white">
                            <br />
                            BitCamp Kids - ის საბავშვო პროგრამაში გაკვეთლების ჩატარების სტანდარტული დრო არის საღამოს 4 საათი (16:00). ორშაბათს, ოთხშაბათს და პარასკევს.
                            <br />
                            <br />
                            თუმცა თუ ვერ მოახერხებთ ასეთ დროს გაკვეთილებზე დასწრებას, გთხოვთ მოგვწეროთ თქვენთვის სასურველი დროები ჩვენს Facebook გვერდზე და თუ საკმარისი რაოდენობის მოსწავლეები მოგროვდებიან თქვენთვის სასურველ დროს, გავხსნით ახალ ჯგუფებს 🙏
                            <br />
                            <br />

                            <Link href="https://www.facebook.com/bitcamp.ge" target="_blank">
                                <Button variant="destructive" className="my-4">
                                    Facebook გვერდი
                                </Button>
                            </Link>
                        </div>

                    </AlertDescription>
                </Alert>
            )}
        </>
    )
}   