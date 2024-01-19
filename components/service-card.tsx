import {
    ChevronDownIcon,
    CircleIcon,
    DoubleArrowRightIcon,
    PlusIcon,
    ReloadIcon,
    StarIcon,
} from "@radix-ui/react-icons"


import { Button } from "@/registry/new-york/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/registry/new-york/ui/card"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/registry/new-york/ui/dropdown-menu"
import { Separator } from "@/registry/new-york/ui/separator"



import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import Link from "next/link"
import { useState } from "react"
import { CheckCheckIcon, RocketIcon } from "lucide-react"


export function ServiceCard({ cardTitle, cardDescription, payments, service, program, status, triggerEnrollment, triggerCancel, enrollmentId }) {
    console.log("enrollmentId - ServiceCard", enrollmentId)
    const [fetchingEnrollment, setFetchingEnrollment] = useState<any>(false);
    const [cancellingEnrollment, setCancellingEnrollment] = useState<any>(false);

    return cardTitle && (<Card>
        <CardHeader className="grid grid-cols-[1fr_110px] items-start gap-4 space-y-0">
            <div className="space-y-1">
                <CardTitle>{service.title}</CardTitle>
                <CardDescription>
                    {service.price} ₾
                </CardDescription>
            </div>
            <div className="flex flex-col items-center">
                {(status === "Pending") && (
                    <Button
                        variant="default"
                        className="my-2"
                        disabled={fetchingEnrollment}
                        onClick={async () => {
                            setFetchingEnrollment(true);
                            await triggerEnrollment(enrollmentId);
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
                {(status === "Pending" || status === "Active") && (
                    <Button
                        variant="destructive"
                        className="my-2"
                        disabled={cancellingEnrollment}
                        onClick={async () => {
                            setCancellingEnrollment(true);
                            await triggerCancel(enrollmentId);
                            setCancellingEnrollment(false);
                        }}>

                        {cancellingEnrollment && (
                            <>
                                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />  მოითმინეთ
                            </>
                        )}
                        {!cancellingEnrollment && (
                            <>
                                გაუქმება
                            </>
                        )}


                    </Button>
                )}
            </div>
        </CardHeader>
        <CardContent>
            <div className="flex flex-col text-sm text-muted-foreground">
                {status === "Pending" && (
                    <div className="flex items-center">
                        <CircleIcon className="mr-1 h-3 w-3 text-yellow-400" />
                        სტატუსი: გადასახდელი
                    </div>
                )}

                {status === "Active" && (
                    <div className="flex items-center">
                        <CircleIcon className="mr-1 h-3 w-3 text-green-400" />
                        სტატუსი: გადახდილი / აქტიური
                    </div>
                )}


                {status === "Cancelled" && (
                    <div className="flex items-center">
                        <CircleIcon className="mr-1 h-3 w-3 text-red-400" />
                        სტატუსი: გაუქმებული
                    </div>
                )}

                <div className="flex items-center">
                    <DoubleArrowRightIcon className="mr-1 h-3 w-3 fill-sky-400 text-sky-400" />
                    სერვისი: {service.title}
                </div>
                <div className="flex items-center">
                    <DoubleArrowRightIcon className="mr-1 h-3 w-3 fill-sky-400 text-sky-400" />
                    პროგრამა: {program.title}
                </div>
            </div>
        </CardContent>

        <CardContent>
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger>
                        გამოყენების ინსტრუქცია
                    </AccordionTrigger>
                    <AccordionContent>
                        {status === "Pending" && (
                            <>
                                გამოყენების ინსტრუქცია გამოჩნდება გადახდის შემდეგ.
                                <br /><br />
                                დამატებითი კითხვებისთვის მიმართეთ BitCamp - ის Facebook გვერდს:
                                <Link href="https://www.facebook.com/bitcamp.ge" target="_blank">
                                    https://www.facebook.com/bitcamp.ge
                                </Link>
                            </>
                        )}

                        {(status === "Active" && program.title === "BitCamp Kids") && (
                            <div className="flex items-center">

                                <Link href={"https://discord.gg/nUdZhhgUeG"} target="_blank">
                                    <Button variant="default">
                                        <RocketIcon className="strong mr-1 h-3 w-3 text-green-400" />
                                        შემოგვიერდით Discord - ის სასწავლო სივრცეში
                                    </Button>
                                </Link>
                            </div>
                        )}

                        {(status === "Active" && program.title === "პირადი მენტორის აყვანა") && (
                            <div className="flex items-center">

                                <Link href={"https://discord.gg/wx5cVHmrU6"} target="_blank">
                                    <Button variant="default">
                                        <RocketIcon className="strong mr-1 h-3 w-3 text-green-400" />
                                        შემოგვიერდით Discord - ის სასწავლო სივრცეში
                                    </Button>
                                </Link>
                            </div>
                        )}

                        {(status === "Active" && program.title === "საერთო სამენტორო მომსახურება") && (
                            <div className="flex items-center">

                                <Link href={"https://discord.gg/wx5cVHmrU6"} target="_blank">
                                    <Button variant="default">
                                        <RocketIcon className="strong mr-1 h-3 w-3 text-green-400" />
                                        შემოგვიერდით Discord - ის სასწავლო სივრცეში
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </CardContent>
    </Card>
    )
}