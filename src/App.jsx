import { useEffect, useState } from "react";

const ORDER_URL = "https://order.casastegui.com/order";
const INSTAGRAM_URL = "https://www.instagram.com/casastegui.media";
const FACEBOOK_URL = "https://www.facebook.com/CasaSteguiPropertyMedia";
const EMAIL = "casastegui.media@gmail.com";
const EMAIL_URL = `mailto:${EMAIL}`;

const routes = {
  home: "/",
  about: "/about",
  packages: "/pricing",
  work: "/portfolio",
  "real-estate": "/real-estate-photography",
  "virtual-staging": "/virtual-staging",
  twilight: "/twilight-photography",
  contact: "/contact",
};

const pageFromPath = (path) => {
  const match = Object.entries(routes).find(([, route]) => route === path);
  return match ? match[0] : "home";
};

const imageModules = import.meta.glob("./assets/images/*.{jpg,png}", {
  eager: true,
  import: "default",
});

const images = Object.entries(imageModules).map(([path, src]) => ({
  src,
  name: path.split("/").pop(),
}));

const logoImg = images.find((img) => img.name === "CasaSteguiHorizontalLogo_White.png")?.src;
const heroImg = images.find((img) => img.name === "Hero.jpg")?.src;
const aboutImg = images.find((img) => img.name === "About.jpg")?.src;

const realEstateCardImg = images.find((img) => img.name === "twilight4.png")?.src;
const stagingCardImg = images.find((img) => img.name === "virtualstaging38.png")?.src;
const twilightCardImg = images.find((img) => img.name === "twilight5.png")?.src;

const sortByNumber = (a, b) => {
  const aNum = Number(a.name.match(/\d+/)?.[0] || 0);
  const bNum = Number(b.name.match(/\d+/)?.[0] || 0);
  return aNum - bNum;
};

const propertyPreviewImages = ["property11.jpg", "property130.jpg", "property143.jpg"]
  .map((fileName) => images.find((img) => img.name === fileName))
  .filter(Boolean);

const property1Images = images.filter((img) => /^property1\d+\.jpg$/i.test(img.name)).sort(sortByNumber);
const property2Images = images.filter((img) => /^property2\d+\.jpg$/i.test(img.name)).sort(sortByNumber);
const property3Images = images.filter((img) => /^property3\d+\.jpg$/i.test(img.name)).sort(sortByNumber);
const twilightImages = images.filter((img) => /^twilight\d+\.png$/i.test(img.name)).sort(sortByNumber);
const stagingImages = images.filter((img) => /^virtualstaging\d+\.png$/i.test(img.name)).sort(sortByNumber);

const packages = [
  {
    name: "Casa Essential",
    label: "Core Listing Media",
    services: ["Interior + exterior photography", "Listing Website"],
    pricing: [
      ["< 1,500", "$160"],
      ["1,501–2,500", "$190"],
      ["2,501–4,000", "$230"],
      ["4,001–5,500", "$260"],
      ["5,501 +", "$300"],
    ],
  },
  {
    name: "Casa Elevate",
    label: "Most Booked",
    featured: true,
    services: ["Interior + exterior photography", "Twilight Photography", "Listing Website"],
    pricing: [
      ["< 1,500", "$260"],
      ["1,501–2,500", "$300"],
      ["2,501–4,000", "$340"],
      ["4,001–5,500", "$380"],
      ["5,501 +", "$420"],
    ],
  },
  {
    name: "Casa Signature",
    label: "Complete Presentation",
    services: ["Interior + exterior photography", "Twilight Photography", "Virtual Staging", "Listing Website"],
    pricing: [
      ["< 1,500", "$340"],
      ["1,501–2,500", "$385"],
      ["2,501–4,000", "$435"],
      ["4,001–5,500", "$485"],
      ["5,501 +", "$540"],
    ],
  },
];

const deliverables = [
  { number: "01", title: "Turnaround Time", note: "*Non-negotiable", items: ["24–48 hours", "Same day delivery available +$50"] },
  { number: "02", title: "Deliverables", items: ["MLS-ready images", "High-resolution images/videos for marketing", "Private online gallery, downloadable"] },
  { number: "03", title: "Travel / Coverage", items: ["Service area: 30 mile radius", "$0.65 per mile beyond service area"] },
  {
    number: "04",
    title: "Add-Ons",
    items: [
      "Virtual Twilight: +$45 per room",
      "Virtual Staging: +$45 per room",
      "Object/Clutter Removal: +$25 per room",
      "Cinematic Walkthrough Video: +$175",
      "Vertical Social Reel: +$125",
      "Cinematic Detail Reel: +$75",
      "2D Floor Plan: +$75",
    ],
  },
  {
    number: "05",
    title: "Referral Program",
    description: "For every referral that books and completes any service, you’ll receive one free Casa Essential shoot.",
    items: ["Referral must mention your name at booking", "Reward is issued after the job is completed and paid", "No limits on referrals"],
  },
];

function Navbar({ setPage, heroStyle = false }) {
  return (
    <header className={`z-50 w-full ${heroStyle ? "absolute left-0 top-0 bg-transparent" : "relative border-b border-[#fffef6]/10 bg-[#252422]"}`}>
      <div className="flex flex-col items-center px-[6%] py-7">
        <button onClick={() => setPage("home")} className="flex items-center justify-center" aria-label="Go to homepage">
          {logoImg ? (
            <img src={logoImg} alt="Casa Stegui Property Media" className="h-[70px] w-auto max-w-[430px] object-contain" />
          ) : (
            <div className="text-center">
              <p className="font-serif text-3xl">Casa Stegui</p>
              <p className="text-[10px] uppercase tracking-[0.45em] text-[#fffef6]/60">Property Media</p>
            </div>
          )}
        </button>

        <nav className="mt-8 hidden items-center justify-center gap-12 text-xs font-semibold uppercase tracking-[0.38em] text-[#fffef6]/80 md:flex">
          <button onClick={() => setPage("home")} className="transition hover:text-[#fe7f2d]">Home</button>
          <button onClick={() => setPage("about")} className="transition hover:text-[#fe7f2d]">About</button>
          <button onClick={() => setPage("packages")} className="transition hover:text-[#fe7f2d]">Pricing</button>
          <button onClick={() => setPage("work")} className="transition hover:text-[#fe7f2d]">Portfolio</button>
          <button onClick={() => setPage("contact")} className="transition hover:text-[#fe7f2d]">Contact</button>
        </nav>
      </div>
    </header>
  );
}

function Footer({ setPage }) {
  return (
    <footer className="grid gap-14 border-t border-[#fffef6]/10 bg-[#252422] px-[6%] py-20 md:grid-cols-3">
      <div>
        <h3 className="font-serif text-2xl">Casa Stegui Property Media</h3>
        <p className="mt-8 max-w-sm leading-8 text-[#fffef6]/55">
          Veteran-owned real estate photography, video, twilight photography, and virtual staging for Central Texas Realtors.
        </p>
      </div>

      <div>
        <p className="mb-8 text-xs uppercase tracking-[0.35em] text-[#fe7f2d]">Explore</p>
        <div className="grid gap-5 text-left text-[#fffef6]/60">
          <button onClick={() => setPage("home")} className="text-left transition hover:text-[#fe7f2d]">Home</button>
          <button onClick={() => setPage("work")} className="text-left transition hover:text-[#fe7f2d]">Portfolio</button>
          <button onClick={() => setPage("packages")} className="text-left transition hover:text-[#fe7f2d]">Pricing</button>
          <button onClick={() => setPage("about")} className="text-left transition hover:text-[#fe7f2d]">About</button>
          <button onClick={() => setPage("contact")} className="text-left transition hover:text-[#fe7f2d]">Contact</button>
        </div>
      </div>

      <div>
        <p className="mb-8 text-xs uppercase tracking-[0.35em] text-[#fe7f2d]">Studio</p>
        <div className="grid gap-4 text-[#fffef6]/60">
          <p>Casa Stegui Media</p>
          <p>17 N 2nd Street #1063</p>
          <p>Temple, TX 76501</p>
          <p>United States</p>
          <a href={EMAIL_URL} className="pt-4 transition hover:text-[#fe7f2d]">{EMAIL}</a>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="transition hover:text-[#fe7f2d]">@casastegui.media</a>
          <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className="transition hover:text-[#fe7f2d]">CasaStegui Property Media</a>
        </div>
      </div>
    </footer>
  );
}

function TrustBar() {
  return (
    <section className="border-b border-[#fffef6]/10 bg-[#252422] px-[6%] py-8">
      <div className="grid gap-5 text-center text-xs font-semibold uppercase tracking-[0.28em] text-[#fffef6]/70 md:grid-cols-5">
        <p>Veteran Owned</p>
        <p>Central Texas</p>
        <p>MLS Ready</p>
        <p>24–48 Hour Delivery</p>
        <p>HDPhotoHub Delivery</p>
      </div>
    </section>
  );
}

function GoogleReviewsSection() {
  useEffect(() => {
    if (!document.querySelector('script[src="https://elfsightcdn.com/platform.js"]')) {
      const script = document.createElement("script");
      script.src = "https://elfsightcdn.com/platform.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <section className="border-b border-[#fffef6]/10 px-[6%] py-28">
      <div className="mb-14 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
        <div>
          <p className="mb-6 text-xs uppercase tracking-[0.45em] text-[#fffef6]/45">
            <span className="text-[#fe7f2d]">—</span> Google Reviews
          </p>
          <h2 className="max-w-5xl font-serif text-[clamp(3rem,6vw,6rem)] leading-[0.95] tracking-[-0.04em]">
            Trusted by Central Texas Realtors.
          </h2>
        </div>
        <p className="max-w-2xl text-xl leading-9 text-[#fffef6]/60">
          Real feedback from clients who booked Casa Stegui for professional listing media, fast delivery, and clear communication.
        </p>
      </div>
      <div className="rounded-2xl border border-[#fffef6]/10 bg-[#252422] p-8 shadow-[0_0_90px_rgba(254,127,45,0.12)]">
        <div className="elfsight-app-15ad62a5-707f-46f1-86d5-f98520e1b8f8" data-elfsight-app-lazy></div>
      </div>
    </section>
  );
}

function ProcessSection() {
  return (
    <section className="border-b border-[#fffef6]/10 px-[6%] py-28">
      <p className="mb-6 text-xs uppercase tracking-[0.45em] text-[#fffef6]/45">
        <span className="text-[#fe7f2d]">—</span> Process
      </p>

      <h2 className="mb-16 max-w-5xl font-serif text-[clamp(3rem,6vw,6rem)] leading-[0.95] tracking-[-0.04em]">
        A simple workflow for busy agents.
      </h2>

      <div className="grid gap-6 md:grid-cols-4">
        {[
          ["01", "Book", "Choose your package, property details, and appointment time online."],
          ["02", "Capture", "We photograph the property with clean composition, straight verticals, and market-ready framing."],
          ["03", "Deliver", "Final media is delivered through HDPhotoHub within 24–48 hours."],
          ["04", "Market", "Use your images for MLS, social media, listing websites, and client promotion."],
        ].map(([number, title, copy]) => (
          <article key={number} className="rounded-2xl border border-[#fffef6]/10 bg-[#252422] p-8">
            <p className="font-serif text-5xl text-[#fe7f2d]">{number}</p>
            <h3 className="mt-8 font-serif text-3xl">{title}</h3>
            <p className="mt-5 leading-8 text-[#fffef6]/60">{copy}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function ServiceAreaSection() {
  const cities = ["Temple", "Killeen", "Copperas Cove", "Harker Heights", "Belton", "Georgetown", "Round Rock", "Salado"];

  return (
    <section className="border-b border-[#fffef6]/10 bg-[#252422] px-[6%] py-28">
      <p className="mb-6 text-xs uppercase tracking-[0.45em] text-[#fffef6]/45">
        <span className="text-[#fe7f2d]">—</span> Service Area
      </p>

      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-end">
        <h2 className="max-w-4xl font-serif text-[clamp(3rem,6vw,6rem)] leading-[0.95] tracking-[-0.04em]">
          Real estate media for Central Texas listings.
        </h2>
        <p className="max-w-2xl text-xl leading-9 text-[#fffef6]/60">
          Casa Stegui serves agents, sellers, builders, and property teams across the Central Texas market.
        </p>
      </div>

      <div className="mt-14 flex flex-wrap gap-4">
        {cities.map((city) => (
          <span key={city} className="rounded-full border border-[#fffef6]/10 px-6 py-4 text-sm uppercase tracking-[0.18em] text-[#fffef6]/70">
            {city}
          </span>
        ))}
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="px-[6%] py-28">
      <div className="flex flex-col justify-between gap-10 rounded-3xl border border-[#fffef6]/10 bg-[#252422] p-14 shadow-[0_0_110px_rgba(254,127,45,0.16)] md:flex-row md:items-center">
        <div>
          <h2 className="max-w-xl font-serif text-5xl leading-tight">Ready for your next listing?</h2>
          <p className="mt-5 max-w-xl text-lg leading-8 text-[#fffef6]/60">
            Book professional real estate photography, video, twilight imagery, or virtual staging for your next Central Texas property.
          </p>
        </div>

        <a href={ORDER_URL} target="_blank" rel="noopener noreferrer" className="w-fit rounded-full bg-[#fe7f2d] px-9 py-5 font-semibold text-[#fffef6] transition hover:opacity-90">
          Book a Shoot →
        </a>
      </div>
    </section>
  );
}

function GalleryGrid({ images, title }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {images.map((image, index) => (
        <div key={image.name} className="aspect-[4/3] overflow-hidden rounded-md border border-[#fffef6]/10 bg-[#252422]">
          <img
            src={image.src}
            alt={`${title} portfolio image ${index + 1}`}
            className="h-full w-full object-cover transition duration-300 hover:scale-[1.015]"
          />
        </div>
      ))}
    </div>
  );
}

function PackagesSection() {
  return (
    <section className="border-b border-[#fffef6]/10 px-[6%] py-28">
      <p className="mb-6 text-xs uppercase tracking-[0.45em] text-[#fffef6]/45">
        <span className="text-[#fe7f2d]">—</span> Packages
      </p>

      <h2 className="mb-16 max-w-5xl font-serif text-[clamp(3rem,6vw,6rem)] leading-[0.95] tracking-[-0.04em]">
        Listing media packages built around presentation.
      </h2>

      <div className="grid gap-6 lg:grid-cols-3">
        {packages.map((item) => (
          <article
            key={item.name}
            className={`flex flex-col rounded-2xl border bg-[#252422] p-8 shadow-[0_0_60px_rgba(254,127,45,0.08)] ${
              item.featured ? "border-[#fe7f2d]/70" : "border-[#fffef6]/10"
            }`}
          >
            <div className="mb-6 flex items-center justify-between gap-4">
              <p className="text-xs uppercase tracking-[0.35em] text-[#fe7f2d]">Package</p>
              <p className="rounded-full border border-[#fffef6]/10 px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-[#fffef6]/60">
                {item.label}
              </p>
            </div>

            <h3 className="font-serif text-5xl leading-none">{item.name}</h3>

            <div className="mt-12 border-t border-[#fffef6]/10 pt-8">
              <p className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-[#fffef6]/70">Services</p>
              <ul className="grid gap-3 text-[#fffef6]/65">
                {item.services.map((service) => (
                  <li key={service}><span className="text-[#fe7f2d]">•</span> {service}</li>
                ))}
              </ul>
            </div>

            <div className="mt-12 border-t border-[#fffef6]/10 pt-8">
              <p className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-[#fffef6]/70">Pricing by SQFT</p>
              <div className="grid gap-3 text-[#fffef6]/70">
                {item.pricing.map(([range, price]) => (
                  <div key={range} className="flex justify-between border-b border-[#fffef6]/10 pb-2">
                    <span>{range}</span>
                    <span className="font-semibold text-[#fffef6]">{price}</span>
                  </div>
                ))}
              </div>
            </div>

            <a
              href={ORDER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`mt-12 inline-block w-fit rounded-full px-7 py-4 font-semibold transition ${
                item.featured
                  ? "bg-[#fe7f2d] text-[#fffef6] hover:opacity-90"
                  : "border border-[#fffef6]/20 text-[#fffef6] hover:border-[#fe7f2d] hover:text-[#fe7f2d]"
              }`}
            >
              Book Package →
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}

function DeliverablesSection() {
  return (
    <section className="border-b border-[#fffef6]/10 bg-[#252422] px-[6%] py-28">
      <p className="mb-6 text-xs uppercase tracking-[0.45em] text-[#fffef6]/45">
        <span className="text-[#fe7f2d]">—</span> Deliverables
      </p>

      <div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <h2 className="max-w-5xl font-serif text-[clamp(3rem,6vw,6rem)] leading-[0.95] tracking-[-0.04em]">
          Clear expectations before every shoot.
        </h2>
        <p className="max-w-md leading-8 text-[#fffef6]/60">
          A transparent breakdown of turnaround, delivery format, travel coverage, available add-ons, and referral rewards.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {deliverables.slice(0, 4).map((item) => (
          <article key={item.number} className="rounded-2xl border border-[#fffef6]/10 bg-[#252422] p-8 shadow-[0_0_60px_rgba(254,127,45,0.07)]">
            <p className="font-serif text-6xl leading-none text-[#fe7f2d]">{item.number}</p>
            <h3 className="mt-8 font-serif text-3xl">{item.title}</h3>
            {item.note && <p className="mt-3 text-xs uppercase tracking-[0.25em] text-[#fffef6]/45">{item.note}</p>}
            <ul className="mt-10 grid gap-4 text-[#fffef6]/65">
              {item.items.map((line) => (
                <li key={line} className="leading-7"><span className="text-[#fe7f2d]">•</span> {line}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <article className="mt-6 rounded-2xl border border-[#fffef6]/10 bg-[#252422] p-8 shadow-[0_0_60px_rgba(254,127,45,0.07)]">
        <div className="grid gap-10 lg:grid-cols-[0.45fr_1fr] lg:items-start">
          <div>
            <p className="font-serif text-6xl leading-none text-[#fe7f2d]">{deliverables[4].number}</p>
            <h3 className="mt-8 font-serif text-3xl">{deliverables[4].title}</h3>
          </div>
          <div>
            <p className="max-w-2xl text-xl leading-9 text-[#fffef6]/70">{deliverables[4].description}</p>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {deliverables[4].items.map((line) => (
                <p key={line} className="rounded-full border border-[#fffef6]/10 px-5 py-4 text-sm text-[#fffef6]/65">
                  <span className="text-[#fe7f2d]">•</span> {line}
                </p>
              ))}
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}

function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    service: "Photography",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateForm = (event) => {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const submitInquiry = async (event) => {
    event.preventDefault();

    if (!form.name.trim() || !form.email.trim()) {
      setStatus("Please add your name and email so we can respond.");
      return;
    }

    setIsSubmitting(true);
    setStatus("Sending inquiry...");

    try {
      const response = await fetch("/.netlify/functions/casa-lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          propertyAddress: form.address,
          serviceNeeded: form.service,
          message: form.message,
          sourcePage: window.location.href,
          consent: "Yes",
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.ok) {
        throw new Error(result.error || "Submission failed");
      }

      setStatus("Inquiry received. We will review the listing details and follow up soon.");
      setForm({
        name: "",
        email: "",
        phone: "",
        address: "",
        service: "Photography",
        message: "",
      });
    } catch (error) {
      console.error("Casa Stegui inquiry error:", error);
      setStatus("Something went wrong. Please email casastegui.media@gmail.com or try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="border-b border-[#fffef6]/10 px-[6%] py-28">
      <p className="mb-6 text-xs uppercase tracking-[0.45em] text-[#fffef6]/45">
        <span className="text-[#fe7f2d]">—</span> Get In Touch
      </p>

      <h2 className="font-serif text-[clamp(3.5rem,7vw,7rem)] leading-[0.95] tracking-[-0.04em]">
        Let’s talk about your listing.
      </h2>

      <p className="mt-8 max-w-3xl text-xl leading-9 text-[#fffef6]/60">
        Ready to book? Go straight to scheduling. Have a question first? Send the listing details and we will reply same day.
      </p>

      <div className="mt-24 grid gap-20 lg:grid-cols-2">
        <div>
          <div className="rounded-2xl border border-[#fffef6]/10 bg-[#252422] p-10 shadow-[0_0_90px_rgba(254,127,45,0.16)]">
            <h3 className="font-serif text-3xl">Ready to book?</h3>
            <p className="mt-4 text-lg leading-8 text-[#fffef6]/60">
              Pick your services and time on our scheduling page. Confirmation is instant.
            </p>
            <a href={ORDER_URL} target="_blank" rel="noopener noreferrer" className="mt-8 inline-block rounded-full bg-[#fe7f2d] px-8 py-4 font-semibold text-[#fffef6] transition hover:opacity-90">
              Book Now →
            </a>
          </div>

          <div className="mt-14 divide-y divide-[#fffef6]/10">
            {[
              ["Email", <a href={EMAIL_URL} className="transition hover:text-[#fe7f2d]">{EMAIL}</a>],
              ["Service Area", "Temple, Killeen, Copperas Cove, Harker Heights, Belton, Georgetown, Round Rock"],
              ["Response Time", "Same business day"],
              ["Instagram", <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="transition hover:text-[#fe7f2d]">@casastegui.media</a>],
              ["Facebook", <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className="transition hover:text-[#fe7f2d]">CasaStegui Property Media</a>],
            ].map(([label, value]) => (
              <div key={label} className="grid grid-cols-2 gap-6 py-7">
                <p className="text-xs uppercase tracking-[0.35em] text-[#fffef6]/45">{label}</p>
                <p className="font-serif text-xl">{value}</p>
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={submitInquiry} className="rounded-2xl border border-[#fffef6]/10 bg-[#252422] p-10">
          <div className="grid gap-6">
            <input name="name" value={form.name} onChange={updateForm} type="text" placeholder="Your name" className="rounded-lg border border-[#fffef6]/15 bg-[#252422] px-5 py-4 text-[#fffef6] outline-none placeholder:text-[#fffef6]/35" />
            <input name="email" value={form.email} onChange={updateForm} type="email" placeholder="you@email.com" className="rounded-lg border border-[#fffef6]/15 bg-[#252422] px-5 py-4 text-[#fffef6] outline-none placeholder:text-[#fffef6]/35" />
            <input name="phone" value={form.phone} onChange={updateForm} type="tel" placeholder="(000) 000-0000" className="rounded-lg border border-[#fffef6]/15 bg-[#252422] px-5 py-4 text-[#fffef6] outline-none placeholder:text-[#fffef6]/35" />
            <input name="address" value={form.address} onChange={updateForm} type="text" placeholder="Property address" className="rounded-lg border border-[#fffef6]/15 bg-[#252422] px-5 py-4 text-[#fffef6] outline-none placeholder:text-[#fffef6]/35" />

            <select name="service" value={form.service} onChange={updateForm} className="rounded-lg border border-[#fffef6]/15 bg-[#252422] px-5 py-4 text-[#fffef6] outline-none">
              <option>Photography</option>
              <option>Photography + Video</option>
              <option>Twilight</option>
              <option>Virtual Staging</option>
              <option>Full Listing Media</option>
            </select>

            <textarea name="message" value={form.message} onChange={updateForm} rows="5" placeholder="Square footage, timeline, anything we should know" className="rounded-lg border border-[#fffef6]/15 bg-[#252422] px-5 py-4 text-[#fffef6] outline-none placeholder:text-[#fffef6]/35" />

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-4 rounded-full bg-[#fe7f2d] px-8 py-5 font-semibold text-[#fffef6] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Sending inquiry..." : "Send inquiry →"}
            </button>

            {status && (
              <p className="text-sm leading-6 text-[#fffef6]/70">
                {status}
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}

function PortfolioCard({ image, label, title, copy, onClick }) {
  return (
    <button onClick={onClick} className="group relative min-h-[520px] overflow-hidden rounded-2xl border border-[#fffef6]/10 bg-[#252422] text-left transition duration-500 hover:border-[#fe7f2d]/60">
      {image && (
        <img src={image} alt={`${title} preview`} className="absolute inset-0 h-full w-full object-cover opacity-[0.65] transition duration-700 group-hover:scale-105 group-hover:opacity-[0.72]" />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-[#252422]/30 via-[#252422]/68 to-[#252422]/94" />
      <div className="relative z-10 flex h-full flex-col justify-end p-10">
        <p className="mb-6 text-xs uppercase tracking-[0.35em] text-[#fe7f2d]">{label}</p>
        <h2 className="max-w-sm font-serif text-5xl leading-[1] tracking-[-0.03em] text-[#fffef6]">{title}</h2>
        <p className="mt-6 max-w-sm text-lg leading-8 text-[#fffef6]/75">{copy}</p>
      </div>
    </button>
  );
}

function WorkHub({ setPage }) {
  return (
    <main className="min-h-screen bg-[#252422] text-[#fffef6]">
      <Navbar setPage={setPage} />

      <section className="px-[6%] pb-24 pt-20">
        <p className="mb-6 text-xs uppercase tracking-[0.45em] text-[#fffef6]/45">
          <span className="text-[#fe7f2d]">—</span> Portfolio
        </p>
        <h1 className="max-w-6xl font-serif text-[clamp(4rem,8vw,8rem)] leading-[0.9] tracking-[-0.04em]">
          Portfolio categories.
        </h1>
        <p className="mt-8 max-w-3xl text-xl leading-9 text-[#fffef6]/60">
          Explore Casa Stegui property media by service category.
        </p>
      </section>

      <section className="grid gap-6 px-[6%] pb-28 md:grid-cols-3">
        <PortfolioCard image={realEstateCardImg} label="Real Estate" title="Property Gallery" copy="Interior and exterior listing photography organized by property." onClick={() => setPage("real-estate")} />
        <PortfolioCard image={stagingCardImg} label="Virtual Staging" title="Staged Interiors" copy="Styled spaces designed to help buyers understand scale, warmth, and lifestyle potential." onClick={() => setPage("virtual-staging")} />
        <PortfolioCard image={twilightCardImg} label="Twilight" title="Atmosphere After Sunset" copy="Exterior twilight visuals built around curb appeal, mood, and stronger first impressions." onClick={() => setPage("twilight")} />
      </section>

      <CTA />
      <Footer setPage={setPage} />
    </main>
  );
}

function PackagesPage({ setPage }) {
  return (
    <main className="min-h-screen bg-[#252422] text-[#fffef6]">
      <Navbar setPage={setPage} />
      <section className="px-[6%] pb-10 pt-20">
        <p className="mb-6 text-xs uppercase tracking-[0.45em] text-[#fffef6]/45">
          <span className="text-[#fe7f2d]">—</span> Pricing
        </p>
        <h1 className="max-w-6xl font-serif text-[clamp(4rem,8vw,8rem)] leading-[0.9] tracking-[-0.04em]">
          Pricing built for clear listing presentation.
        </h1>
      </section>
      <PackagesSection />
      <DeliverablesSection />
      <CTA />
      <Footer setPage={setPage} />
    </main>
  );
}

function RealEstatePage({ setPage }) {
  return (
    <main className="min-h-screen bg-[#252422] text-[#fffef6]">
      <Navbar setPage={setPage} />
      <section className="px-[6%] pb-20 pt-20">
        <button onClick={() => setPage("work")} className="mb-10 text-xs uppercase tracking-[0.3em] text-[#fe7f2d]">
          ← Back to Portfolio
        </button>
        <p className="mb-6 text-xs uppercase tracking-[0.45em] text-[#fffef6]/45">
          <span className="text-[#fe7f2d]">—</span> Real Estate Photography
        </p>
        <h1 className="max-w-6xl font-serif text-[clamp(4rem,8vw,8rem)] leading-[0.9] tracking-[-0.04em]">
          Property galleries.
        </h1>
      </section>

      <section className="border-t border-[#fffef6]/10 px-[6%] py-28">
        <h2 className="mb-14 font-serif text-6xl">Property 1</h2>
        <GalleryGrid images={property1Images} title="Property 1" />
      </section>

      <section className="border-t border-[#fffef6]/10 px-[6%] py-28">
        <h2 className="mb-14 font-serif text-6xl">Property 2</h2>
        <GalleryGrid images={property2Images} title="Property 2" />
      </section>

      <section className="border-t border-[#fffef6]/10 px-[6%] py-28">
        <h2 className="mb-14 font-serif text-6xl">Property 3</h2>
        <GalleryGrid images={property3Images} title="Property 3" />
      </section>

      <CTA />
      <Footer setPage={setPage} />
    </main>
  );
}

function VirtualStagingPage({ setPage }) {
  return (
    <main className="min-h-screen bg-[#252422] text-[#fffef6]">
      <Navbar setPage={setPage} />
      <section className="px-[6%] pb-20 pt-20">
        <button onClick={() => setPage("work")} className="mb-10 text-xs uppercase tracking-[0.3em] text-[#fe7f2d]">
          ← Back to Portfolio
        </button>
        <p className="mb-6 text-xs uppercase tracking-[0.45em] text-[#fffef6]/45">
          <span className="text-[#fe7f2d]">—</span> Virtual Staging
        </p>
        <h1 className="max-w-6xl font-serif text-[clamp(4rem,8vw,8rem)] leading-[0.9] tracking-[-0.04em]">
          Designed to feel lived in.
        </h1>
      </section>
      <section className="border-t border-[#fffef6]/10 px-[6%] py-28">
        <GalleryGrid images={stagingImages} title="Virtual Staging" />
      </section>
      <CTA />
      <Footer setPage={setPage} />
    </main>
  );
}

function TwilightPage({ setPage }) {
  return (
    <main className="min-h-screen bg-[#252422] text-[#fffef6]">
      <Navbar setPage={setPage} />
      <section className="px-[6%] pb-20 pt-20">
        <button onClick={() => setPage("work")} className="mb-10 text-xs uppercase tracking-[0.3em] text-[#fe7f2d]">
          ← Back to Portfolio
        </button>
        <p className="mb-6 text-xs uppercase tracking-[0.45em] text-[#fffef6]/45">
          <span className="text-[#fe7f2d]">—</span> Twilight Photography
        </p>
        <h1 className="max-w-6xl font-serif text-[clamp(4rem,8vw,8rem)] leading-[0.9] tracking-[-0.04em]">
          Atmosphere after sunset.
        </h1>
      </section>
      <section className="border-t border-[#fffef6]/10 px-[6%] py-28">
        <GalleryGrid images={twilightImages} title="Twilight Photography" />
      </section>
      <CTA />
      <Footer setPage={setPage} />
    </main>
  );
}

function AboutPage({ setPage }) {
  return (
    <main className="min-h-screen bg-[#252422] text-[#fffef6]">
      <Navbar setPage={setPage} />
      <section className="border-b border-[#fffef6]/10 px-[6%] pb-28 pt-20">
        <p className="mb-6 text-xs uppercase tracking-[0.45em] text-[#fffef6]/45">
          <span className="text-[#fe7f2d]">—</span> About The Studio
        </p>
        <h1 className="max-w-6xl font-serif text-[clamp(4rem,8vw,8rem)] leading-[0.92] tracking-[-0.05em]">
          A husband-and-wife studio with a soldier’s standards.
        </h1>

        <div className="mt-24 grid gap-20 lg:grid-cols-[0.9fr_1.2fr]">
          <div>
            {aboutImg ? (
              <img src={aboutImg} alt="Manuel and Melanie of Casa Stegui" className="h-[780px] w-full rounded-md border border-[#fffef6]/10 object-cover" />
            ) : (
              <div className="flex h-[780px] items-end rounded-md border border-[#fffef6]/10 bg-[#252422] p-6">
                <p className="rounded-full bg-[#252422] px-5 py-3 text-xs uppercase tracking-[0.25em] text-[#fffef6]/70">
                  Manuel + Melanie · Portrait
                </p>
              </div>
            )}
          </div>

          <div>
            <h2 className="font-serif text-5xl">Meet Manuel + Melanie.</h2>
            <div className="mt-8 space-y-8 text-xl leading-10 text-[#fffef6]/65">
              <p>
                Casa Stegui is a husband-and-wife media operation run by{" "}
                <strong className="text-[#fffef6]">Manuel “Manu” A. Garrastegui</strong>{" "}
                and <strong className="text-[#fffef6]">Melanie Santana</strong>, built on precision,
                consistency, and care for every property we photograph.
              </p>
              <p>
                Manuel brings a background in U.S. Army service and graphic design, a combination that drives
                structured, detail-oriented execution from the first frame to the final export.
              </p>
              <p>
                Melanie brings an artist’s eye for composition, visual balance, styling, and atmosphere,
                helping each gallery feel intentional, warm, and emotionally connected to the space.
              </p>
            </div>

            <h2 className="mt-20 font-serif text-5xl">How we work.</h2>
            <div className="mt-8 space-y-8 text-xl leading-10 text-[#fffef6]/65">
              <p>
                Real estate media is a deadline business, so we treat time as a priority. We show up prepared,
                communicate clearly, and deliver polished, MLS-ready galleries through HDPhotoHub within{" "}
                <strong className="text-[#fffef6]">24–48 hours</strong>.
              </p>
              <p>
                Together we create photography and video that helps agents, builders, and homeowners present
                their listings with confidence and elevate how spaces are experienced online.
              </p>
            </div>

            <div className="mt-14 flex flex-wrap gap-4">
              {["U.S. Army Veteran", "Central Texas based", "Owner-operated", "HDPhotoHub delivery"].map((item) => (
                <span key={item} className="rounded-full border border-[#fffef6]/10 px-5 py-3 text-sm text-[#fffef6]/70">
                  ● {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
      <CTA />
      <Footer setPage={setPage} />
    </main>
  );
}

function ContactPage({ setPage }) {
  return (
    <main className="min-h-screen bg-[#252422] text-[#fffef6]">
      <Navbar setPage={setPage} />
      <ContactSection />
      <Footer setPage={setPage} />
    </main>
  );
}

function HomePage({ setPage }) {
  return (
    <main className="min-h-screen bg-[#252422] text-[#fffef6]">
      <section
        className="relative flex min-h-screen items-center border-b border-[#fffef6]/10 bg-cover bg-center px-[6%] pt-56"
        style={{
          backgroundImage: heroImg
            ? `linear-gradient(rgba(37,36,34,0.42), rgba(37,36,34,0.72)), url(${heroImg})`
            : "linear-gradient(rgba(37,36,34,0.8), rgba(37,36,34,0.95))",
        }}
      >
        <Navbar setPage={setPage} heroStyle />

        <div className="relative z-10 max-w-6xl">
          <p className="mb-10 text-sm font-bold uppercase tracking-[0.28em] text-[#fffef6]/85">
            Veteran Owned Property Media
          </p>
          <h1 className="max-w-5xl font-serif text-[clamp(4rem,8vw,7.5rem)] leading-[0.92] tracking-[-0.045em] text-[#fffef6]">
            Real estate photography built to strengthen your listing.
          </h1>
          <p className="mt-8 max-w-3xl text-xl leading-9 text-[#fffef6]/75">
            Photography, video, twilight imagery, virtual staging, and listing media for Realtors across Central Texas.
          </p>

          <div className="mt-20 flex flex-wrap gap-5">
            <button onClick={() => setPage("work")} className="border border-[#fffef6]/70 px-10 py-5 text-xs font-bold uppercase tracking-[0.35em] text-[#fffef6] transition hover:border-[#fe7f2d] hover:text-[#fe7f2d]">
              View Portfolio
            </button>
            <a href={ORDER_URL} target="_blank" rel="noopener noreferrer" className="bg-[#fe7f2d] px-10 py-5 text-xs font-bold uppercase tracking-[0.28em] text-[#fffef6] transition hover:opacity-90">
              Book a Shoot
            </a>
          </div>
        </div>
      </section>

      <TrustBar />

      <section className="grid gap-16 border-b border-[#fffef6]/10 px-[6%] py-28 md:grid-cols-3">
        <div>
          <p className="mb-6 text-xs uppercase tracking-[0.4em] text-[#fffef6]/45"><span className="text-[#fe7f2d]">—</span> Built on discipline</p>
          <h3 className="font-serif text-2xl">Veteran-owned & operated</h3>
          <p className="mt-5 leading-8 text-[#fffef6]/60">
            A U.S. Army background means showing up on time, prepared, and accountable to every detail of your shoot.
          </p>
        </div>
        <div>
          <p className="mb-6 text-xs uppercase tracking-[0.4em] text-[#fffef6]/45"><span className="text-[#fe7f2d]">—</span> Made for agents</p>
          <h3 className="font-serif text-2xl">Fast, predictable turnaround</h3>
          <p className="mt-5 leading-8 text-[#fffef6]/60">
            Galleries delivered in 24–48 hours through HDPhotoHub, print-ready and MLS-sized, no chasing.
          </p>
        </div>
        <div>
          <p className="mb-6 text-xs uppercase tracking-[0.4em] text-[#fffef6]/45"><span className="text-[#fe7f2d]">—</span> Rooted locally</p>
          <h3 className="font-serif text-2xl">Central Texas, every week</h3>
          <p className="mt-5 leading-8 text-[#fffef6]/60">
            A husband-and-wife studio that knows the market and treats every property like it is our own.
          </p>
        </div>
      </section>

      <PackagesSection />
      <DeliverablesSection />
      <ServiceAreaSection />

      <section className="border-b border-[#fffef6]/10 px-[6%] py-28">
        <p className="mb-6 text-xs uppercase tracking-[0.45em] text-[#fffef6]/45">
          <span className="text-[#fe7f2d]">—</span> Selected Work
        </p>
        <h2 className="mb-16 max-w-5xl font-serif text-[clamp(3rem,6vw,6rem)] leading-[0.95] tracking-[-0.04em]">
          Real estate visuals with atmosphere and restraint.
        </h2>

        <div className="mb-8 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <h3 className="font-serif text-5xl">Property gallery.</h3>
            <p className="mt-4 max-w-xl leading-8 text-[#fffef6]/55">
              A focused preview of residential listing photography across architecture, interiors, and atmosphere.
            </p>
          </div>
          <button onClick={() => setPage("real-estate")} className="text-xs uppercase tracking-[0.3em] text-[#fe7f2d]">
            View Real Estate →
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {propertyPreviewImages.map((image, index) => (
            <img key={image.name} src={image.src} alt={`Casa Stegui real estate photography preview ${index + 1}`} className="h-[620px] w-full rounded-sm border border-[#fffef6]/10 object-cover" />
          ))}
        </div>
      </section>

      <GoogleReviewsSection />

      <section className="border-b border-[#fffef6]/10 px-[6%] py-28">
        <p className="mb-6 text-xs uppercase tracking-[0.45em] text-[#fffef6]/45">
          <span className="text-[#fe7f2d]">—</span> About The Studio
        </p>
        <h2 className="mb-24 max-w-6xl font-serif text-[clamp(3.5rem,7vw,7rem)] leading-[0.95] tracking-[-0.04em]">
          A husband-and-wife studio with a soldier’s standards.
        </h2>

        <div className="grid gap-20 lg:grid-cols-[0.9fr_1.2fr]">
          <div>
            {aboutImg ? (
              <img src={aboutImg} alt="Manuel and Melanie of Casa Stegui" className="h-[680px] w-full rounded-md border border-[#fffef6]/10 object-cover" />
            ) : (
              <div className="flex h-[680px] w-full items-end rounded-md border border-[#fffef6]/10 bg-[#252422] p-6">
                <p className="rounded-full bg-[#252422] px-5 py-3 text-xs uppercase tracking-[0.25em] text-[#fffef6]/70">
                  Manuel + Melanie · Portrait
                </p>
              </div>
            )}
          </div>

          <div>
            <h3 className="font-serif text-4xl">Meet Manuel + Melanie.</h3>
            <div className="mt-6 space-y-6 text-lg leading-9 text-[#fffef6]/65">
              <p>
                Casa Stegui is a husband-and-wife media operation, run by{" "}
                <strong className="text-[#fffef6]">Manuel “Manu” A. Garrastegui</strong>{" "}
                and <strong className="text-[#fffef6]">Melanie Santana</strong>, built on precision,
                consistency, and care for every property we shoot.
              </p>
              <p>
                Manuel brings a background in U.S. Army service and graphic design, a combination that drives
                structured, detail-oriented work from the first frame to the final export.
              </p>
              <p>
                Melanie brings an artist’s eye for composition, color, and balance, helping each gallery feel
                intentional, warm, and true to the space.
              </p>
            </div>

            <button onClick={() => setPage("about")} className="mt-10 text-xs uppercase tracking-[0.3em] text-[#fe7f2d]">
              Read More About Us →
            </button>
          </div>
        </div>
      </section>

      <ContactSection />
      <CTA />
      <Footer setPage={setPage} />
    </main>
  );
}

export default function App() {
  const [page, setCurrentPage] = useState(() => pageFromPath(window.location.pathname));

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPage(pageFromPath(window.location.pathname));
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const setPage = (nextPage) => {
    const nextPath = routes[nextPage] || "/";
    if (window.location.pathname !== nextPath) {
      window.history.pushState({}, "", nextPath);
    }
    setCurrentPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (page === "work") return <WorkHub setPage={setPage} />;
  if (page === "packages") return <PackagesPage setPage={setPage} />;
  if (page === "real-estate") return <RealEstatePage setPage={setPage} />;
  if (page === "virtual-staging") return <VirtualStagingPage setPage={setPage} />;
  if (page === "twilight") return <TwilightPage setPage={setPage} />;
  if (page === "about") return <AboutPage setPage={setPage} />;
  if (page === "contact") return <ContactPage setPage={setPage} />;

  return <HomePage setPage={setPage} />;
}
