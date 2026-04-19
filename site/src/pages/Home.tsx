import { Hero } from '../sections/Hero'
import { Ladder } from '../sections/Ladder'
import { Cases } from '../sections/Cases'
import { Matrix } from '../sections/Matrix'
import { MoreCapabilities } from '../sections/MoreCapabilities'
import { Pricing } from '../sections/Pricing'
import { Process } from '../sections/Process'
import { About } from '../sections/About'
import { Footer } from '../sections/Footer'

export function Home() {
  return (
    <main className="relative">
      <Hero />
      <Ladder />
      <Cases />
      <Matrix />
      <MoreCapabilities />
      <Process />
      <Pricing />
      <About />
      <Footer />
    </main>
  )
}
