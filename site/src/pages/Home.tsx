import { Hero } from '../sections/Hero'
import { Ladder } from '../sections/Ladder'
import { Cases } from '../sections/Cases'
import { Matrix } from '../sections/Matrix'
import { MoreCapabilities } from '../sections/MoreCapabilities'
import { ProofOfVelocity } from '../sections/ProofOfVelocity'
import { Pricing } from '../sections/Pricing'
import { Process } from '../sections/Process'
import { ProposalGenerator } from '../sections/ProposalGenerator'
import { Testimonials } from '../sections/Testimonials'
import { Offer } from '../sections/Offer'
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
      <ProofOfVelocity />
      <Process />
      <Pricing />
      <ProposalGenerator />
      <Testimonials />
      <Offer />
      <About />
      <Footer />
    </main>
  )
}
