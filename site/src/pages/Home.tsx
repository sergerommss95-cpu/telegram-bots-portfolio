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
import { ROICalculator } from '../sections/ROICalculator'
import { Comparison } from '../sections/Comparison'
import { FAQ } from '../sections/FAQ'

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
      <ROICalculator />
      <Comparison />
      <Pricing />
      <ProposalGenerator />
      <FAQ />
      <Testimonials />
      <Offer />
      <About />
      <Footer />
    </main>
  )
}
