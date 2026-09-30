import { DecisionPathway } from '../types';

export const DECISION_PATHWAYS: DecisionPathway[] = [
  // ----------------------------------------------------
  // PATHWAY 1: NEW WEBSITE & WEB APPLICATIONS
  // ----------------------------------------------------
  {
    id: 'new_website',
    number: 1,
    title: {
      en: 'Option 1: Build a New Website or Web Application',
      si: 'අංක 1: නව වෙබ් අඩවියක් හෝ Web App එකක් නිර්මාණය කරගැනීම',
    },
    subtitle: {
      en: 'Custom digital platforms engineered for conversion, speed, and luxury aesthetics.',
      si: 'පාරිභෝගිකයින් වැඩි කරවන, අති නවීන වේගවත් වෙබ් අඩවි හා මෘදුකාංග පද්ධති.',
    },
    shortDescription: {
      en: 'High-converting corporate sites, SaaS apps, e-commerce stores, and custom platforms.',
      si: 'ව්‍යාපාරික වෙබ් අඩවි, අන්තර්ජාල අලෙවිසැල් සහ විශේෂිත මෘදුකාංග පද්ධති.',
    },
    icon: 'Globe',
    badge: {
      en: 'Digital Architecture',
      si: 'ඩිජිටල් නිර්මාණ ශිල්පය',
    },
    steps: [
      {
        stepIndex: 1,
        stepTitle: {
          en: 'Platform Category',
          si: 'වෙබ් අඩවියේ වර්ගය',
        },
        stepQuestion: {
          en: 'What exact type of digital platform do you want to build?',
          si: 'ඔබට නිර්මාණය කරගැනීමට අවශ්‍ය වන්නේ කුමන ආකාරයේ වෙබ් අඩවියක්ද?',
        },
        avatarSpeech: {
          en: 'Great! Let us choose the primary category for your new digital platform.',
          si: 'විශිෂ්ටයි! ඔබගේ නව වෙබ් අඩවිය හෝ පද්ධතිය අයත් වන ප්‍රධාන වර්ගය තෝරන්න.',
        },
        options: [
          {
            id: 'p1_opt1_business',
            indexNumber: 1,
            title: {
              en: '01. Corporate & Business Presence',
              si: '01. ව්‍යාපාරික හෝ ආයතනික වෙබ් අඩවියක්',
            },
            subtitle: {
              en: 'Showcase your company, services, trust credentials, and capture premium client leads.',
              si: 'ඔබේ ආයතනය, සේවාවන් සහ විශ්වසනීයත්වය විදහා දක්වා පාරිභෝගිකයින් ආකර්ෂණය කරගැනීමට.',
            },
            iconName: 'Building2',
            tag: { en: 'Corporate Presence', si: 'ආයතනික පෙනුම' },
            costWeight: 1.0,
            timelineDays: 10,
          },
          {
            id: 'p1_opt2_ecommerce',
            indexNumber: 2,
            title: {
              en: '02. Modern E-Commerce & Retail Store',
              si: '02. භාණ්ඩ විකුණන නවීන Online Store එකක්',
            },
            subtitle: {
              en: 'Sell products online with cart, card payments, WhatsApp orders, and inventory sync.',
              si: 'භාණ්ඩ විකිණීම, කාඩ්පත් ගෙවීම්, WhatsApp orders සහ තොග පාලනය සහිතව.',
            },
            iconName: 'ShoppingBag',
            tag: { en: 'E-Commerce Engine', si: 'අන්තර්ජාල වෙළඳසැල' },
            costWeight: 1.4,
            timelineDays: 14,
          },
          {
            id: 'p1_opt3_saas',
            indexNumber: 3,
            title: {
              en: '03. Custom SaaS / Web Application Software',
              si: '03. විශේෂිත Web Application හෝ Software එකක්',
            },
            subtitle: {
              en: 'Interactive client dashboards, subscription portal, automated database logic, or web app.',
              si: 'පාරිභෝගික Login ගිණුම්, දත්ත පද්ධති හෝ නවීන මෘදුකාංග විසඳුමක්.',
            },
            iconName: 'Layers',
            tag: { en: 'Custom Software', si: 'විශේෂිත මෘදුකාංගය' },
            costWeight: 2.2,
            timelineDays: 21,
          },
          {
            id: 'p1_opt4_landing',
            indexNumber: 4,
            title: {
              en: '04. Ultra High-Converting Landing Page',
              si: '04. විකුණුම් උපරිම කරන High-Converting Landing Page එකක්',
            },
            subtitle: {
              en: 'Laser-focused single sales funnel engineered to turn advertising traffic into paid buyers.',
              si: 'දැන්වීම් මගින් එන පිරිස සෘජුවම ගනුදෙනුකරුවන් බවට පත්කරන අධි-ප්‍රතිඵලදායී පිටුවක්.',
            },
            iconName: 'Flame',
            tag: { en: 'Sales Funnel', si: 'විකුණුම් Funnel' },
            costWeight: 0.9,
            timelineDays: 7,
          },
          {
            id: 'p1_opt5_personal',
            indexNumber: 5,
            title: {
              en: '05. Personal Brand & Portfolio Showcase',
              si: '05. පුද්ගලික හෝ වෘත්තීය Portfolio අඩවියක්',
            },
            subtitle: {
              en: 'Position yourself as an elite authority, public figure, creator, doctor, or consultant.',
              si: 'ඔබගේ වෘත්තීය හැකියාවන්, සේවාවන් සහ සාර්ථකත්වය ලොවටම ප්‍රදර්ශනය කිරීමට.',
            },
            iconName: 'UserCheck',
            tag: { en: 'Personal Brand', si: 'පුද්ගලික නාමය' },
            costWeight: 0.8,
            timelineDays: 7,
          },
        ],
      },
      {
        stepIndex: 2,
        stepTitle: {
          en: 'Current Project Stage',
          si: 'ඔබේ දැනට පවතින තත්ත්වය',
        },
        stepQuestion: {
          en: 'What stage is your project currently in?',
          si: 'ඔබගේ ව්‍යාපෘතිය දැනට පවතින්නේ කුමන මට්ටමේද?',
        },
        avatarSpeech: {
          en: 'Understood. Now tell me what stage you are currently at, so we can support you smoothly.',
          si: 'පැහැදිලියි. ඔබගේ ව්‍යාපෘතිය දැනට තිබෙන මට්ටම තෝරන්න. කිසිදු තාක්ෂණික දැනුමක් නැති වුවත් අපි සම්පූර්ණයෙන් මගපෙන්වන්නෙමු.',
        },
        options: [
          {
            id: 'p1_s2_idea',
            indexNumber: 1,
            title: {
              en: '01. Just an Idea (Need 100% End-to-End Guidance)',
              si: '01. අදහසක් පමණයි තියෙන්නේ (මුල සිටම මගපෙන්වීම අවශ්‍යයි)',
            },
            subtitle: {
              en: 'No worries at all! Ravana Tech will handle naming, architecture, copy, and complete launch.',
              si: 'කිසිදු ගැටලුවක් නැත. අපි අදහසේ සිට සම්පූර්ණ නිමාව තෙක් සියල්ල සකස් කර දෙන්නෙමු.',
            },
            iconName: 'Lightbulb',
            tag: { en: 'Concept Phase', si: 'ආරම්භක අදියර' },
            costWeight: 1.1,
            timelineDays: 4,
          },
          {
            id: 'p1_s2_ready',
            indexNumber: 2,
            title: {
              en: '02. I Have Content & Logo Ready (Ready to Build)',
              si: '02. ලෝගෝ හා විස්තර සූදානම් (වහාම නිර්මාණය කළ යුතුයි)',
            },
            subtitle: {
              en: 'You have branding or text ready, and need world-class engineering and luxury design.',
              si: 'ඔබ සතුව මූලික විස්තර ඇත. අලංකාරව හා කාර්යක්ෂමව පද්ධතිය සකස් කළ යුතුය.',
            },
            iconName: 'FileCheck',
            tag: { en: 'Assets Ready', si: 'විස්තර සූදානම්' },
            costWeight: 1.0,
            timelineDays: 0,
          },
          {
            id: 'p1_s2_redesign',
            indexNumber: 3,
            title: {
              en: '03. Rebuilding an Old or Slow Existing Website',
              si: '03. දැනට ඇති පැරණි හෝ වේගය මදි වෙබ් අඩවිය අලුත් කරගැනීමට',
            },
            subtitle: {
              en: 'Upgrade outdated design, fix slow load speeds, and skyrocket your conversion rate.',
              si: 'පැරණි වෙබ් අඩවිය ඉවත් කර, අති නවීන වේගවත් පෙනුමක් සහ වැඩි විකුණුම් ලබා ගැනීමට.',
            },
            iconName: 'RefreshCw',
            tag: { en: 'Complete Redesign', si: 'සම්පූර්ණ ප්‍රතිසංස්කරණය' },
            costWeight: 1.2,
            timelineDays: 3,
          },
          {
            id: 'p1_s2_scaling',
            indexNumber: 4,
            title: {
              en: '04. Scaling an Established Business Globally',
              si: '04. දැනටමත් ලාභ ලබන ව්‍යාපාරයක් ලොව පුරා ව්‍යාප්ත කිරීමට',
            },
            subtitle: {
              en: 'Enterprise-grade stability, multi-currency support, and high-traffic optimization.',
              si: 'විශාල පාරිභෝගික පිරිසකට සහ ජාත්‍යන්තර ගෙවීම් සඳහා සුදුසු විශ්වාසනීය පද්ධතියක්.',
            },
            iconName: 'TrendingUp',
            tag: { en: 'Global Scale', si: 'ජාත්‍යන්තර ව්‍යාප්තිය' },
            costWeight: 1.5,
            timelineDays: 7,
          },
          {
            id: 'p1_s2_urgent',
            indexNumber: 5,
            title: {
              en: '05. Urgent Sprint (Need Ready Within 7-10 Days)',
              si: '05. හදිසි අවශ්‍යතාවයක් (දින 7-10ක් ඇතුළත නිම කරගත යුතුයි)',
            },
            subtitle: {
              en: 'Fast-track priority delivery with 24/7 dedicated development sprint.',
              si: 'විශේෂ ප්‍රමුඛතාවය යටතේ කඩිනමින් වැඩ අවසන් කර දෙනු ලැබේ.',
            },
            iconName: 'Zap',
            tag: { en: 'Sprint Delivery', si: 'කඩිනම් සේවාව' },
            costWeight: 1.3,
            timelineDays: -3,
          },
        ],
      },
      {
        stepIndex: 3,
        stepTitle: {
          en: 'Key Features & Integrations',
          si: 'අවශ්‍ය විශේෂ අංග හා පහසුකම්',
        },
        stepQuestion: {
          en: 'Which capability is most important for your users?',
          si: 'ඔබේ වෙබ් අඩවියට ඇතුළත් විය යුතු වඩාත්ම වැදගත් අංගය කුමක්ද?',
        },
        avatarSpeech: {
          en: 'Terrific. Which features should we architect into the platform?',
          si: 'ඉතා හොඳයි. ඔබේ වෙබ් අඩවියට එකතු විය යුතු ප්‍රධාන විශේෂාංගය කුමක්ද?',
        },
        options: [
          {
            id: 'p1_s3_payments',
            indexNumber: 1,
            title: {
              en: '01. Online Card & Bank Payment Gateway',
              si: '01. Visa / Master කාඩ්පත් හෝ බැංකු ගෙවීම් පහසුකම',
            },
            subtitle: {
              en: 'Direct checkout with Sri Lankan (PayHere, WebXpay) or Global (Stripe, PayPal) gateways.',
              si: 'ලංකාවේ හෝ විදේශීය බැංකු කාඩ්පත් හරහා ක්ෂණිකව මුදල් ලබාගැනීමට.',
            },
            iconName: 'CreditCard',
            tag: { en: 'Card Gateway', si: 'කාඩ්පත් ගෙවීම්' },
            costWeight: 1.25,
            timelineDays: 4,
          },
          {
            id: 'p1_s3_whatsapp',
            indexNumber: 2,
            title: {
              en: '02. 1-Click WhatsApp Direct Inquiries & Orders',
              si: '02. WhatsApp හරහා සෘජුවම ඇණවුම් හෝ පණිවිඩ ලබාගැනීම',
            },
            subtitle: {
              en: 'Super convenient for local clients; no login needed, direct conversion into your WhatsApp.',
              si: 'පාරිභෝගිකයින්ට ඉතා පහසුයි; එක ක්ලික් එකකින් WhatsApp වෙත ඇණවුම පැමිණේ.',
            },
            iconName: 'MessageCircle',
            tag: { en: 'WhatsApp Conversion', si: 'WhatsApp සෘජු ඇණවුම්' },
            costWeight: 1.0,
            timelineDays: 2,
          },
          {
            id: 'p1_s3_admin',
            indexNumber: 3,
            title: {
              en: '03. User Login & Easy Admin Dashboard',
              si: '03. පහසු Admin Panel සහ පාරිභෝගික Login ගිණුම්',
            },
            subtitle: {
              en: 'Manage your products, view orders, and edit texts effortlessly from phone or laptop.',
              si: 'ඔබටම තනිවම නිෂ්පාදන වෙනස් කිරීමට හා ඇණවුම් බැලීමට හැකි පහසු පාලක පුවරුවක්.',
            },
            iconName: 'ShieldCheck',
            tag: { en: 'Custom Admin', si: 'පාලක පද්ධතිය' },
            costWeight: 1.3,
            timelineDays: 5,
          },
          {
            id: 'p1_s3_booking',
            indexNumber: 4,
            title: {
              en: '04. Automated Calendar Booking & Invoicing',
              si: '04. ස්වයංක්‍රීය දිනයන් වෙන්කිරීම හා බිල්පත් යැවීම',
            },
            subtitle: {
              en: 'Ideal for doctors, consultancies, salons, villa rentals, and professional services.',
              si: 'වෙලාවන් වෙන්කරවා ගැනීම් සහ ස්වයංක්‍රීය PDF බිල්පත් සකස් කර පාරිභෝගිකයාට යැවීම.',
            },
            iconName: 'CalendarCheck',
            tag: { en: 'Automated Booking', si: 'ස්වයංක්‍රීය වෙන්කිරීම්' },
            costWeight: 1.2,
            timelineDays: 4,
          },
          {
            id: 'p1_s3_minimal',
            indexNumber: 5,
            title: {
              en: '05. Clean, Ultra-Fast & Zero Complexity',
              si: '05. කිසිදු පැටලිල්ලක් නැති සරල, සුපිරි වේගවත් පෙනුම',
            },
            subtitle: {
              en: 'Lightning quick loading, mobile-first perfection, zero headaches for you.',
              si: 'තත්පර 1කින් ලෝඩ් වෙන, ජංගම දුරකථනයට ඉතා පහසු සරල හා අලංකාර නිර්මාණය.',
            },
            iconName: 'Sparkles',
            tag: { en: 'Ultra Fast', si: 'සුපිරි වේගය' },
            costWeight: 0.9,
            timelineDays: 2,
          },
        ],
      },
      {
        stepIndex: 4,
        stepTitle: {
          en: 'Investment Tier & Speed',
          si: 'ආයෝජන මට්ටම හා කාල සීමාව',
        },
        stepQuestion: {
          en: 'Select the tier that best matches your vision and budget:',
          si: 'ඔබගේ බලාපොරොත්තුවට හා අයවැයට වඩාත්ම ගැළපෙන මට්ටම තෝරන්න:',
        },
        avatarSpeech: {
          en: 'Almost there! Select your planned investment tier so we can tailor the architecture.',
          si: 'ඉතා හොඳයි! ඔබගේ ආයෝජනයට වඩාත්ම සුදුසු මට්ටම තෝරන්න. අපි හොඳම විසඳුම ලබා දෙන්නෙමු.',
        },
        options: [
          {
            id: 'p1_s4_starter',
            indexNumber: 1,
            title: {
              en: '01. Starter Sprint (LKR 65,000 - 120,000 / $250 - $450)',
              si: '01. Starter මට්ටම (රු. 65,000 - 120,000 / $250 - $450)',
            },
            subtitle: {
              en: 'Ideal for new startups, small businesses, and quick professional launches.',
              si: 'අලුතින් ආරම්භ කරන ව්‍යාපාර හෝ සරල අවශ්‍යතා සඳහා පරිපූර්ණයි.',
            },
            iconName: 'CheckCircle',
            tag: { en: 'Starter Tier', si: 'මූලික පැකේජය' },
            costWeight: 1.0,
            timelineDays: 7,
          },
          {
            id: 'p1_s4_growth',
            indexNumber: 2,
            title: {
              en: '02. Growth & Scaling (LKR 140,000 - 280,000 / $500 - $950)',
              si: '02. Growth මට්ටම (රු. 140,000 - 280,000 / $500 - $950)',
            },
            subtitle: {
              en: 'Custom luxury branding, high conversion optimization, payment integration, and SEO.',
              si: 'වැඩි දියුණු කළ මට්ටම, ගෙවීම් පද්ධති, අලංකාර පෙනුම සහ Google Search වල මුලට ඒම.',
            },
            iconName: 'Award',
            tag: { en: 'Most Popular', si: 'වඩාත් ජනප්‍රිය' },
            costWeight: 1.6,
            timelineDays: 14,
          },
          {
            id: 'p1_s4_enterprise',
            indexNumber: 3,
            title: {
              en: '03. Enterprise Architecture (LKR 350,000+ / $1,200+)',
              si: '03. Enterprise පූර්ණ විසඳුම (රු. 350,000+ / $1,200+)',
            },
            subtitle: {
              en: 'Full custom software, unlimited scale, advanced database, and dedicated architect support.',
              si: 'විශාල ව්‍යාපාර සඳහා වන පූර්ණ මෘදුකාංග සහ විශේෂිත තාක්ෂණික සහාය.',
            },
            iconName: 'Crown',
            tag: { en: 'Enterprise', si: 'ආයතනික මට්ටම' },
            costWeight: 2.8,
            timelineDays: 25,
          },
          {
            id: 'p1_s4_urgent_pack',
            indexNumber: 4,
            title: {
              en: '04. Urgent Express Delivery (Ready in 5-7 Days)',
              si: '04. කඩිනම් Express සේවාව (දින 5-7ක් ඇතුළත)',
            },
            subtitle: {
              en: 'Fast turnaround for time-sensitive launches, exhibitions, or urgent marketing campaigns.',
              si: 'කාලය ඉතා සීමිත අවස්ථාවලදී උපරිම වේගයෙන් සකස් කර දෙනු ලැබේ.',
            },
            iconName: 'Clock',
            tag: { en: 'Priority Delivery', si: 'ඉක්මන් නිමාව' },
            costWeight: 1.3,
            timelineDays: 5,
          },
          {
            id: 'p1_s4_consult_first',
            indexNumber: 5,
            title: {
              en: '05. Flexible / Discuss with Digital Architect',
              si: '05. අයවැය තවම තීරණය කර නැත (සාකච්ඡා කර තීරණය කරමු)',
            },
            subtitle: {
              en: 'Tell us your budget in the next step and we will formulate the maximum value package.',
              si: 'ඔබේ හැකියාව අනුව උපරිම වටිනාකමක් සහිත සැලසුමක් අපි සකස් කර දෙන්නෙමු.',
            },
            iconName: 'HelpCircle',
            tag: { en: 'Custom Plan', si: 'විශේෂ සැලසුම' },
            costWeight: 1.2,
            timelineDays: 10,
          },
        ],
      },
      {
        stepIndex: 5,
        stepTitle: {
          en: 'Instant Quotation & VIP Dispatch',
          si: 'ක්ෂණික මිල ගණන් සහ සම්බන්ධවීම',
        },
        stepQuestion: {
          en: 'Your customized Ravana Tech blueprint is ready! Review and submit:',
          si: 'ඔබගේ අවශ්‍යතාවයට ගැළපෙන Ravana Tech සැලැස්ම සූදානම්! තහවුරු කරන්න:',
        },
        avatarSpeech: {
          en: 'Your architecture blueprint is generated. You can now send it directly to WhatsApp or request a formal quotation call.',
          si: 'ඔබගේ ව්‍යාපෘති සැලැස්ම සූදානම්. දැන්ම මෙය WhatsApp මගින් අපට යොමු කර හෝ ඊමේල් මගින් මිල ගණන් ලබා ගත හැක.',
        },
        options: [], // Handled by FinalQuotationStep
      },
    ],
  },

  // ----------------------------------------------------
  // PATHWAY 2: AI AUTOMATIONS & SMART SYSTEMS
  // ----------------------------------------------------
  {
    id: 'ai_automation',
    number: 2,
    title: {
      en: 'Option 2: Custom AI Automations & Workflows',
      si: 'අංක 2: AI Automations සහ ස්වයංක්‍රීය පද්ධති',
    },
    subtitle: {
      en: 'Cut operational costs by 80% with intelligent 24/7 autonomous agents and bots.',
      si: 'පැය 24 පුරාම පාරිභෝගිකයින්ට පිළිතුරු දෙන, වැඩ පහසු කරන AI පද්ධති.',
    },
    shortDescription: {
      en: 'AI WhatsApp bots, automated invoicing, lead qualifiers, CRM sync, and custom LLMs.',
      si: 'WhatsApp AI bots, ස්වයංක්‍රීය දත්ත සටහන් සහ පාරිභෝගික කළමනාකරණය.',
    },
    icon: 'Bot',
    badge: {
      en: 'Autonomous AI',
      si: 'ස්වයංක්‍රීය AI',
    },
    steps: [
      {
        stepIndex: 1,
        stepTitle: {
          en: 'Automation Objective',
          si: 'AI අවශ්‍යතාවයේ අරමුණ',
        },
        stepQuestion: {
          en: 'Where does your business currently waste the most time or money?',
          si: 'ඔබේ ව්‍යාපාරයේ වැඩිපුරම කාලය හෝ මහන්සිය වැය වන්නේ කුමන කාර්යයටද?',
        },
        avatarSpeech: {
          en: 'Smart choice. Custom AI automation will save you dozens of hours every single week. What is your primary pain point?',
          si: 'විශිෂ්ට තේරීමක්. AI ස්වයංක්‍රීයකරණය මගින් ඔබේ ව්‍යාපාරයේ කාලය හා මුදල් විශාල වශයෙන් ඉතිරි කරගත හැක. ප්‍රධාන අවශ්‍යතාවය තෝරන්න.',
        },
        options: [
          {
            id: 'p2_s1_whatsapp_bot',
            indexNumber: 1,
            title: {
              en: '01. 24/7 AI WhatsApp & Social Media Customer Agent',
              si: '01. පැය 24 පුරාම ක්‍රියාත්මක AI WhatsApp පාරිභෝගික සහායකයෙක්',
            },
            subtitle: {
              en: 'Replies instantly in Sinhala or English, explains pricing, answers questions, and takes orders.',
              si: 'සිංහලෙන් හෝ ඉංග්‍රීසියෙන් ක්ෂණික පිළිතුරු දෙමින් භාණ්ඩ විස්තර හා ඇණවුම් ලබාගනී.',
            },
            iconName: 'MessageSquareCode',
            tag: { en: 'Instant Replies', si: 'ක්ෂණික පිළිතුරු' },
            costWeight: 1.2,
            timelineDays: 7,
          },
          {
            id: 'p2_s1_data_entry',
            indexNumber: 2,
            title: {
              en: '02. Automated Invoice & Order Processing',
              si: '02. ස්වයංක්‍රීය බිල්පත් සහ ඇණවුම් සටහන් කිරීම',
            },
            subtitle: {
              en: 'Extract customer slips, generate invoices automatically, and update Google Sheets/ERP.',
              si: 'පාරිභෝගික ගෙවීම් රිසිට්පත් කියවා ස්වයංක්‍රීයව බිල්පත් හා ගිණුම් සටහන් කිරීම.',
            },
            iconName: 'FileSpreadsheet',
            tag: { en: 'Paperless Automation', si: 'ස්වයංක්‍රීය ලිපිගොනු' },
            costWeight: 1.1,
            timelineDays: 6,
          },
          {
            id: 'p2_s1_lead_qualifier',
            indexNumber: 3,
            title: {
              en: '03. Intelligent Lead Follow-up & Booking Engine',
              si: '03. පාරිභෝගිකයින් පසුපස ගොස් විකුණුම් තහවුරු කරගැනීම',
            },
            subtitle: {
              en: 'Automatically reminds abandoned inquiries, schedules appointments, and sends reminders.',
              si: 'මිල අසා නිහඬ වූ අයට නැවත පණිවිඩ යවා ඔවුන් සැබෑ ගැනුම්කරුවන් බවට පත්කරයි.',
            },
            iconName: 'UserPlus',
            tag: { en: 'Sales Booster', si: 'විකුණුම් වර්ධකය' },
            costWeight: 1.3,
            timelineDays: 8,
          },
          {
            id: 'p2_s1_content_ai',
            indexNumber: 4,
            title: {
              en: '04. Automated Social Media Content Engine',
              si: '04. ස්වයංක්‍රීය සමාජ මාධ්‍ය පෝස්ට් නිර්මාණය හා පළකිරීම',
            },
            subtitle: {
              en: 'Generates branded graphics, captions, and schedules daily posts automatically across Facebook/IG.',
              si: 'ව්‍යාපාරයට ගැළපෙන පෝස්ට් සහ විස්තර AI මගින් ස්වයංක්‍රීයව සකස් කර පළකිරීම.',
            },
            iconName: 'Share2',
            tag: { en: 'Content Machine', si: 'ස්වයංක්‍රීය පෝස්ට්' },
            costWeight: 1.0,
            timelineDays: 5,
          },
          {
            id: 'p2_s1_custom_brain',
            indexNumber: 5,
            title: {
              en: '05. Private Custom AI Brain for My Business Data',
              si: '05. මගේ ආයතනික දත්ත මත පදනම් වූ විශේෂිත AI මොළයක්',
            },
            subtitle: {
              en: 'Trained exclusively on your PDF manuals, product catalog, and policies with 100% data privacy.',
              si: 'ඔබේම තොරතුරු, නීති රීති හා භාණ්ඩ විස්තර සම්පූර්ණයෙන් කටපාඩම් කරගත් AI මොළයක්.',
            },
            iconName: 'Cpu',
            tag: { en: 'Custom AI', si: 'පුද්ගලික AI' },
            costWeight: 1.8,
            timelineDays: 12,
          },
        ],
      },
      {
        stepIndex: 2,
        stepTitle: {
          en: 'Platform Channels',
          si: 'සම්බන්ධ කළ යුතු මාධ්‍යයන්',
        },
        stepQuestion: {
          en: 'Where should your AI system be deployed?',
          si: 'මෙම AI පද්ධතිය ක්‍රියාත්මක විය යුත්තේ කොතැනද?',
        },
        avatarSpeech: {
          en: 'Excellent. Which communication channel does your business use most?',
          si: 'ඉතා හොඳයි. ඔබේ පාරිභෝගිකයින් බහුලවම ඔබව අමතන මාධ්‍යය කුමක්ද?',
        },
        options: [
          {
            id: 'p2_s2_whatsapp',
            indexNumber: 1,
            title: {
              en: '01. WhatsApp Official Business API',
              si: '01. WhatsApp Business පද්ධතිය',
            },
            subtitle: {
              en: 'The #1 preferred channel in Sri Lanka and globally for instant communication.',
              si: 'ලංකාවේ සහ ලොව පුරා පාරිභෝගිකයින් සමඟ පහසුවෙන්ම ගනුදෙනු කරන ප්‍රධාන මාර්ගය.',
            },
            iconName: 'PhoneCall',
            tag: { en: 'Most Popular', si: 'වඩාත් ජනප්‍රිය' },
            costWeight: 1.0,
            timelineDays: 3,
          },
          {
            id: 'p2_s2_website_widget',
            indexNumber: 2,
            title: {
              en: '02. Directly on Our Website / Web App',
              si: '02. අපගේ වෙබ් අඩවිය තුළ සජීවීව (Live Web Widget)',
            },
            subtitle: {
              en: 'Floating chat widget on your website that answers visitors in real-time.',
              si: 'වෙබ් අඩවියට එන අයට ක්ෂණිකව උදව් කරන ආකර්ෂණීය Chat සහායකයෙක්.',
            },
            iconName: 'Globe',
            tag: { en: 'Web Native', si: 'වෙබ් සහායක' },
            costWeight: 0.9,
            timelineDays: 2,
          },
          {
            id: 'p2_s2_omnichannel',
            indexNumber: 3,
            title: {
              en: '03. Multi-Channel (WhatsApp + FB Messenger + Instagram)',
              si: '03. සියල්ල එකට (WhatsApp + Facebook + Instagram)',
            },
            subtitle: {
              en: 'One central AI brain managing customer messages across all your social channels.',
              si: 'සියලුම සමාජ මාධ්‍ය පණිවිඩ එකම තැනකින් කළමනාකරණය කරන AI පද්ධතියක්.',
            },
            iconName: 'Network',
            tag: { en: 'Omni-Channel', si: 'සම්පූර්ණ පද්ධතිය' },
            costWeight: 1.4,
            timelineDays: 5,
          },
          {
            id: 'p2_s2_sheets_crm',
            indexNumber: 4,
            title: {
              en: '04. Internal Workflows (Google Sheets, Notion, ERP)',
              si: '04. අභ්‍යන්තර කාර්යාල වැඩ (Google Sheets, CRM, ERP)',
            },
            subtitle: {
              en: 'Connect internal tools to run on autopilot without human intervention.',
              si: 'දත්ත සටහන් කිරීම් සහ ආයතනික වැඩ ස්වයංක්‍රීයව පසුබිමේ සිදුවන ලෙස සකස් කිරීම.',
            },
            iconName: 'Database',
            tag: { en: 'Internal Automation', si: 'කාර්යාලීය පහසුව' },
            costWeight: 1.1,
            timelineDays: 4,
          },
          {
            id: 'p2_s2_not_sure',
            indexNumber: 5,
            title: {
              en: '05. Recommend the Best Setup for My Business',
              si: '05. මගේ ව්‍යාපාරයට වඩාත්ම ගැළපෙන දේ ඔබම තෝරා දෙන්න',
            },
            subtitle: {
              en: 'Our architect will audit your setup and implement the highest ROI solution.',
              si: 'අපගේ Digital Architect විසින් ඔබේ ව්‍යාපාරය පරීක්ෂා කර හොඳම දේ ලබාදෙනු ඇත.',
            },
            iconName: 'Sparkles',
            tag: { en: 'Architect Audit', si: 'විශේෂඥ උපදෙස්' },
            costWeight: 1.0,
            timelineDays: 3,
          },
        ],
      },
      {
        stepIndex: 3,
        stepTitle: {
          en: 'Language & Capabilities',
          si: 'භාෂාව සහ සන්නිවේදනය',
        },
        stepQuestion: {
          en: 'How should your AI communicate with your clients?',
          si: 'ඔබේ AI සහායකයා පාරිභෝගිකයින් සමඟ කතා කළ යුත්තේ කුමන භාෂාවෙන්ද?',
        },
        avatarSpeech: {
          en: 'What language capabilities do your customers expect?',
          si: 'ඔබේ පාරිභෝගිකයින් වැඩිපුරම භාවිත කරන භාෂාව තෝරන්න.',
        },
        options: [
          {
            id: 'p2_s3_bilingual',
            indexNumber: 1,
            title: {
              en: '01. Bilingual (Fluent Sinhala + English / Singlish)',
              si: '01. සිංහල + ඉංග්‍රීසි + සිංග්ලිෂ් (Fluent Bilingual)',
            },
            subtitle: {
              en: 'Understands natural Sri Lankan colloquial phrases, Sinhala font, and English seamlessly.',
              si: 'ලංකාවේ මිනිසුන් ලියන සිංහල, Singlish සහ ඉංග්‍රීසි සියල්ල 100% පැහැදිලිව තේරුම් ගනී.',
            },
            iconName: 'Languages',
            tag: { en: 'Local Intelligence', si: 'දේශීය බුද්ධිය' },
            costWeight: 1.1,
            timelineDays: 3,
          },
          {
            id: 'p2_s3_english_global',
            indexNumber: 2,
            title: {
              en: '02. Pure English (Global / International Audience)',
              si: '02. පිරිසිදු ඉංග්‍රීසි (ජාත්‍යන්තර පාරිභෝගිකයින් සඳහා)',
            },
            subtitle: {
              en: 'Polished, high-authority tone tailored for US, UK, Australia, and European clientele.',
              si: 'විදේශීය රටවල ගනුදෙනුකරුවන් ආකර්ෂණය කරගැනීමට උසස් මට්ටමේ ඉංග්‍රීසි භාෂාවෙන්.',
            },
            iconName: 'Globe2',
            tag: { en: 'Global English', si: 'ජාත්‍යන්තර' },
            costWeight: 1.0,
            timelineDays: 2,
          },
          {
            id: 'p2_s3_voice_text',
            indexNumber: 3,
            title: {
              en: '03. Voice Notes + Text (Listen & Reply with Voice)',
              si: '03. Voice Messages අසා නැවත Voice එකකින්ම පිළිතුරු දීම',
            },
            subtitle: {
              en: 'Customers send WhatsApp voice clips; AI transcribes, understands, and replies naturally.',
              si: 'පාරිභෝගිකයා WhatsApp Voice එකක් දැමූ විට, එය අසා AI සහායකයා කටහඬින්ම පිළිතුරු දෙයි.',
            },
            iconName: 'Mic',
            tag: { en: 'Voice AI', si: 'කටහඬින් පිළිතුරු' },
            costWeight: 1.5,
            timelineDays: 6,
          },
          {
            id: 'p2_s3_photo_reader',
            indexNumber: 4,
            title: {
              en: '04. Image & Bank Slip Recognition',
              si: '04. පින්තූර හා බැංකු රිසිට්පත් කියවීමේ හැකියාව',
            },
            subtitle: {
              en: 'Verifies transfer amounts, account numbers, and detects fake payment screenshots.',
              si: 'බැංකු ස්ලිප් එකක මුදල සහ ගිණුම් අංකය හඳුනාගෙන ව්‍යාජ රිසිට්පත් වළක්වයි.',
            },
            iconName: 'Eye',
            tag: { en: 'Vision AI', si: 'Vision AI' },
            costWeight: 1.3,
            timelineDays: 4,
          },
          {
            id: 'p2_s3_simple_text',
            indexNumber: 5,
            title: {
              en: '05. Simple, Fast & Clear Text Only',
              si: '05. සරල, පැහැදිලි කෙටි පණිවිඩ පමණක්',
            },
            subtitle: {
              en: 'Straightforward information without unneeded bells and whistles.',
              si: 'අනවශ්‍ය සංකීර්ණතා වලින් තොර කෙටි හා පැහැදිලි පිළිතුරු පමණි.',
            },
            iconName: 'Check',
            tag: { en: 'Simple & Clean', si: 'සරල හා පැහැදිලි' },
            costWeight: 0.8,
            timelineDays: 1,
          },
        ],
      },
      {
        stepIndex: 4,
        stepTitle: {
          en: 'Automation Budget & Deployment',
          si: 'ආයෝජනය සහ ක්‍රියාත්මක කිරීමේ සැලසුම',
        },
        stepQuestion: {
          en: 'What is your preferred deployment tier for the AI system?',
          si: 'ඔබගේ AI පද්ධතිය සඳහා වඩාත්ම සුදුසු අයවැය මට්ටම කුමක්ද?',
        },
        avatarSpeech: {
          en: 'Choose your deployment tier to formulate your final quotation.',
          si: 'ඔබේ ව්‍යාපාරයට ගැළපෙන අයවැය මට්ටම තෝරන්න.',
        },
        options: [
          {
            id: 'p2_s4_starter_bot',
            indexNumber: 1,
            title: {
              en: '01. Fast WhatsApp AI Setup (LKR 45,000 - 85,000 / $180 - $350)',
              si: '01. මූලික WhatsApp AI (රු. 45,000 - 85,000 / $180 - $350)',
            },
            subtitle: {
              en: 'Trained on your core business FAQs, ready in under 5 business days.',
              si: 'දින 5ක් ඇතුළත ඔබේ ප්‍රධාන තොරතුරු සහිතව ක්ෂණිකව සකස් කර දෙනු ලැබේ.',
            },
            iconName: 'Zap',
            tag: { en: 'Starter Bot', si: 'මූලික Bot' },
            costWeight: 1.0,
            timelineDays: 5,
          },
          {
            id: 'p2_s4_pro_automation',
            indexNumber: 2,
            title: {
              en: '02. Pro Sales & Order AI (LKR 95,000 - 180,000 / $380 - $700)',
              si: '02. Pro මට්ටම (රු. 95,000 - 180,000 / $380 - $700)',
            },
            subtitle: {
              en: 'Handles full catalog orders, slip verification, Google Sheet logging, and follow-ups.',
              si: 'ඇණවුම් ගැනීම, රිසිට්පත් පරීක්ෂාව සහ විකුණුම් කළමනාකරණය සහිත සම්පූර්ණ පද්ධතිය.',
            },
            iconName: 'Target',
            tag: { en: 'Pro Tier', si: 'Pro පද්ධතිය' },
            costWeight: 1.5,
            timelineDays: 9,
          },
          {
            id: 'p2_s4_enterprise_brain',
            indexNumber: 3,
            title: {
              en: '03. Full Custom Enterprise AI Ecosystem (LKR 250,000+ / $1,000+)',
              si: '03. Enterprise පූර්ණ AI පද්ධතිය (රු. 250,000+ / $1,000+)',
            },
            subtitle: {
              en: 'End-to-end multi-agent orchestration, ERP integrations, and custom database reasoning.',
              si: 'විශාල සමාගම් සඳහා වන පූර්ණ ස්වයංක්‍රීය මෘදුකාංග පද්ධතිය.',
            },
            iconName: 'Cpu',
            tag: { en: 'Enterprise', si: 'Enterprise' },
            costWeight: 2.5,
            timelineDays: 16,
          },
          {
            id: 'p2_s4_monthly_managed',
            indexNumber: 4,
            title: {
              en: '04. Fully Managed Service (Zero Maintenance Hassle)',
              si: '04. නඩත්තු කිරීම් සියල්ල අප විසින්ම බලාගන්නා ක්‍රමය',
            },
            subtitle: {
              en: 'We continuously train, update, and monitor the AI so you never touch code.',
              si: 'ඔබ කිසිවක් කිරීමට අවශ්‍ය නැත; AI පද්ධතිය අලුත් කිරීම් අප විසින්ම සිදු කරනු ලැබේ.',
            },
            iconName: 'Shield',
            tag: { en: 'Managed Care', si: 'පූර්ණ අධීක්ෂණය' },
            costWeight: 1.2,
            timelineDays: 7,
          },
          {
            id: 'p2_s4_discuss_ai',
            indexNumber: 5,
            title: {
              en: '05. Discuss with Digital Architect First',
              si: '05. මිල ගණන් පසුව තීරණය කරමු (සාකච්ඡා කිරීමට අවශ්‍යයි)',
            },
            subtitle: {
              en: 'Let us demo the exact capability before you commit to anything.',
              si: 'කිසිදු මුදලක් ගෙවීමට පෙර AI එක ක්‍රියා කරන ආකාරය සජීවීව බලා තීරණය කරමු.',
            },
            iconName: 'HelpCircle',
            tag: { en: 'Free Demo', si: 'නොමිලේ Demo එකක්' },
            costWeight: 1.0,
            timelineDays: 5,
          },
        ],
      },
      {
        stepIndex: 5,
        stepTitle: {
          en: 'Instant AI Blueprint & Quotation',
          si: 'AI පද්ධති සැලැස්ම සහ සම්බන්ධවීම',
        },
        stepQuestion: {
          en: 'Your custom AI automation blueprint is generated! Ready to launch:',
          si: 'ඔබගේ AI ස්වයංක්‍රීය පද්ධති සැලැස්ම සූදානම්! තහවුරු කරන්න:',
        },
        avatarSpeech: {
          en: 'Your AI architecture plan is formulated. Click below to connect with us directly or receive your proposal.',
          si: 'ඔබගේ AI සැලැස්ම සූදානම්. දැන්ම WhatsApp මගින් හෝ ඊමේල් මගින් සම්බන්ධ වන්න.',
        },
        options: [],
      },
    ],
  },

  // ----------------------------------------------------
  // PATHWAY 3: CONCEPTUAL SITES & LIVE SHOWCASES
  // ----------------------------------------------------
  {
    id: 'conceptual_showcase',
    number: 3,
    title: {
      en: 'Option 3: Explore Conceptual Demos & Live Showcases',
      si: 'අංක 3: සජීවී ආදර්ශක නිර්මාණ (Live Conceptual Demos) නැරඹීම',
    },
    subtitle: {
      en: 'Experience our high-converting conceptual platforms built with luxury aesthetics and speed.',
      si: 'අප විසින් නිර්මාණය කර ඇති සුපිරි වේගවත් හා ආකර්ෂණීය ආදර්ශක අඩවි සජීවීව බලන්න.',
    },
    shortDescription: {
      en: 'Interactive live simulations: Luxury Villas, FinTech, Modern E-Commerce, and Telemedicine.',
      si: 'සංචාරක හෝටල්, මුල්‍ය තාක්ෂණික, ඊ-කොමර්ස් සහ වෛද්‍ය ක්ෂේත්‍රයේ සජීවී Demos.',
    },
    icon: 'Eye',
    badge: {
      en: 'Live Showcase',
      si: 'සජීවී ආදර්ශක',
    },
    steps: [
      {
        stepIndex: 1,
        stepTitle: {
          en: 'Select Industry Showcase',
          si: 'නැරඹීමට අවශ්‍ය ක්ෂේත්‍රය තෝරන්න',
        },
        stepQuestion: {
          en: 'Which conceptual platform would you like to explore interactively?',
          si: 'ඔබට සජීවීව අත්හදා බැලීමට අවශ්‍ය ආදර්ශක නිර්මාණය කුමක්ද?',
        },
        avatarSpeech: {
          en: 'Welcome to our gallery of conceptual platforms. Pick an industry to see our high-converting digital architecture in action.',
          si: 'අපගේ ආදර්ශක නිර්මාණ නැරඹීමට සාදරයෙන් පිළිගනිමු. ඔබට ගැළපෙන ක්ෂේත්‍රය තෝරන්න.',
        },
        options: [
          {
            id: 'p3_s1_villa',
            indexNumber: 1,
            title: {
              en: '01. Aura Luxe Villas & Private Safari Concierge',
              si: '01. Aura Luxury Villas & Safari Concierge (සංචාරක හා හෝටල්)',
            },
            subtitle: {
              en: 'Ultra-luxury booking engine, 360 villa showcase, currency converter, and automated VIP reservation.',
              si: 'සුඛෝපභෝගී හෝටල් කාමර වෙන්කිරීම්, ඩොලර් ගෙවීම් සහ WhatsApp VIP සම්බන්ධතාවය.',
            },
            iconName: 'Compass',
            tag: { en: 'Hospitality Demo', si: 'හෝටල් ආදර්ශකය' },
            costWeight: 1.3,
            timelineDays: 10,
          },
          {
            id: 'p3_s1_fintech',
            indexNumber: 2,
            title: {
              en: '02. Kavacha Enterprise FinTech & Payments Engine',
              si: '02. Kavacha FinTech & Global Payments (මුල්‍ය හා තාක්ෂණික)',
            },
            subtitle: {
              en: 'Real-time telemetry, zero-latency payment processing, fraud telemetry, and dark luxury UI.',
              si: 'අති නවීන මුල්‍ය හා ගෙවීම් පද්ධති, ආරක්ෂිත Dashboard සහ දත්ත කළමනාකරණය.',
            },
            iconName: 'CreditCard',
            tag: { en: 'FinTech Demo', si: 'මුල්‍ය ආදර්ශකය' },
            costWeight: 1.8,
            timelineDays: 14,
          },
          {
            id: 'p3_s1_ceylon_retail',
            indexNumber: 3,
            title: {
              en: '03. Ceylon Silk & Spice Global E-Commerce Store',
              si: '03. Ceylon Silk & Spice E-Commerce (අන්තර්ජාල වෙළඳසැල)',
            },
            subtitle: {
              en: 'High-converting luxury retail with instant checkout, currency auto-detection, and fast load.',
              si: 'ජාත්‍යන්තර මට්ටමේ අන්තර්ජාල වෙළඳසැලක්, ක්ෂණික ගෙවීම් හා ජංගම දුරකථන පහසුව.',
            },
            iconName: 'ShoppingBag',
            tag: { en: 'Retail Demo', si: 'වෙළඳසැල් ආදර්ශකය' },
            costWeight: 1.4,
            timelineDays: 12,
          },
          {
            id: 'p3_s1_telemedicine',
            indexNumber: 4,
            title: {
              en: '04. Helix Telemedicine & AI Clinic Scheduler',
              si: '04. Helix Telemedicine Clinic (වෛද්‍ය හා රෝහල් වෙන්කිරීම්)',
            },
            subtitle: {
              en: 'Doctor discovery, instant video call consultation booking, and digital prescription vault.',
              si: 'වෛද්‍යවරුන් හමුවීමට වෙලාවන් වෙන්කිරීම හා බෙහෙත් වට්ටෝරු සටහන් කිරීම.',
            },
            iconName: 'HeartPulse',
            tag: { en: 'Healthcare Demo', si: 'වෛද්‍ය ආදර්ශකය' },
            costWeight: 1.5,
            timelineDays: 12,
          },
          {
            id: 'p3_s1_real_estate',
            indexNumber: 5,
            title: {
              en: '05. Apex Luxury Real Estate & Property Showcase',
              si: '05. Apex Luxury Real Estate (ඉඩම් හා නිවාස විකිණීම)',
            },
            subtitle: {
              en: 'Architectural floor plans, drone photography layouts, mortgage estimator, and instant agent WhatsApp.',
              si: 'ඉඩම් හා නිවාස අලෙවිය, ණය මුදල් ගණනය කිරීම් සහ සෘජු විකුණුම්.',
            },
            iconName: 'Building',
            tag: { en: 'Real Estate Demo', si: 'ඉඩම් ආදර්ශකය' },
            costWeight: 1.3,
            timelineDays: 10,
          },
        ],
      },
      {
        stepIndex: 2,
        stepTitle: {
          en: 'Interactive Showcase Preview',
          si: 'සජීවී ආදර්ශක පරීක්ෂාව',
        },
        stepQuestion: {
          en: 'What feature of our conceptual demo impressed you the most?',
          si: 'මෙම ආදර්ශකයේ ඔබට වඩාත්ම ආකර්ෂණීය වූ අංගය කුමක්ද?',
        },
        avatarSpeech: {
          en: 'Take a close look at our architectural craft. Which element matters most for your brand?',
          si: 'අපගේ නිර්මාණයේ විශේෂතා නිරීක්ෂණය කරන්න. ඔබේ ව්‍යාපාරයට වඩාත්ම අවශ්‍ය දේ තෝරන්න.',
        },
        options: [
          {
            id: 'p3_s2_speed',
            indexNumber: 1,
            title: {
              en: '01. Sub-second Instant Page Speed (Zero Lag)',
              si: '01. ඇසිපිය හෙළන සැණින් ලෝඩ් වන සුපිරි වේගය',
            },
            subtitle: {
              en: 'Engineered with clean code, modern bundlers, and zero bloatware.',
              si: 'පාරිභෝගිකයාට කිසිදු ප්‍රමාදයකින් තොරව ක්ෂණිකව විවෘත වන සුපිරි වේගය.',
            },
            iconName: 'Zap',
            tag: { en: 'Hyper Speed', si: 'සුපිරි වේගය' },
            costWeight: 1.0,
            timelineDays: 2,
          },
          {
            id: 'p3_s2_luxury_ui',
            indexNumber: 2,
            title: {
              en: '02. Luxury Visual Aesthetics & High-End Branding',
              si: '02. සුඛෝපභෝගී පෙනුම සහ ජාත්‍යන්තර මට්ටමේ නිමාව',
            },
            subtitle: {
              en: 'Custom typography, harmonious colors, and distinctive editorial layout that beats competitors.',
              si: 'තරඟකරුවන් අතර ඔබේ ව්‍යාපාරය කැපී පෙනෙන සුපිරි ගෞරවනීය පෙනුම.',
            },
            iconName: 'Sparkles',
            tag: { en: 'High Aesthetics', si: 'උසස් නිමාව' },
            costWeight: 1.2,
            timelineDays: 4,
          },
          {
            id: 'p3_s2_frictionless_order',
            indexNumber: 3,
            title: {
              en: '03. Frictionless 1-Click Ordering & Booking',
              si: '03. පාරිභෝගිකයාට ඉතා පහසුවෙන් ඇණවුම් කළ හැකි සරල බව',
            },
            subtitle: {
              en: 'Zero confusion, simple steps, leading straight to WhatsApp or payment.',
              si: 'කිසිදු පැටලිල්ලක් නැතිව පාරිභෝගිකයා පහසුවෙන්ම ඇණවුම තහවුරු කරයි.',
            },
            iconName: 'CheckCircle2',
            tag: { en: 'High Conversion', si: 'ඉහළ විකුණුම්' },
            costWeight: 1.1,
            timelineDays: 3,
          },
          {
            id: 'p3_s2_mobile_touch',
            indexNumber: 4,
            title: {
              en: '04. Flawless Smartphone / Mobile Touch Experience',
              si: '04. ඕනෑම Smart Phone එකකට 100% පරිපූර්ණව ගැළපීම',
            },
            subtitle: {
              en: 'Over 85% of traffic is mobile; we design mobile-first so buttons and text are effortless.',
              si: 'ස්මාර්ට්ෆෝන් භාවිත කරන අයට ඉතාම පහසුවෙන් සියල්ල දැකබලා ගත හැක.',
            },
            iconName: 'Smartphone',
            tag: { en: 'Mobile Perfect', si: 'දුරකථනයට පහසුයි' },
            costWeight: 1.0,
            timelineDays: 2,
          },
          {
            id: 'p3_s2_all_features',
            indexNumber: 5,
            title: {
              en: '05. The Complete Package (Speed + Luxury + Conversion)',
              si: '05. සියලුම ගුණාංග එකට (වේගය + අලංකාරය + විකුණුම්)',
            },
            subtitle: {
              en: 'I want this exact caliber of digital architecture applied to my business.',
              si: 'මගේ ව්‍යාපාරයටත් හරියටම මෙවැනිම උසස් තත්ත්වයේ නිර්මාණයක් අවශ්‍යයි.',
            },
            iconName: 'Crown',
            tag: { en: 'Full Caliber', si: 'පූර්ණ ගුණාංග' },
            costWeight: 1.4,
            timelineDays: 5,
          },
        ],
      },
      {
        stepIndex: 3,
        stepTitle: {
          en: 'Adaptation for Your Business',
          si: 'ඔබේ ව්‍යාපාරයට ගැළපෙන පරිදි සකස් කිරීම',
        },
        stepQuestion: {
          en: 'How would you like Ravana Tech to adapt this architecture for you?',
          si: 'මෙවැනි නිර්මාණයක් ඔබේ ව්‍යාපාරයට සකස් කර දෙන්නේ කෙසේද?',
        },
        avatarSpeech: {
          en: 'We can adapt any of these conceptual frameworks directly to your logo and products.',
          si: 'මෙම ඕනෑම ආදර්ශකයක් ඔබේ නම සහ විස්තර සහිතව සකස් කර දිය හැක.',
        },
        options: [
          {
            id: 'p3_s3_exact_template',
            indexNumber: 1,
            title: {
              en: '01. Use This Exact Model (Swap with My Logo & Products)',
              si: '01. මෙම සැලැස්මම මගේ ව්‍යාපාරයට සකස් කර දෙන්න (Fast Launch)',
            },
            subtitle: {
              en: 'Fastest and most cost-effective turnaround; launch in as few as 5-7 business days.',
              si: 'අඩුම වියදමකින් හා දින කිහිපයකින් ඉතා ඉක්මනින් නිම කරගත හැකි ක්‍රමය.',
            },
            iconName: 'Copy',
            tag: { en: 'Fast Adaptation', si: 'කඩිනම් සකස් කිරීම' },
            costWeight: 0.9,
            timelineDays: 6,
          },
          {
            id: 'p3_s3_custom_spin',
            indexNumber: 2,
            title: {
              en: '02. Tailor Custom Colors & Specific Workflows for Me',
              si: '02. මගේම කැමැත්ත අනුව පාට සහ වෙනස්කම් සිදු කර දෙන්න',
            },
            subtitle: {
              en: 'Match your exact brand palette, unique payment methods, and custom forms.',
              si: 'ඔබ කැමති වර්ණ, අකුරු සහ සුවිශේෂී අවශ්‍යතා අනුව වෙනස් කරනු ලැබේ.',
            },
            iconName: 'Palette',
            tag: { en: 'Customized', si: 'වෙනස්කම් සහිතයි' },
            costWeight: 1.2,
            timelineDays: 9,
          },
          {
            id: 'p3_s3_hybrid_ai',
            indexNumber: 3,
            title: {
              en: '03. Add Custom AI Automation & WhatsApp Bot to This',
              si: '03. මේ සමඟම AI ස්වයංක්‍රීය WhatsApp සහායකයෙකුත් එකතු කරන්න',
            },
            subtitle: {
              en: 'Combine visual luxury with 24/7 intelligent automated customer service.',
              si: 'අලංකාර වෙබ් අඩවිය සමඟ පැය 24 පුරාම වැඩ කරන AI සහායකයෙක්ද ලැබේ.',
            },
            iconName: 'Bot',
            tag: { en: 'Hybrid Power', si: 'ද්විත්ව බලය' },
            costWeight: 1.5,
            timelineDays: 12,
          },
          {
            id: 'p3_s3_unlimited_scale',
            indexNumber: 4,
            title: {
              en: '04. Scale Up to Massive Enterprise Portal',
              si: '04. ලොකුම සමාගමක් මෙන් පුළුල් මෘදුකාංගයක් බවට පත් කරන්න',
            },
            subtitle: {
              en: 'Multiple branches, staff logins, automated supplier inventory, and CRM.',
              si: 'ශාඛා කිහිපයක්, සේවක ලොගින් සහ සියලුම තොරතුරු කළමනාකරණය කිරීමට.',
            },
            iconName: 'Server',
            tag: { en: 'Enterprise Portal', si: 'විශාල පද්ධතිය' },
            costWeight: 2.2,
            timelineDays: 20,
          },
          {
            id: 'p3_s3_let_architect_decide',
            indexNumber: 5,
            title: {
              en: '05. Advise Me on What Is Best for My Budget',
              si: '05. මගේ වියදමට ගැළපෙන හොඳම දේ තීරණය කර දෙන්න',
            },
            subtitle: {
              en: 'We will present 2-3 tailored options that maximize your return on investment.',
              si: 'ඔබට වියදම් කළ හැකි මුදල අනුව වඩාත්ම ලාභදායී විසඳුම අපි ලබා දෙන්නෙමු.',
            },
            iconName: 'Sparkle',
            tag: { en: 'Best ROI', si: 'හොඳම විසඳුම' },
            costWeight: 1.0,
            timelineDays: 7,
          },
        ],
      },
      {
        stepIndex: 4,
        stepTitle: {
          en: 'Timeline & Project Urgency',
          si: 'අවශ්‍ය කාල සීමාව හා ප්‍රමුඛතාවය',
        },
        stepQuestion: {
          en: 'When would you like this platform launched?',
          si: 'මෙම වෙබ් අඩවිය හෝ පද්ධතිය ඔබට අවශ්‍ය කවදාද?',
        },
        avatarSpeech: {
          en: 'When is your ideal target launch date?',
          si: 'ඔබ බලාපොරොත්තු වන දිනය කුමක්ද?',
        },
        options: [
          {
            id: 'p3_s4_within_7days',
            indexNumber: 1,
            title: {
              en: '01. Within 7 Days (Sprint Priority Delivery)',
              si: '01. දින 7ක් ඇතුළත (ඉතා කඩිනමින්)',
            },
            subtitle: {
              en: 'Rapid deployment sprint for immediate business needs.',
              si: 'හදිසි අවශ්‍යතාවයක් සඳහා වහාම ක්‍රියාත්මක වීම.',
            },
            iconName: 'Zap',
            tag: { en: '7 Day Sprint', si: 'දින 7' },
            costWeight: 1.25,
            timelineDays: 7,
          },
          {
            id: 'p3_s4_standard_14days',
            indexNumber: 2,
            title: {
              en: '02. 2 Weeks (Recommended Standard Pace)',
              si: '02. සති 2ක් ඇතුළත (සාමාන්‍ය සම්මත කාලය)',
            },
            subtitle: {
              en: 'Ample time for revision rounds, testing, and flawless launch.',
              si: 'හොඳින් පරීක්ෂා කර, සියලු අඩුපාඩු මගහරවා උසස්ම තත්ත්වයෙන් නිම කිරීමට.',
            },
            iconName: 'Calendar',
            tag: { en: 'Standard', si: 'සම්මත කාලය' },
            costWeight: 1.0,
            timelineDays: 14,
          },
          {
            id: 'p3_s4_within_month',
            indexNumber: 3,
            title: {
              en: '03. Within 3-4 Weeks (Comprehensive Project)',
              si: '03. සති 3-4ක් ඇතුළත (සවිස්තරාත්මක ව්‍යාපෘතියක්)',
            },
            subtitle: {
              en: 'Includes custom illustrations, copywriting, and multi-tier integrations.',
              si: 'සියලුම විස්තර හා අංග සම්පූර්ණව ඉතා උසස් අන්දමින් සකස් කිරීමට.',
            },
            iconName: 'Clock',
            tag: { en: 'Deep Polish', si: 'පූර්ණ නිමාව' },
            costWeight: 1.1,
            timelineDays: 24,
          },
          {
            id: 'p3_s4_flexible',
            indexNumber: 4,
            title: {
              en: '04. Flexible Timeline (Quality & Perfection First)',
              si: '04. කාලය ප්‍රශ්නයක් නැත (උසස්ම නිමාව වැදගත්)',
            },
            subtitle: {
              en: 'Focus purely on creating an unforgettable digital masterpiece.',
              si: 'කාලයට වඩා වැදගත් වන්නේ 100%ක්ම විශිෂ්ට නිමාවක් ලබා ගැනීමයි.',
            },
            iconName: 'CheckCheck',
            tag: { en: 'Quality First', si: 'උසස්ම තත්ත්වය' },
            costWeight: 1.0,
            timelineDays: 14,
          },
          {
            id: 'p3_s4_quote_only',
            indexNumber: 5,
            title: {
              en: '05. Just Generating a Quotation for Now',
              si: '05. දැනට මිල ගණන් දැනගැනීමට පමණයි (Quotation Only)',
            },
            subtitle: {
              en: 'No obligation; receive a transparent quotation you can take to your team.',
              si: 'කිසිදු බලපෑමකින් තොරව නිවැරදි මිල ගණන් ලේඛනයක් ලබා ගැනීමට.',
            },
            iconName: 'FileText',
            tag: { en: 'Instant Quote', si: 'මිල ගණන් පමණයි' },
            costWeight: 1.0,
            timelineDays: 10,
          },
        ],
      },
      {
        stepIndex: 5,
        stepTitle: {
          en: 'Instant Showcase Blueprint & Quote',
          si: 'ආදර්ශක සැලැස්ම සහ මිල ගණන්',
        },
        stepQuestion: {
          en: 'Your customized Conceptual Blueprint is ready to deploy:',
          si: 'ඔබගේ ආදර්ශක සැලැස්ම සූදානම්! තහවුරු කරන්න:',
        },
        avatarSpeech: {
          en: 'Your showcase blueprint is ready. Let us bring this vision to life for your brand.',
          si: 'ඔබගේ ආදර්ශක සැලැස්ම සූදානම්. දැන්ම අප හා සම්බන්ධ වී එය සැබෑවක් කරගන්න.',
        },
        options: [],
      },
    ],
  },

  // ----------------------------------------------------
  // PATHWAY 4: SKYROCKET SALES & CONVERSION
  // ----------------------------------------------------
  {
    id: 'sales_boost',
    number: 4,
    title: {
      en: 'Option 4: Skyrocket Sales & Conversion Rate for My Business',
      si: 'අංක 4: දැනට ඇති Business එකේ Sales හා ආදායම වැඩි කරගැනීම',
    },
    subtitle: {
      en: 'Diagnose bottlenecks and implement high-converting sales funnels that turn visitors into paying customers.',
      si: 'වෙබ් අඩවියට එන පිරිස සැබෑ ගැනුම්කරුවන් බවට පත්කර ආදායම දෙගුණ තෙගුණ කරගැනීම.',
    },
    shortDescription: {
      en: 'Conversion rate optimization (CRO), funnel architecture, speed fixes, and automated follow-ups.',
      si: 'විකුණුම් Funnel, වෙබ් අඩවියේ වේගය වැඩි කිරීම සහ වැඩි පාරිභෝගික පිරිසක් ආකර්ෂණය.',
    },
    icon: 'TrendingUp',
    badge: {
      en: 'Revenue Engine',
      si: 'ආදායම් වර්ධනය',
    },
    steps: [
      {
        stepIndex: 1,
        stepTitle: {
          en: 'Current Business Bottleneck',
          si: 'ව්‍යාපාරයේ දැනට ඇති ප්‍රධාන ගැටලුව',
        },
        stepQuestion: {
          en: 'What is the biggest obstacle currently holding back your sales?',
          si: 'ඔබේ ව්‍යාපාරයේ විකුණුම් අඩුවීමට බලපා ඇති ප්‍රධාන හේතුව කුමක්ද?',
        },
        avatarSpeech: {
          en: 'Let us pinpoint the bottleneck in your sales engine so we can fix it permanently.',
          si: 'ඔබගේ ව්‍යාපාරයේ ආදායම වැඩි කරගැනීමට බාධා කරන ප්‍රධාන කරුණ තෝරන්න.',
        },
        options: [
          {
            id: 'p4_s1_no_website',
            indexNumber: 1,
            title: {
              en: '01. We Have No Website (Losing Credibility to Competitors)',
              si: '01. අපට වෙබ් අඩවියක් නැත (තරඟකරුවන්ට පාරිභෝගිකයින් ඇදී යයි)',
            },
            subtitle: {
              en: 'Relying only on social media pages which feel unverified and unprofessional to high-paying clients.',
              si: 'Facebook පේජ් එකක් පමණක් ඇති නිසා විශ්වාසනීයත්වය මදි වීම.',
            },
            iconName: 'AlertTriangle',
            tag: { en: 'Credibility Gap', si: 'විශ්වාසය ගොඩනැගීම' },
            costWeight: 1.0,
            timelineDays: 7,
          },
          {
            id: 'p4_s1_visitors_no_buy',
            indexNumber: 2,
            title: {
              en: '02. People Visit Our Site / Page but Leave Without Buying',
              si: '02. මිනිසුන් ආවත් භාණ්ඩ ගන්නේ නැත / කතා කරන්නේ නැත',
            },
            subtitle: {
              en: 'High bounce rate; visitors look for a few seconds, get confused, and bounce away.',
              si: 'වෙබ් පිටුවට ආවත් පැහැදිලි නැති නිසා මිලදී නොගෙන පිටව යයි.',
            },
            iconName: 'UserMinus',
            tag: { en: 'Low Conversion', si: 'අඩු විකුණුම්' },
            costWeight: 1.2,
            timelineDays: 8,
          },
          {
            id: 'p4_s1_ad_budget_waste',
            indexNumber: 3,
            title: {
              en: '03. Spending Heavy on Ads (FB/TikTok/Google) with Poor ROI',
              si: '03. දැන්වීම් (Ads) වලට විශාල මුදලක් වියදම් වුවත් ප්‍රතිඵල මදි වීම',
            },
            subtitle: {
              en: 'Ad traffic is directed to generic pages rather than an engineered high-converting sales funnel.',
              si: 'දැන්වීම් බලා එන පිරිස ක්ෂණික ගැනුම්කරුවන් බවට පත්කරන නිවැරදි පිටුවක් නොමැතිකම.',
            },
            iconName: 'Coins',
            tag: { en: 'Ad Funnel Fix', si: 'දැන්වීම් ප්‍රතිඵල' },
            costWeight: 1.3,
            timelineDays: 9,
          },
          {
            id: 'p4_s1_slow_ugly',
            indexNumber: 4,
            title: {
              en: '04. Our Existing Site is Too Slow, Outdated, or Broken on Mobile',
              si: '04. දැනට ඇති වෙබ් අඩවිය ලෝඩ් වීමට ප්‍රමාදයි හෝ ෆෝන් එකට පැහැදිලි නැත',
            },
            subtitle: {
              en: 'Every 1-second delay in mobile loading causes a 20% drop in customer purchases.',
              si: 'ලෝඩ් වීමට ප්‍රමාද වීම නිසා මිනිසුන් එපාවී වෙනත් අඩවි වලට යයි.',
            },
            iconName: 'Hourglass',
            tag: { en: 'Speed Upgrade', si: 'වේගය වැඩි කිරීම' },
            costWeight: 1.1,
            timelineDays: 6,
          },
          {
            id: 'p4_s1_international_diaspora',
            indexNumber: 5,
            title: {
              en: '05. Want to Target High-Paying Foreign & Diaspora Clients',
              si: '05. විදේශිකයන් සහ පිටරට සිටින ශ්‍රී ලාංකිකයින් ඉලක්ක කර ගැනීමට',
            },
            subtitle: {
              en: 'Need a world-class luxury presence that charges premium rates in USD / GBP / AUD.',
              si: 'ඩොලර් හෝ පවුම් වලින් ආදායම් උපයන ජාත්‍යන්තර මට්ටමේ පෙනුමක් අවශ්‍යයි.',
            },
            iconName: 'Globe',
            tag: { en: 'Global Revenue', si: 'ඩොලර් ආදායම' },
            costWeight: 1.4,
            timelineDays: 10,
          },
        ],
      },
      {
        stepIndex: 2,
        stepTitle: {
          en: 'Target Audience Profile',
          si: 'ඔබේ ඉලක්කගත පාරිභෝගිකයින්',
        },
        stepQuestion: {
          en: 'Who is your ideal, highest-paying customer?',
          si: 'ඔබේ භාණ්ඩ හෝ සේවාවන් මිලදී ගන්නා ප්‍රධාන පිරිස කවුද?',
        },
        avatarSpeech: {
          en: 'To engineer the highest conversion rate, tell me who we are selling to.',
          si: 'විකුණුම් උපරිම කිරීමට ඔබේ ප්‍රධාන පාරිභෝගික පිරිස තෝරන්න.',
        },
        options: [
          {
            id: 'p4_s2_local_sri_lanka',
            indexNumber: 1,
            title: {
              en: '01. Everyday Sri Lankan Consumers (B2C Mass Market)',
              si: '01. සාමාන්‍ය ශ්‍රී ලාංකික ජනතාව (Local B2C)',
            },
            subtitle: {
              en: 'Needs simple Sinhala/English, WhatsApp convenience, cash on delivery or local card gateway.',
              si: 'WhatsApp හරහා ඇණවුම් කිරීම සහ Cash on Delivery කැමති දේශීය පාරිභෝගිකයින්.',
            },
            iconName: 'Users',
            tag: { en: 'Mass Market', si: 'දේශීය වෙළඳපොළ' },
            costWeight: 1.0,
            timelineDays: 3,
          },
          {
            id: 'p4_s2_foreign_tourists',
            indexNumber: 2,
            title: {
              en: '02. Foreign Travelers, Expats & Luxury Seekers',
              si: '02. විදේශික සංචාරකයින් සහ ඉහළ පැලැන්තියේ පාරිභෝගිකයින්',
            },
            subtitle: {
              en: 'Requires supreme visual elegance, international cards (Stripe/PayPal), and trust signals.',
              si: 'හෝටල්, සංචාරක හෝ උසස් සේවාවන් සඳහා පැමිණෙන විදේශිකයන්.',
            },
            iconName: 'Plane',
            tag: { en: 'High Net Worth', si: 'සුඛෝපභෝගී පාරිභෝගිකයින්' },
            costWeight: 1.3,
            timelineDays: 5,
          },
          {
            id: 'p4_s2_corporate_b2b',
            indexNumber: 3,
            title: {
              en: '03. Corporate Companies & Business Owners (B2B)',
              si: '03. වෙනත් ආයතන හා ව්‍යාපාරිකයින් (B2B Corporate)',
            },
            subtitle: {
              en: 'High-ticket deals, quotation downloads, capability decks, and professional authority.',
              si: 'ලොකු කොන්ත්‍රාත්තු හා ආයතනික ගනුදෙනු ලබාගැනීමට.',
            },
            iconName: 'Briefcase',
            tag: { en: 'B2B Authority', si: 'ආයතනික ගනුදෙනු' },
            costWeight: 1.2,
            timelineDays: 4,
          },
          {
            id: 'p4_s2_diaspora',
            indexNumber: 4,
            title: {
              en: '04. Sri Lankan Diaspora in UK, Australia, US, Italy, Middle East',
              si: '04. විදේශගතව සිටින ශ්‍රී ලාංකිකයින් (UK, Aus, US, UAE, Italy)',
            },
            subtitle: {
              en: 'They buy gifts, property, medicines, services, or investments back home.',
              si: 'ලංකාවේ සිටින ඥාතීන්ට තෑගි හෝ භාණ්ඩ යැවීමට සහ දේපල ආයෝජන කිරීමට කැමති අය.',
            },
            iconName: 'Heart',
            tag: { en: 'Diaspora Market', si: 'විදේශගත ලාංකිකයින්' },
            costWeight: 1.2,
            timelineDays: 4,
          },
          {
            id: 'p4_s2_mixed',
            indexNumber: 5,
            title: {
              en: '05. Both Local Sri Lankan & Global International',
              si: '05. දෙපිරිසම (දේශීය මෙන්ම විදේශීය පාරිභෝගිකයින්)',
            },
            subtitle: {
              en: 'Currency switches automatically based on visitor location (LKR or USD).',
              si: 'පිටරට අයට ඩොලර් වලින්ද, ලංකාවේ අයට රුපියල් වලින්ද ස්වයංක්‍රීයව පෙන්වන ක්‍රමය.',
            },
            iconName: 'Shuffle',
            tag: { en: 'Dual Currency', si: 'ද්විත්ව මුදල්' },
            costWeight: 1.3,
            timelineDays: 5,
          },
        ],
      },
      {
        stepIndex: 3,
        stepTitle: {
          en: 'Revenue Mechanism Strategy',
          si: 'ආදායම වැඩිකරන ප්‍රධාන උපක්‍රමය',
        },
        stepQuestion: {
          en: 'Which revenue mechanism do you want to implement?',
          si: 'විකුණුම් වැඩි කිරීමට ඔබ වඩාත්ම කැමති ක්‍රමය කුමක්ද?',
        },
        avatarSpeech: {
          en: 'Let us choose the highest converting funnel mechanism for your brand.',
          si: 'වැඩිම ප්‍රතිඵල ලැබෙන විකුණුම් උපක්‍රමය තෝරන්න.',
        },
        options: [
          {
            id: 'p4_s3_whatsapp_funnel',
            indexNumber: 1,
            title: {
              en: '01. Instant WhatsApp Direct Conversion Funnel',
              si: '01. WhatsApp සෘජු විකුණුම් Funnel එකක්',
            },
            subtitle: {
              en: 'Pre-filled product inquiries sent to your WhatsApp in 1-tap with zero friction.',
              si: 'පාරිභෝගිකයා එක බටන් එකක් එබූ විට සම්පූර්ණ විස්තරය ඔබේ WhatsApp වෙත ලැබේ.',
            },
            iconName: 'MessageSquare',
            tag: { en: 'Zero Friction', si: 'පහසුම ක්‍රමය' },
            costWeight: 1.0,
            timelineDays: 3,
          },
          {
            id: 'p4_s3_flash_checkout',
            indexNumber: 2,
            title: {
              en: '02. Flash Single-Page Checkout (Instant Buy Now)',
              si: '02. එකම පිටුවකින් කාඩ්පතෙන් ක්ෂණිකව මිලදී ගැනීමේ ක්‍රමය',
            },
            subtitle: {
              en: 'Customer enters address and card details on one screen; order completed in 15 seconds.',
              si: 'පිටු ගණනක් නොගොස් තත්පර 15කින් කාඩ්පතෙන් ගෙවා ඇණවුම නිම කළ හැක.',
            },
            iconName: 'CreditCard',
            tag: { en: 'Fast Checkout', si: 'ක්ෂණික ගෙවීම්' },
            costWeight: 1.2,
            timelineDays: 4,
          },
          {
            id: 'p4_s3_high_ticket',
            indexNumber: 3,
            title: {
              en: '03. High-Ticket Consultation & Lead Application Funnel',
              si: '03. ඉහළ වටිනාකමක් ඇති සේවාවන් සඳහා පාරිභෝගිකයින් තෝරාගැනීම',
            },
            subtitle: {
              en: 'Filters out time-wasters and books serious, pre-qualified paying clients directly on your calendar.',
              si: 'නිකරුණේ කතා කරන අය ඉවත් කර සැබෑ මිලදී ගන්නන් පමණක් වෙන්කර දෙන පද්ධතියක්.',
            },
            iconName: 'Filter',
            tag: { en: 'High Ticket', si: 'උසස් ගනුදෙනු' },
            costWeight: 1.3,
            timelineDays: 5,
          },
          {
            id: 'p4_s3_bundle_upsell',
            indexNumber: 4,
            title: {
              en: '04. Automatic Upsell & Cross-Sell Engine (+35% Order Value)',
              si: '04. එකක් ගන්නා අයට තවත් භාණ්ඩ යෝජනා කර ආදායම වැඩි කිරීම',
            },
            subtitle: {
              en: 'Suggests matching accessories or bundle discounts right before checkout to maximize profit.',
              si: 'බඩු ගන්නා විට අමතර භාණ්ඩද එකතු කර ගැනීමට පාරිභෝගිකයා පොළඹවයි.',
            },
            iconName: 'PlusCircle',
            tag: { en: 'AOV Booster', si: 'වැඩි ආදායමක්' },
            costWeight: 1.25,
            timelineDays: 4,
          },
          {
            id: 'p4_s3_architect_formula',
            indexNumber: 5,
            title: {
              en: '05. Ravana Tech Proprietary Conversion Architecture',
              si: '05. Ravana Tech සුවිශේෂී විකුණුම් සැලැස්ම (අප විසින්ම නිර්මාණය කිරීම)',
            },
            subtitle: {
              en: 'We combine psychological triggers, visual hierarchy, and speed for maximum sales.',
              si: 'පාරිභෝගික මනෝවිද්‍යාව හා තාක්ෂණය උපයෝගී කරගෙන අප විසින්ම හදන සැලැස්ම.',
            },
            iconName: 'Sparkles',
            tag: { en: 'Proprietary Formula', si: 'සුවිශේෂී සැලැස්ම' },
            costWeight: 1.4,
            timelineDays: 6,
          },
        ],
      },
      {
        stepIndex: 4,
        stepTitle: {
          en: 'Revenue Growth Target',
          si: 'ඔබ බලාපොරොත්තු වන ආදායම් ඉලක්කය',
        },
        stepQuestion: {
          en: 'What monthly revenue or sales volume are you aiming for?',
          si: 'ඔබ බලාපොරොත්තු වන මාසික ආදායම හෝ විකුණුම් ඉලක්කය කුමක්ද?',
        },
        avatarSpeech: {
          en: 'State your growth ambition so we can calibrate the infrastructure properly.',
          si: 'ඔබේ ව්‍යාපාරයේ ඉදිරි ඉලක්කය තෝරන්න.',
        },
        options: [
          {
            id: 'p4_s4_tier1',
            indexNumber: 1,
            title: {
              en: '01. LKR 300,000 - 800,000 / month ($1,000 - $2,500)',
              si: '01. මසකට රු. 300,000 - 800,000 ($1,000 - $2,500)',
            },
            subtitle: {
              en: 'Solid foundation for independent entrepreneurs and growing brands.',
              si: 'ස්ථාවර නව ව්‍යාපාරයක් සඳහා සුදුසු මූලික මට්ටම.',
            },
            iconName: 'Check',
            tag: { en: 'Starter Growth', si: 'මූලික ඉලක්කය' },
            costWeight: 1.0,
            timelineDays: 7,
          },
          {
            id: 'p4_s4_tier2',
            indexNumber: 2,
            title: {
              en: '02. LKR 1,000,000 - 3,000,000 / month ($3,000 - $10,000)',
              si: '02. මසකට රු. 1,000,000 - 3,000,000 ($3,000 - $10,000)',
            },
            subtitle: {
              en: 'Scaling rapidly with aggressive conversion funnels and automated marketing.',
              si: 'වේගයෙන් දියුණු වන ව්‍යාපාරයක් සඳහා වන ප්‍රබල මට්ටම.',
            },
            iconName: 'TrendingUp',
            tag: { en: 'Scaling Tier', si: 'වේගවත් වර්ධනය' },
            costWeight: 1.3,
            timelineDays: 10,
          },
          {
            id: 'p4_s4_tier3',
            indexNumber: 3,
            title: {
              en: '03. LKR 5,000,000+ / month ($15,000+)',
              si: '03. මසකට රු. 5,000,000+ ($15,000+)',
            },
            subtitle: {
              en: 'High volume enterprise scale with zero downtime and multi-agent AI automation.',
              si: 'විශාල පරිමාණයේ ව්‍යාපාරික ආදායමක් උදෙසා.',
            },
            iconName: 'Crown',
            tag: { en: 'High Volume', si: 'ඉහළ පරිමාණය' },
            costWeight: 2.0,
            timelineDays: 15,
          },
          {
            id: 'p4_s4_starting_fresh',
            indexNumber: 4,
            title: {
              en: '04. Starting from Zero (Just Want My First 50 Paid Customers)',
              si: '04. මුල සිටම පටන් ගන්නේ (පළමු පාරිභෝගිකයින් 50 දෙනා ලබාගැනීමට)',
            },
            subtitle: {
              en: 'Validate product-market fit with lowest risk and clean conversion architecture.',
              si: 'අඩුම වියදමකින් ආරම්භ කර පළමු ගනුදෙනුකරුවන් පිරිස සොයා ගැනීම.',
            },
            iconName: 'Compass',
            tag: { en: 'First Customers', si: 'පළමු පාරිභෝගිකයින්' },
            costWeight: 0.9,
            timelineDays: 6,
          },
          {
            id: 'p4_s4_flexible',
            indexNumber: 5,
            title: {
              en: '05. Want Founder Consultation to Assess Potential First',
              si: '05. ආයතන ප්‍රධානියා සමඟ කතා කර හැකියාවන් විමසා බැලීමට',
            },
            subtitle: {
              en: 'We will conduct a 15-minute diagnostic on your current numbers.',
              si: 'අපගේ ප්‍රධානියා සමඟ කෙටි සාකච්ඡාවක් කර නිවැරදි සැලැස්මක් සකස් කර ගැනීමට.',
            },
            iconName: 'HelpCircle',
            tag: { en: 'Diagnostic Call', si: 'නොමිලේ උපදෙස්' },
            costWeight: 1.0,
            timelineDays: 5,
          },
        ],
      },
      {
        stepIndex: 5,
        stepTitle: {
          en: 'Revenue Engine Blueprint & Quotation',
          si: 'විකුණුම් සැලැස්ම සහ මිල ගණන්',
        },
        stepQuestion: {
          en: 'Your High-Converting Revenue Blueprint is ready! Review below:',
          si: 'ඔබගේ විකුණුම් වර්ධන සැලැස්ම සූදානම්! තහවුරු කරන්න:',
        },
        avatarSpeech: {
          en: 'Your sales engine blueprint has been calculated. Connect directly with us to implement.',
          si: 'ඔබගේ විකුණුම් සැලැස්ම සූදානම්. දැන්ම WhatsApp හරහා හෝ ඊමේල් මගින් අප අමතන්න.',
        },
        options: [],
      },
    ],
  },

  // ----------------------------------------------------
  // PATHWAY 5: VIP DIRECT CONSULTATION WITH FOUNDER
  // ----------------------------------------------------
  {
    id: 'vip_consultation',
    number: 5,
    title: {
      en: 'Option 5: Direct VIP Consultation with Digital Architect & Founder',
      si: 'අංක 5: ආයතන ප්‍රධානියා / Digital Architect සමග සෘජු VIP සාකච්ඡාව',
    },
    subtitle: {
      en: 'Skip the forms. Speak directly 1-on-1 with the founder to discuss your visionary project.',
      si: 'වෙනත් පියවර අවශ්‍ය නැත. කෙලින්ම ආයතන ප්‍රධානියා සමඟ ඔබේ ව්‍යාපෘතිය සාකච්ඡා කරන්න.',
    },
    shortDescription: {
      en: 'Direct WhatsApp audio/chat, Google Meet call, phone call, or in-person Colombo meeting.',
      si: 'WhatsApp කෝල්, Google Meet, දුරකථන ඇමතුමක් හෝ කොළඹදී හමුවී සාකච්ඡා කිරීම.',
    },
    icon: 'PhoneCall',
    badge: {
      en: 'VIP Priority',
      si: 'VIP ප්‍රමුඛතාවය',
    },
    steps: [
      {
        stepIndex: 1,
        stepTitle: {
          en: 'Preferred Communication Channel',
          si: 'සාකච්ඡා කිරීමට ඔබ කැමති ක්‍රමය',
        },
        stepQuestion: {
          en: 'How would you like to conduct this direct consultation?',
          si: 'ඔබට වඩාත්ම පහසු සන්නිවේදන ක්‍රමය කුමක්ද?',
        },
        avatarSpeech: {
          en: 'I would be delighted to speak with you personally. How would you like us to connect?',
          si: 'ඔබ සමඟ පෞද්ගලිකව සාකච්ඡා කිරීමට ලැබීම සතුටක්. ඔබට වඩාත්ම පහසු මාධ්‍යය තෝරන්න.',
        },
        options: [
          {
            id: 'p5_s1_whatsapp_direct',
            indexNumber: 1,
            title: {
              en: '01. Direct WhatsApp Message / Audio Call (Fastest)',
              si: '01. WhatsApp හරහා කෙලින්ම Chat හෝ Call (ක්ෂණිකවම)',
            },
            subtitle: {
              en: 'Instant line to the founder; send text or voice notes anytime with rapid replies.',
              si: 'ප්‍රධානියාගේ සෘජු WhatsApp අංකය වෙත පණිවිඩයක් හෝ කෝල් එකක් ලබාගැනීමට.',
            },
            iconName: 'MessageCircle',
            tag: { en: 'Instant Reply', si: 'ක්ෂණික සම්බන්ධතාවය' },
            costWeight: 1.0,
            timelineDays: 1,
          },
          {
            id: 'p5_s1_video_meet',
            indexNumber: 2,
            title: {
              en: '02. Google Meet / Zoom Video Conference',
              si: '02. Google Meet හෝ Zoom වීඩියෝ සාකච්ඡාවක්',
            },
            subtitle: {
              en: 'Screen-sharing session to review designs, prototypes, and digital architecture.',
              si: 'පරිගණක තිරය බෙදාහදා ගනිමින් නිර්මාණ හා සැලසුම් සජීවීව බැලීමට.',
            },
            iconName: 'Video',
            tag: { en: 'Video Session', si: 'වීඩියෝ හමුව' },
            costWeight: 1.0,
            timelineDays: 2,
          },
          {
            id: 'p5_s1_direct_phone',
            indexNumber: 3,
            title: {
              en: '03. Direct Voice Phone Call',
              si: '03. සාමාන්‍ය දුරකථන ඇමතුමක් මගින් (Phone Call)',
            },
            subtitle: {
              en: 'Direct phone call to speak directly and clarify all your questions easily.',
              si: 'දුරකථනයෙන් කෙලින්ම කතා කර ඔබේ ප්‍රශ්න සියල්ල නිරාකරණය කරගැනීමට.',
            },
            iconName: 'Phone',
            tag: { en: 'Direct Voice', si: 'දුරකථන ඇමතුම' },
            costWeight: 1.0,
            timelineDays: 1,
          },
          {
            id: 'p5_s1_in_person',
            indexNumber: 4,
            title: {
              en: '04. In-Person Meeting at Office / Colombo Executive Space',
              si: '04. කොළඹදී මුහුණට මුහුණ හමුවී සාකච්ඡා කිරීම (In-Person)',
            },
            subtitle: {
              en: 'Face-to-face executive session for enterprise or high-scale projects.',
              si: 'විශාල ව්‍යාපෘති සඳහා පුද්ගලිකව හමුවී සාකච්ඡා කිරීමේ අවස්ථාව.',
            },
            iconName: 'MapPin',
            tag: { en: 'Executive In-Person', si: 'මුහුණට මුහුණ' },
            costWeight: 1.2,
            timelineDays: 3,
          },
          {
            id: 'p5_s1_email_brief',
            indexNumber: 5,
            title: {
              en: '05. Send Project Brief via Email (hello.ravanatech@gmail.com)',
              si: '05. ඊමේල් මගින් ලිඛිතව විස්තර යැවීම (Official Email)',
            },
            subtitle: {
              en: 'Receive a formal written proposal and itemized commercial agreement.',
              si: 'ලිඛිතව නිල ලේඛන හා මිල ගණන් ඊමේල් ලිපිනයට ලබාගැනීමට.',
            },
            iconName: 'Mail',
            tag: { en: 'Formal Email', si: 'නිල ඊමේල්' },
            costWeight: 1.0,
            timelineDays: 1,
          },
        ],
      },
      {
        stepIndex: 2,
        stepTitle: {
          en: 'Project Urgency & Priority',
          si: 'ව්‍යාපෘතියේ හදිසිභාවය',
        },
        stepQuestion: {
          en: 'How quickly do you need this consultation?',
          si: 'මෙම සාකච්ඡාව ඔබට අවශ්‍ය වන්නේ කෙතරම් ඉක්මනින්ද?',
        },
        avatarSpeech: {
          en: 'When would you like to speak?',
          si: 'ඔබට සාකච්ඡාව පැවැත්වීමට අවශ්‍ය දිනය හෝ වේලාව තෝරන්න.',
        },
        options: [
          {
            id: 'p5_s2_immediate_today',
            indexNumber: 1,
            title: {
              en: '01. Today / Within the Next Few Hours (High Priority)',
              si: '01. අද දිනය තුළම / ඉදිරි පැය කිහිපය ඇතුළත (කඩිනමින්)',
            },
            subtitle: {
              en: 'Urgent matters, immediate decisions, or sprint project approvals.',
              si: 'වහාම තීරණයක් ගත යුතු හදිසි අවශ්‍යතාවයක් සඳහා.',
            },
            iconName: 'Flame',
            tag: { en: 'Immediate', si: 'ක්ෂණිකවම' },
            costWeight: 1.0,
            timelineDays: 1,
          },
          {
            id: 'p5_s2_tomorrow',
            indexNumber: 2,
            title: {
              en: '02. Tomorrow at a Scheduled Time Slot',
              si: '02. හෙට දිනයේ පහසු වේලාවක',
            },
            subtitle: {
              en: 'Book a dedicated 30-minute block for tomorrow.',
              si: 'හෙට දිනයේ විනාඩි 30ක කාලයක් වෙන්කරවා ගැනීමට.',
            },
            iconName: 'Calendar',
            tag: { en: 'Tomorrow', si: 'හෙට දිනය' },
            costWeight: 1.0,
            timelineDays: 2,
          },
          {
            id: 'p5_s2_this_weekend',
            indexNumber: 3,
            title: {
              en: '03. This Weekend / After Working Hours',
              si: '03. සති අන්තයේ හෝ කාර්යාල වේලාවෙන් පසු',
            },
            subtitle: {
              en: 'Convenient evening or weekend slot for busy executives.',
              si: 'කාර්යබහුල අයට සවස් වරුවේ හෝ සෙනසුරාදා/ඉරිදා දිනක.',
            },
            iconName: 'Moon',
            tag: { en: 'Evening / Weekend', si: 'සති අන්තයේ' },
            costWeight: 1.0,
            timelineDays: 3,
          },
          {
            id: 'p5_s2_next_week',
            indexNumber: 4,
            title: {
              en: '04. Sometime Next Week (Planning Stage)',
              si: '04. ලබන සතියේ පහසු දිනක (සැලසුම් අදියරේ)',
            },
            subtitle: {
              en: 'No immediate rush; exploring options for an upcoming quarter.',
              si: 'ඉදිරියේදී ආරම්භ කිරීමට නියමිත ව්‍යාපෘතියක් පිළිබඳ විමසීමට.',
            },
            iconName: 'Clock',
            tag: { en: 'Planning', si: 'සැලසුම් කිරීම' },
            costWeight: 1.0,
            timelineDays: 5,
          },
          {
            id: 'p5_s2_asap_whatsapp',
            indexNumber: 5,
            title: {
              en: '05. Just Drop Me a WhatsApp Message First',
              si: '05. පළමුව මට WhatsApp පණිවිඩයක් එවන්න',
            },
            subtitle: {
              en: 'We will message you on WhatsApp to coordinate the best mutual time.',
              si: 'අප විසින් ඔබගේ WhatsApp වෙත පණිවිඩයක් යොමු කර වේලාවක් තහවුරු කරගන්නෙමු.',
            },
            iconName: 'MessageSquare',
            tag: { en: 'WhatsApp Ping', si: 'WhatsApp පණිවිඩයක්' },
            costWeight: 1.0,
            timelineDays: 1,
          },
        ],
      },
      {
        stepIndex: 3,
        stepTitle: {
          en: 'Primary Topic of Discussion',
          si: 'සාකච්ඡාවේ ප්‍රධාන මාතෘකාව',
        },
        stepQuestion: {
          en: 'What is the main subject you want to cover with the Founder?',
          si: 'ඔබට සාකච්ඡා කිරීමට අවශ්‍ය ප්‍රධාන මාතෘකාව කුමක්ද?',
        },
        avatarSpeech: {
          en: 'What will be our primary topic of discussion?',
          si: 'අප සාකච්ඡා කළ යුතු ප්‍රධාන මාතෘකාව කුමක්ද?',
        },
        options: [
          {
            id: 'p5_s3_complete_custom_system',
            indexNumber: 1,
            title: {
              en: '01. Building a Completely Custom Platform / Software',
              si: '01. අලුත්ම විශේෂිත මෘදුකාංගයක් හෝ Platform එකක් හැදීම',
            },
            subtitle: {
              en: 'Proprietary business model, startup idea, or automated platform from scratch.',
              si: 'අලුත් ව්‍යාපාරික අදහසක් හෝ විශේෂිත මෘදුකාංග පද්ධතියක් මුල සිට හැදීම.',
            },
            iconName: 'Layers',
            tag: { en: 'Custom System', si: 'විශේෂිත පද්ධතිය' },
            costWeight: 1.5,
            timelineDays: 14,
          },
          {
            id: 'p5_s3_ai_transformation',
            indexNumber: 2,
            title: {
              en: '02. Transforming My Existing Business with AI Automations',
              si: '02. මගේ ව්‍යාපාරයට AI ස්වයංක්‍රීයකරණය එක් කිරීම',
            },
            subtitle: {
              en: 'Integrating WhatsApp bots, automated workflows, and customer agents.',
              si: 'කාර්ය මණ්ඩලයේ මහන්සිය අඩු කර AI මගින් වැඩ පහසු කරගැනීම.',
            },
            iconName: 'Bot',
            tag: { en: 'AI Transformation', si: 'AI ස්වයංක්‍රීයකරණය' },
            costWeight: 1.3,
            timelineDays: 10,
          },
          {
            id: 'p5_s3_investment_budget',
            indexNumber: 3,
            title: {
              en: '03. Quotation Breakdown & Investment Clarifications',
              si: '03. මිල ගණන් සහ පැකේජ පිළිබඳ විමසීම',
            },
            subtitle: {
              en: 'Discuss payment milestones, deliverables, timelines, and contract specifics.',
              si: 'ගෙවීම් පහසුකම්, නිමවන දින වකවානු සහ කොන්දේසි සාකච්ඡා කිරීම.',
            },
            iconName: 'Calculator',
            tag: { en: 'Commercials', si: 'මිල ගණන්' },
            costWeight: 1.0,
            timelineDays: 5,
          },
          {
            id: 'p5_s3_partnership',
            indexNumber: 4,
            title: {
              en: '04. Strategic Long-Term Partnership / Agency Retainer',
              si: '04. දීර්ඝකාලීන සහයෝගීතාවයක් (Ongoing Digital Partner)',
            },
            subtitle: {
              en: 'Have Ravana Tech act as your dedicated external CTO and engineering department.',
              si: 'ඔබේ ආයතනයේ තාක්ෂණික අංශය ලෙස Ravana Tech දීර්ඝකාලීනව සම්බන්ධ කරගැනීම.',
            },
            iconName: 'Handshake',
            tag: { en: 'Partnership', si: 'සහයෝගීතාවය' },
            costWeight: 2.0,
            timelineDays: 20,
          },
          {
            id: 'p5_s3_guidance_only',
            indexNumber: 5,
            title: {
              en: '05. General Technology Guidance for My Business',
              si: '05. මගේ ව්‍යාපාරයට තාක්ෂණික මගපෙන්වීම් ලබාගැනීම',
            },
            subtitle: {
              en: 'Ask any questions freely; we explain everything in simple, jargon-free Sinhala or English.',
              si: 'තාක්ෂණික දැනුමක් නැති වුවත් සරල සිංහලෙන් හෝ ඉංග්‍රීසියෙන් උපදෙස් ලබාගැනීම.',
            },
            iconName: 'HelpCircle',
            tag: { en: 'Friendly Advice', si: 'මිත්‍රශීලී උපදෙස්' },
            costWeight: 1.0,
            timelineDays: 3,
          },
        ],
      },
      {
        stepIndex: 4,
        stepTitle: {
          en: 'Estimated Scope & Size',
          si: 'ව්‍යාපෘතියේ පරිමාණය',
        },
        stepQuestion: {
          en: 'What is the rough scale of this undertaking?',
          si: 'මෙම ව්‍යාපෘතියේ දළ පරිමාණය කෙබඳුද?',
        },
        avatarSpeech: {
          en: 'Almost done. What is the approximate scale of this initiative?',
          si: 'ඉතා හොඳයි. ව්‍යාපෘතියේ පරිමාණය තෝරන්න.',
        },
        options: [
          {
            id: 'p5_s4_starter_scale',
            indexNumber: 1,
            title: {
              en: '01. Starter / Individual Project (Single Website or Bot)',
              si: '01. මූලික තනි ව්‍යාපෘතියක් (එක් වෙබ් අඩවියක් හෝ එක් Bot කෙනෙක්)',
            },
            subtitle: {
              en: 'Focused execution with immediate tangible results.',
              si: 'ඉක්මනින් නිම කරගත හැකි තනි අවශ්‍යතාවයක්.',
            },
            iconName: 'Check',
            tag: { en: 'Single Project', si: 'තනි ව්‍යාපෘතිය' },
            costWeight: 1.0,
            timelineDays: 7,
          },
          {
            id: 'p5_s4_medium_scale',
            indexNumber: 2,
            title: {
              en: '02. Mid-Scale Business System (Website + AI + Payments)',
              si: '02. මධ්‍යම පරිමාණ පද්ධතියක් (Website + AI + ගෙවීම්)',
            },
            subtitle: {
              en: 'A complete end-to-end digital infrastructure for a growing company.',
              si: 'වර්ධනය වන ව්‍යාපාරයක් සඳහා අවශ්‍ය සියලුම අංග එකතු වූ පද්ධතියක්.',
            },
            iconName: 'Layers',
            tag: { en: 'Mid-Scale', si: 'මධ්‍යම පරිමාණය' },
            costWeight: 1.5,
            timelineDays: 14,
          },
          {
            id: 'p5_s4_enterprise_scale',
            indexNumber: 3,
            title: {
              en: '03. Large Enterprise Platform / Multi-Branch Organization',
              si: '03. විශාල පරිමාණ ආයතනික පද්ධතියක් (ශාඛා කිහිපයක් සහිත)',
            },
            subtitle: {
              en: 'Complex custom architecture, databases, mobile apps, and dedicated server pipelines.',
              si: 'විශාල දත්ත පද්ධති, ජංගම ඇප්ස් සහ විශේෂිත ආරක්ෂිත සර්වර් සහිතව.',
            },
            iconName: 'Crown',
            tag: { en: 'Enterprise Scale', si: 'විශාල ආයතනික' },
            costWeight: 2.5,
            timelineDays: 28,
          },
          {
            id: 'p5_s4_fast_validation',
            indexNumber: 4,
            title: {
              en: '04. Fast MVP Prototype (Need to Pitch to Investors/Partners)',
              si: '04. ආයෝජකයින්ට හෝ පාර්ශවකරුවන්ට පෙන්වීමට ඉක්මන් Prototype එකක්',
            },
            subtitle: {
              en: 'Build a working demonstration in under 10 days to secure capital or test demand.',
              si: 'අදහස සැබෑවක් ලෙස පෙන්වීමට ඉක්මනින් සකස් කරගත් ආදර්ශකයක්.',
            },
            iconName: 'Zap',
            tag: { en: 'Fast MVP', si: 'ඉක්මන් Prototype' },
            costWeight: 1.2,
            timelineDays: 8,
          },
          {
            id: 'p5_s4_open_discussion',
            indexNumber: 5,
            title: {
              en: '05. Flexible / Let Us Scope It Together on the Call',
              si: '05. සාකච්ඡාවේදී එකට එකතු වී විස්තර තීරණය කරමු',
            },
            subtitle: {
              en: 'No need to guess now; we will clarify the perfect scope together on the call.',
              si: 'දැන්ම තීරණය කිරීමට අවශ්‍ය නැත; ඇමතුමේදී අපි සියල්ල විග්‍රහ කර ගනිමු.',
            },
            iconName: 'Smile',
            tag: { en: 'Open Scope', si: 'විවෘත සාකච්ඡාව' },
            costWeight: 1.0,
            timelineDays: 7,
          },
        ],
      },
      {
        stepIndex: 5,
        stepTitle: {
          en: 'VIP Founder Access Pass',
          si: 'VIP සෘජු ප්‍රවේශ පත්‍රය',
        },
        stepQuestion: {
          en: 'Your VIP Priority Pass with the Founder is ready! Connect now:',
          si: 'ඔබගේ සෘජු ප්‍රවේශය සූදානම්! දැන්ම ප්‍රධානියා හා සම්බන්ධ වන්න:',
        },
        avatarSpeech: {
          en: 'Your VIP Consultation Pass is ready. Tap below to launch WhatsApp or call directly.',
          si: 'ඔබගේ VIP සාකච්ඡා ප්‍රවේශය සූදානම්. දැන්ම WhatsApp මගින් හෝ සෘජු ඇමතුමකින් අප අමතන්න.',
        },
        options: [],
      },
    ],
  },
];
