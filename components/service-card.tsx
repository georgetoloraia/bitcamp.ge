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
  

export function ServiceCard({ cardTitle, cardDescription }) {
    return (
        <Card>
            <CardHeader className="grid grid-cols-[1fr_110px] items-start gap-4 space-y-0">
                <div className="space-y-1">
                    <CardTitle>{cardTitle}</CardTitle>
                    <CardDescription>
                        {cardDescription}
                    </CardDescription>
                </div>
                <div className="flex items-center">
                    <Button variant="destructive">გაუქმება</Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                        <CircleIcon className="mr-1 h-3 w-3 fill-sky-400 text-green-400" />
                        სტატუსი: აქტიური
                    </div>
                    <div className="flex items-center">
                        <DoubleArrowRightIcon className="mr-1 h-3 w-3 fill-sky-400 text-sky-400" />
                        შემდეგი გადახდის თარიღი: 12.12.2021
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
                        უფასო კურსებს იპოვით ამ გვერდზე: <Link href="https://www.bitcamp.ge/classes" className="underline">https://www.bitcamp.ge/classes</Link>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
            </CardContent>
        </Card>
    )
}