import PricingCardComponent from "@/components/price-component"

export const metadata = {
  title: "Pricing",
}

export default function PricingPage({ searchParams }) {
  return (
    <section className="container flex flex-col  gap-6 py-8 md:max-w-[64rem] md:py-12 lg:py-24">
      <PricingCardComponent intent={searchParams.intent} />
      <div className="mx-auto flex w-full max-w-[58rem] flex-col gap-4">
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:leading-7">
          გაითვალისწინეთ რომ თანხის დაბრუნება შესაძლებელია <strong> შეძენიდან მხოლოდ 1 კვირის განმავლობაში</strong>  და მხოლოდ <strong> პირადი მენტორის</strong> ან <strong>PRO - ს</strong> შეძენის შემთხვევაში.{" "}
          <br />
          <br />
          თანხა არ ბრუნდება <strong>საერთო სამენტოროს</strong> ან <strong> Kids - ის</strong> მომსახურებების შეძენისას.
          <br />
          <br />
          თუ შეიძენთ რომელიმე სერვისს, მაშინ ავტომატურად ეთანხმებით ამ წესებს.
        </p>
      </div>
    </section>
  )
}


