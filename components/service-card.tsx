import {
    ChevronDownIcon,
    CircleIcon,
    DoubleArrowRightIcon,
    PlusIcon,
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


export function ServiceCard({ cardTitle, cardDescription, payments, service, program, status, triggerEnrollment, triggerCancel, enrollmentId }) {
    console.log("enrollmentId - ServiceCard", enrollmentId)
    return cardTitle && (<Card>
        <CardHeader className="grid grid-cols-[1fr_110px] items-start gap-4 space-y-0">
            <div className="space-y-1">
                <CardTitle>{service.title}</CardTitle>
                <CardDescription>
                    {service.price} ₾
                </CardDescription>
            </div>
            <div className="flex flex-col items-center">
                {(status === "Pending" ) && (
                        <Button 
                            variant="default" 
                            className="my-2"
                            onClick={triggerEnrollment}>გადახდა</Button>
                )}
                {(status === "Pending" || status === "Active") && (
                     <Button 
                        variant="destructive" 
                        className="my-2"
                        onClick={() => triggerCancel(enrollmentId)}>გაუქმება</Button>
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
                        სწვალა იწყება 22 იანვარს. <br />
                        გამოყენების ინსტრუქცია დაემატება 22 იანვარს, ამ გვერდზე. <br /><br />
                        დამატებითი კითხვებისთვის მიმართეთ BitCamp - ის Facebook გვერდს:
                        <Link href="https://www.facebook.com/bitcamp.ge" target="_blank">
                            https://www.facebook.com/bitcamp.ge
                        </Link>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </CardContent>
    </Card>
    )
}