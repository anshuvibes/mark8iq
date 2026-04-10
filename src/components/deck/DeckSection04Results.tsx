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
    <section style={{ background: '#EDF0F7', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '80px 40px', position: 'relative', overflow: 'hidden' }}>
      {/* Slide number watermark */}
      <div className="deck-slide-number" style={{ color: 'rgba(8,13,25,0.03)' }}>04</div>

      <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%' }}>
        {/* Top block — left aligned */}
        <div style={{ marginBottom: 56 }}>
          <motion.p className="m8-p5" style={{ color: '#8E59FF', marginBottom: 12 }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6, ease: 'easeOut' }}>
            Proven Results
          </motion.p>
          <motion.h2 className="m8-h2" style={{ color: '#080D19', marginBottom: 12 }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}>
            Brands Scaled from Zero
          </motion.h2>
          <motion.p className="m8-p4" style={{ color: '#12182B', maxWidth: 560 }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}>
            Zero marketplace presence to sustained, profitable growth.
          </motion.p>
        </div>

        {/* Timeline */}
        <div style={{ position: 'relative', paddingLeft: 40 }}>
          {/* Vertical line */}
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 2, background: 'linear-gradient(to bottom, #8E59FF, rgba(142,89,255,0.1))' }} />

          {brands.map((brand, i) => (
            <motion.div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 40,
                marginBottom: 24,
                position: 'relative',
                flexDirection: i % 2 === 0 ? 'row' : 'row',
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: i * 0.08 }}
            >
              {/* Timeline dot */}
              <div style={{ position: 'absolute', left: -44, width: 10, height: 10, borderRadius: '50%', background: '#8E59FF', border: '2px solid #EDF0F7' }} />

              {/* Left cell */}
              <div style={{ flex: i % 2 === 0 ? '0 0 200px' : '0 0 200px' }}>
                <span className="m8-p6" style={{ color: '#8E59FF', display: 'block', marginBottom: 2 }}>Zero to Scale</span>
                <p className="m8-p3-medium" style={{ color: '#080D19' }}>{brand.name}</p>
              </div>

              {/* Right cell */}
              <div style={{ flex: 1 }}>
                <p className="m8-p5" style={{ color: '#12182B' }}>{brand.outcome}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Closing statement */}
        <motion.div
          style={{ textAlign: 'center', marginTop: 56, maxWidth: 800, margin: '56px auto 0' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.5 }}
        >
          <p className="m8-p5" style={{ color: '#12182B' }}>
            Every one of these brands started at zero on the marketplace. We built their ads strategy, executed campaigns, and drove growth — exactly what this program needs.
          </p>
        </motion.div>
      </div>

      <style>{`
        .deck-slide-number {
          position: absolute;
          top: 60px;
          right: 48px;
          font-family: 'Saira', sans-serif;
          font-size: 120px;
          font-weight: 400;
          line-height: 1;
          pointer-events: none;
          letter-spacing: -0.03em;
          user-select: none;
        }
      `}</style>
    </section>
  );
}
