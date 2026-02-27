import SectionHeading from '@/components/SectionHeading/SectionHeading'

const AboutSection = () => {
  return (
    <section id="about" className="mx-auto max-w-[1200px] px-4 py-8 md:py-[3.75rem]">
      <SectionHeading title="About Me" />
      <div className="mt-6 max-w-[48rem] space-y-5">
        <p className="text-tertiary-content leading-relaxed">
          I specialize in bringing ideas to life through high-performance applications that drive
          real business results. With a primary focus on front end development and extensive backend
          experience, I create tailored solutions designed to boost conversions and meet your
          specific business objectives.
        </p>
        <p className="text-tertiary-content leading-relaxed">
          Every business is unique, and so are my solutions. I deliver personalized digital
          experiences using modern technologies, with a strong emphasis on Core Web Vitals and
          business metrics, translating your goals into measurable outcomes.
        </p>
      </div>
    </section>
  )
}

export default AboutSection
