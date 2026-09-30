import React, { useState } from 'react';
import { 
  Zap, 
  ShieldCheck, 
  Search, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  XCircle, 
  MessageCircle, 
  Mail, 
  Code2, 
  Sparkles,
  ArrowRight,
  TrendingUp,
  Cpu,
  Globe2
} from 'lucide-react';
import { Language } from '../types';
import { sfx } from '../utils/audio';

interface SeoLeadMagnetSectionProps {
  language: Language;
  onLaunchConcierge?: () => void;
}

export const SeoLeadMagnetSection: React.FC<SeoLeadMagnetSectionProps> = ({
  language,
  onLaunchConcierge,
}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    sfx.playClick();
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const isSi = language === 'si';

  const faqs = [
    {
      q: isSi 
        ? "සාමාන්‍ය Templates (WordPress/Wix) වලට වඩා Custom Web Development එකක් වටින්නේ ඇයි?" 
        : "Why is Custom Web Development superior to generic WordPress or template sites?",
      a: isSi
        ? "සාමාන්‍ය WordPress හෝ Wix වෙබ් අඩවි වල බර plugins නිසා load වීමට තත්පර 5-8ක් ගතවේ. එමගින් Google Rank පහත වැටී පාරිභෝගිකයින් 50%කට වඩා අඩවියෙන් ඉවත් වේ. Ravana Tech හි අපි නිර්මාණය කරන Custom React/Vite සහ Firebase Cloud අඩවි තත්පර 0.8 ට අඩු වේගයකින් load වන අතර Google PageSpeed 95+ සහතිකය, ඉහළම Google SEO සහ ඉහළ Lead Conversion ලබාදෙයි."
        : "Generic WordPress/Wix sites rely on dozens of third-party plugins that drag load times above 5 seconds, severely punishing your Google rank and losing 50%+ of potential customers. Ravana Tech builds bespoke React, Vite, and Cloud-native architectures that load in under 0.8s with guaranteed 95+ PageSpeed scores and direct conversion engines."
    },
    {
      q: isSi
        ? "Ravana Tech Instant Scoping & Quotation Engine එකෙන් මට ලැබෙන වාසිය කුමක්ද?"
        : "How does the Ravana Tech Instant Scoping & Quotation Engine benefit my business?",
      a: isSi
        ? "දින ගණන් quotation එනතුරු බලා නොසිට, තත්පර 60ක් ඇතුළත ඔබේ අවශ්‍යතාවලට (Services, Features, Timelines) ගැළපෙන සම්පූර්ණ විනිවිදභාවයෙන් යුතු මිල ගණන් සහ තාක්ෂණික සැලැස්ම LKR හෝ USD වලින් ලබාගෙන 1-Click WhatsApp හරහා අපේ Architecture කණ්ඩායම හා සම්බන්ධ විය හැක."
        : "Instead of waiting days for vague estimates, our interactive engine calculates an itemized architecture breakdown in under 60 seconds. You receive exact pricing in LKR or USD, deployment timelines, and 1-click WhatsApp dispatch to our senior engineering desk."
    },
    {
      q: isSi
        ? "ශ්‍රී ලංකාවේ සහ විදේශීය (Global) ව්‍යාපාර සඳහා මිල ගණන් වෙනස් වන්නේ කෙසේද?"
        : "How does web development pricing work for Sri Lankan and International clients?",
      a: isSi
        ? "ශ්‍රී ලංකාවේ ව්‍යවසායකයින් සඳහා LKR 45,000 සිට සාධාරණ දේශීය මිල ගණන් යටතේත්, ඇමරිකාව, බ්‍රිතාන්‍යය, ඕස්ට්‍රේලියාව, ඩුබායි ආදී විදේශීය ආයතන සඳහා $140 USD සිට ජාත්‍යන්තර ප්‍රමිතියෙන් යුත් Full-Stack සහ AI පද්ධති ලබාදෙමු. කිසිදු සැඟවුණු ගාස්තුවක් නොමැත."
        : "We offer local tailored pricing starting from LKR 45,000 for Sri Lankan enterprises, and transparent international tiers from $140 USD for global clients in the US, UK, Australia, UAE, and Europe, supporting international card and wire payments."
    },
    {
      q: isSi
        ? "වෙබ් අඩවියට AI Chatbots, Payment Gateways සහ Customer Portals එකතු කළ හැකිද?"
        : "Can Ravana Tech integrate custom AI Chatbots, Payment Gateways, and Client Portals?",
      a: isSi
        ? "ඔව්! අපගේ විශේෂත්වය වන්නේ ඕනෑම වෙබ් අඩවියකට සජීවී 24/7 AI Lead Concierge, WhatsApp Business Bot, Stripe, PayHere, Commercial Bank IPG payment gateways සහ Cloud Firestore customer portals මුල සිටම සවි කිරීමයි."
        : "Yes! Our core expertise includes deploying custom 24/7 AI chat agents, automated WhatsApp lead concierges, Stripe/PayHere/Bank payment gateways, and real-time Cloud Firestore dashboards engineered specifically for high growth."
    },
    {
      q: isSi
        ? "ව්‍යාපෘතියක් ආරම්භ කර සජීවීව (Live) ලබාදීමට කොපමණ කාලයක් ගතවේද?"
        : "What is the typical delivery turnaround from kickoff to live deployment?",
      a: isSi
        ? "අපගේ ස්වයංක්‍රීය CI/CD සහ නවීන Engineering stack එක නිසා සම්මත ව්‍යාපාරික වෙබ් අඩවි දින 3 සිට 7 දක්වා කාලයකදීත්, සංකීර්ණ Enterprise SaaS හෝ AI පද්ධති දින 10 සිට 21 දක්වා කාලයකදීත් සජීවීව deploy කර අවසන් කෙරේ."
        : "Thanks to our automated GitHub CI/CD pipeline and modern development stack, standard business architectures go live in 3 to 7 business days, while comprehensive enterprise portals are typically delivered in 10 to 21 days."
    }
  ];

  return (
    <section className="w-full bg-neutral-950 border-t border-neutral-850 pt-16 pb-20 px-4 md:px-8 text-neutral-200">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header: High Search-Intent Focus */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isSi ? 'SEO & Lead Magnet Engine' : 'High-Performance Web Architecture'}</span>
          </div>

          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-white font-display">
            {isSi 
              ? 'ඔබේ ව්‍යාපාරය Google හි ඉහළටම ගෙන යන High-Converting Web Architecture' 
              : 'Engineered for Maximum Conversions & Dominant Google Search Authority'}
          </h2>

          <p className="text-neutral-400 text-sm md:text-base leading-relaxed">
            {isSi
              ? 'සාමාන්‍ය වෙබ් අඩවියකට වඩා වැඩි යමක්: ක්ෂණික වේගය, බිල්ට්-ඉන් Google SEO, සජීවී AI Lead Capture සහ විනිවිදභාවයෙන් යුතු පිරිවැය.'
              : 'Beyond standard web design: Sub-second Google Core Web Vitals, native Schema.org structured data, and intelligent conversion funnels tailored to scale.'}
          </p>
        </div>

        {/* Lead Magnet Highlights: 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 hover:border-amber-400/40 transition-colors group">
            <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 mb-4 group-hover:scale-110 transition-transform">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              {isSi ? '0.8s Sub-Second Speed' : '0.8s Sub-Second Speed'}
            </h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              {isSi
                ? 'Google PageSpeed 95+ සහතික ලත් Ultra-fast React/Vite කේතකරණය. බර plugins රහිත ඉහළම කාර්යක්ෂමතාව.'
                : 'Lightweight Vite and React architecture with zero plugin bloat, delivering near-instant page loads that keep visitors engaged.'}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 hover:border-amber-400/40 transition-colors group">
            <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 mb-4 group-hover:scale-110 transition-transform">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              {isSi ? 'Full Schema.org Google SEO' : 'Full Schema.org Google SEO'}
            </h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              {isSi
                ? 'Googlebot සහ Bingbot සඳහා JSON-LD FAQ, ProfessionalService සහ WebApplication rich snippets පෙර-වින්‍යාසගත කර ඇත.'
                : 'Pre-configured JSON-LD rich snippets, semantic OpenGraph tags, and sitemaps that win prominent Google search placement.'}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 hover:border-amber-400/40 transition-colors group">
            <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 mb-4 group-hover:scale-110 transition-transform">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              {isSi ? 'High-Intent Lead Magnet' : 'High-Intent Lead Capture'}
            </h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              {isSi
                ? 'තත්පර 60 කින් පාරිභෝගිකයාගේ අවශ්‍යතාවය හඳුනාගෙන 1-Click WhatsApp හරහා ඔබේ අතටම Lead එක ගෙන එන ස්වයංක්‍රීය පද්ධතිය.'
                : 'Interactive step-by-step concierge funnel that qualifies customer scope and delivers instant inquiries directly to your WhatsApp.'}
            </p>
          </div>
        </div>

        {/* Benchmark Comparison Matrix: Ravana Tech vs Conventional Agencies */}
        <div className="p-6 md:p-8 rounded-2xl bg-neutral-900/40 border border-neutral-800">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Cpu className="w-5 h-5 text-amber-400" />
                <span>{isSi ? 'Ravana Tech vs සාම්ප්‍රදායික ආයතන සැසඳීම' : 'Ravana Tech Architecture vs Conventional Agencies'}</span>
              </h3>
              <p className="text-xs text-neutral-400 mt-1">
                {isSi ? 'නවීන වෙබ් තාක්ෂණයේ වෙනස පැහැදිලිව තේරුම් ගන්න' : 'Engineering benchmarks that impact your bottom-line traffic and sales'}
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 text-xs text-amber-400 font-mono bg-amber-400/10 px-3 py-1.5 rounded-lg border border-amber-400/20 self-start md:self-auto">
              <Globe2 className="w-3.5 h-3.5" />
              <span>{isSi ? 'ජාත්‍යන්තර ප්‍රමිතිය' : 'Global Web Standard'}</span>
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs md:text-sm">
              <thead>
                <tr className="border-b border-neutral-800 text-neutral-400 uppercase tracking-wider text-[11px]">
                  <th className="pb-3 font-semibold">{isSi ? 'විශේෂාංගය' : 'Core Benchmark'}</th>
                  <th className="pb-3 font-bold text-amber-400">Ravana Tech Architecture</th>
                  <th className="pb-3 font-semibold text-neutral-500">{isSi ? 'සාම්ප්‍රදායික WordPress / Wix' : 'Generic WordPress / Wix'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/60 text-neutral-300 font-mono">
                <tr>
                  <td className="py-3.5 font-sans font-medium text-white">{isSi ? 'පිටුව Load වීමේ වේගය' : 'Page Load Speed'}</td>
                  <td className="py-3.5 text-emerald-400 font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>&lt; 0.8s (Instant)</span>
                  </td>
                  <td className="py-3.5 text-neutral-400 flex items-center gap-1.5">
                    <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                    <span>4.2s - 7.5s (Slow)</span>
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 font-sans font-medium text-white">{isSi ? 'Google PageSpeed ලකුණු' : 'Google PageSpeed Score'}</td>
                  <td className="py-3.5 text-emerald-400 font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>95 - 100 / 100</span>
                  </td>
                  <td className="py-3.5 text-neutral-400 flex items-center gap-1.5">
                    <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                    <span>35 - 60 / 100</span>
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 font-sans font-medium text-white">{isSi ? 'Google Rich Snippet SEO' : 'Schema.org JSON-LD SEO'}</td>
                  <td className="py-3.5 text-emerald-400 font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Full Built-in (FAQ & Org)</span>
                  </td>
                  <td className="py-3.5 text-neutral-400 flex items-center gap-1.5">
                    <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                    <span>Basic or Heavy Plugin</span>
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 font-sans font-medium text-white">{isSi ? 'Lead Capturing & WhatsApp' : 'Lead Conversion Engine'}</td>
                  <td className="py-3.5 text-emerald-400 font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>1-Click Direct WhatsApp Concierge</span>
                  </td>
                  <td className="py-3.5 text-neutral-400 flex items-center gap-1.5">
                    <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                    <span>Standard Contact Form</span>
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 font-sans font-medium text-white">{isSi ? 'Cloud Hosting Infrastructure' : 'Hosting Infrastructure'}</td>
                  <td className="py-3.5 text-emerald-400 font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Google Cloud / Firebase Global CDN</span>
                  </td>
                  <td className="py-3.5 text-neutral-400 flex items-center gap-1.5">
                    <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                    <span>Shared CPanel Hosting</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* High-Intent SEO FAQs Accordion (Ranks on Google Search) */}
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-xl md:text-2xl font-bold text-white">
              {isSi ? 'නිතර අසන ප්‍රශ්න (Frequently Asked Questions)' : 'Frequently Asked Questions'}
            </h3>
            <p className="text-xs md:text-sm text-neutral-400">
              {isSi ? 'Google Search වල පාරිභෝගිකයින් නිතර විමසන ගැටලු සහ සෘජු පිළිතුරු' : 'Clear answers to common questions about modern custom web engineering'}
            </p>
          </div>

          <div className="space-y-3 max-w-4xl mx-auto">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div 
                  key={idx}
                  className="rounded-xl border border-neutral-800 bg-neutral-900/60 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between p-4 md:p-5 text-left text-sm md:text-base font-semibold text-neutral-100 hover:text-amber-400 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <span className="p-1 rounded-md bg-neutral-800 text-neutral-300 ml-3 shrink-0">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-5 md:px-5 md:pb-6 text-xs md:text-sm text-neutral-300 leading-relaxed border-t border-neutral-800/60 pt-3">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Lead Magnet Direct Call-To-Action Strip */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-neutral-900 border border-amber-400/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl md:text-2xl font-black text-white">
              {isSi 
                ? 'ඔබේ වෙබ් අඩවියට හෝ ව්‍යාපාරයට Instant Quote එකක් අවශ්‍යද?' 
                : 'Ready to Engineer Your High-Converting Digital Presence?'}
            </h3>
            <p className="text-sm text-neutral-300 max-w-xl">
              {isSi
                ? 'අපගේ Interactive Scoping Engine එකෙන් තත්පර 60 කින් මිල ගණන් සහ තාක්ෂණික සැලැස්ම ගණනය කර ගන්න.'
                : 'Calculate exact pricing and architecture tiers in 60 seconds, or connect directly with our engineering team on WhatsApp.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0 justify-center">
            {onLaunchConcierge && (
              <button
                onClick={() => {
                  sfx.playClick();
                  onLaunchConcierge();
                }}
                className="px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-sm flex items-center gap-2 shadow-lg shadow-amber-400/20 transition-all hover:scale-[1.02]"
              >
                <span>{isSi ? 'Instant Quote හදන්න' : 'Calculate Instant Quote'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            <a
              href="https://wa.me/94770481492?text=Hello%20Ravana%20Tech,%20I%20am%20interested%20in%20a%20high-converting%20custom%20website%20and%20web%20development%20scoping."
              target="_blank"
              rel="noreferrer"
              className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center gap-2 transition-all hover:scale-[1.02]"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Direct</span>
            </a>

            <a
              href="mailto:hello.ravanatech@gmail.com?subject=Web%20Development%20Inquiry%20-%20Ravana%20Tech"
              className="px-4 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-200 text-sm font-semibold flex items-center gap-2 transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>Email</span>
            </a>
          </div>
        </div>

        {/* Global SEO Lead Footer with Local & Global Footprint */}
        <footer className="pt-8 border-t border-neutral-800/80 text-xs text-neutral-500 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-neutral-400">
            <span className="font-bold text-neutral-200">Ravana Tech</span>
            <span>•</span>
            <span>Digital Architecture & AI Studio</span>
            <span>•</span>
            <span>Colombo, Sri Lanka & Worldwide</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-neutral-400">
            <span>Direct WhatsApp: +94 77 048 1492</span>
            <span>•</span>
            <span>hello.ravanatech@gmail.com</span>
            <span>•</span>
            <a 
              href="https://github.com/ravanatech-official/RavanaTech" 
              target="_blank" 
              rel="noreferrer"
              className="hover:text-amber-400 transition-colors flex items-center gap-1"
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
          </div>
        </footer>

      </div>
    </section>
  );
};
