// IntroductionSection.tsx
import { motion } from "framer-motion";

export default function IntroductionSection() {
  return (
    <section className="section-padding" id="introduction">
      <div className="container-custom">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-black font-bold font-brandonBold uppercase tracking-wider text-5xl text-center">
            THE LUXURY TRAVEL EXPERTS
          </h2>
        </motion.div>

        {/* Paragraph 1 */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="font-brandon mt-10 mb-20 text-muted-foreground max-w-2xl mx-auto text-lg tracking-wide text-center"
        >
          The world is vast, full of wonders. But information engulfs us. See this, do that, don’t
          miss this. It seems the more choice there is, the more overwhelmed we feel. What’s more,
          you’re never asked how you want to feel. In fact, you’re rarely asked anything. That’s
          not us. We are people. People who value human connection and thrive on connecting you to
          our vast world. A company of people renowned for planning remarkable and luxurious
          travel experiences.
        </motion.p>

        {/* Paragraph 2 */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="mb-20 font-brandon text-muted-foreground max-w-2xl mx-auto text-2xl text-center"
        >
          So let’s begin. Let’s do something remarkable.
        </motion.p>
      </div>
    </section>
  );
}
