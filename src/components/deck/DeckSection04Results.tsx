import { motion } from 'motion/react';

const brands = [
  { name: 'Zeel Rainwear', outcome: 'Scaled from ₹1 Cr to ₹20 Cr in 2 years on Amazon' },
  { name: 'Mars', outcome: 'Built marketplace ads strategy from ground up' },
  { name: 'Quench', outcome: 'Zero to significant marketplace presence via ads' },
  { name: 'Neude Skin', outcome: 'New brand launch — ads-first marketplace growth' },
  { name: 'Flicka Cosmetics', outcome: 'Category entry powered by targeted ad campaigns' },
  { name: 'Goodday Tiffins', outcome: 'Offline brand taken online with full ads activation' },
  { name: "Janki's Shuchi", outcome: 'From zero digital presence to marketplace sales via ads' },
];

export default function DeckSection04Results() {
  return (
    <section style={{ background: '#EDF0F7', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '80px 40px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <motion.p className="m8-p5" style={{ color: '#8E59FF', marginBottom: 12 }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6, ease: 'easeOut' }}>
            Proven Results
          </motion.p>
          <motion.h2 className="m8-h2" style={{ color: '#080D19', marginBottom: 16 }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}>
            Brands Scaled from Zero
          </motion.h2>
          <motion.p className="m8-p4" style={{ color: '#12182B', maxWidth: 720, margin: '0 auto' }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}>
            We don't just optimize existing ads — we take brands from zero marketplace presence to sustained, profitable growth.
          </motion.p>
        </div>

        <div style={{ display: 'flex', gap: 16, overflowX: 'auto', scrollbarWidth: 'none', paddingBottom: 8 }}>
          {brands.map((brand, i) => (
            <motion.div
              key={i}
              style={{
                flex: '0 0 200px',
                background: '#FFFFFF',
                borderRadius: 12,
                padding: 24,
                borderTop: '3px solid #8E59FF',
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: i * 0.1 }}
            >
              <span className="m8-p6" style={{ color: '#8E59FF', display: 'block', marginBottom: 8 }}>Zero to Scale</span>
              <p className="m8-p3-medium" style={{ color: '#080D19', marginBottom: 8 }}>{brand.name}</p>
              <p className="m8-p6" style={{ color: '#12182B' }}>{brand.outcome}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          style={{ textAlign: 'center', marginTop: 48, maxWidth: 800, margin: '48px auto 0' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
        >
          <p className="m8-p5" style={{ color: '#12182B' }}>
            Every one of these brands started at zero on the marketplace. We built their ads strategy, executed campaigns, and drove growth — exactly what this program needs.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
