import PricingCardComponent from "@/components/price-component"

export const metadata = {
  title: "ისწავლე პროგრამირება",
}

export default function PricingPage({ searchParams }) {
  return (
    <section className="container flex flex-col  gap-6 py-8 md:max-w-[64rem] md:py-12 lg:py-24">
      <PricingCardComponent intent={searchParams.intent} />
      <div className="mx-auto flex w-full max-w-[58rem] flex-col gap-4">
        <h4>თანხის დაბრუნების პოლიტიკა</h4>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:leading-7">
          <ul>
            <li>50 ლარიან სერვისებზე თანხის დაბრუნება არ ხდება</li>
            <li>200 ლარიან სერვისზე თანხის დაბრუნება შესაძლებელია შეძენიდან მხოლოდ 1 კვირის განმავლობაში.</li>
          </ul>
          <br />
          
          თუ შეიძენთ რომელიმე სერვისს, მაშინ ავტომატურად ეთანხმებით ამ წესებს.
        </p>
      </div>
    </section>
  )
}


