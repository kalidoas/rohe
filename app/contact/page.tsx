import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="pt-24 pb-20 bg-cream selection:bg-gold/20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="uppercase text-taupe tracking-[0.3em] text-xs font-bold mb-4 block">Contact</span>
          <h1 className="text-4xl sm:text-5xl font-serif text-charcoal mb-5">
            Restons en <i className="italic text-taupe">contact</i>
          </h1>
          <div className="w-12 h-[1px] bg-gold mx-auto mb-7" />
          <p className="text-charcoal/80 max-w-2xl mx-auto leading-relaxed">
            Nous vous répondons avec plaisir pour toute question sur les packs, les commandes, ou une recommandation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <section className="lg:col-span-7 bg-white border border-border p-8 sm:p-10 shadow-sm">
            <h2 className="font-serif text-2xl text-charcoal mb-6">Envoyer un message</h2>
            <form className="space-y-5">
              <div>
                <label className="block uppercase tracking-widest text-[10px] text-taupe font-bold mb-2">Nom</label>
                <input className="w-full bg-warm-white border border-border p-4 focus:outline-none focus:border-gold transition-colors" name="name" type="text" placeholder="Votre nom" />
              </div>
              <div>
                <label className="block uppercase tracking-widest text-[10px] text-taupe font-bold mb-2">Email</label>
                <input className="w-full bg-warm-white border border-border p-4 focus:outline-none focus:border-gold transition-colors" name="email" type="email" placeholder="vous@exemple.com" />
              </div>
              <div>
                <label className="block uppercase tracking-widest text-[10px] text-taupe font-bold mb-2">Message</label>
                <textarea className="w-full bg-warm-white border border-border p-4 focus:outline-none focus:border-gold transition-colors resize-none" name="message" rows={5} placeholder="Dites-nous comment on peut vous aider..." />
              </div>
              <button type="submit" className="w-full bg-gold text-charcoal py-5 uppercase tracking-[0.2em] font-medium hover:bg-light-gold transition-colors shadow-lg">
                Envoyer
              </button>
              <p className="text-[10px] uppercase tracking-widest text-taupe text-center">
                Ou contactez-nous directement sur WhatsApp ci-dessous
              </p>
            </form>
          </section>

          <aside className="lg:col-span-5">
            <div className="bg-charcoal text-cream p-8 sm:p-10 border border-gold/20 shadow-xl">
              <h2 className="font-serif text-2xl mb-6">ROHE Parfumerie</h2>

              <a
                href="https://wa.me/212604283228"
                target="_blank"
                rel="noreferrer"
                className="block w-full text-center bg-gold text-charcoal py-4 uppercase tracking-[0.2em] font-medium hover:bg-light-gold transition-colors mb-8"
              >
                WhatsApp
              </a>

              <div className="space-y-4 text-sm">
                <div>
                  <p className="text-gold text-[10px] uppercase tracking-widest font-bold mb-1">Email</p>
                  <p className="text-cream/90">contact@rohe-parfumerie.com</p>
                </div>
                <div>
                  <p className="text-gold text-[10px] uppercase tracking-widest font-bold mb-1">Téléphone</p>
                  <p className="text-cream/90">
                    <span className="font-sans font-semibold not-italic tracking-normal">0604-283-228</span>
                  </p>
                </div>
                <div>
                  <p className="text-gold text-[10px] uppercase tracking-widest font-bold mb-1">Horaires</p>
                  <p className="text-cream/80">
                    Lun - Sam:{' '}
                    <span className="font-sans font-semibold not-italic tracking-normal">10:00</span> -{' '}
                    <span className="font-sans font-semibold not-italic tracking-normal">20:00</span>
                  </p>
                  <p className="text-cream/60 text-xs mt-1">Dimanche: Fermé</p>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-gold/10">
                <Link href="/" className="text-xs uppercase tracking-widest text-cream/70 hover:text-gold transition-colors">
                  Retour à la boutique
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
