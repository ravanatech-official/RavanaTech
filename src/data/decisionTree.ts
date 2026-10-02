import { DecisionPathway } from '../types';

export const DECISION_PATHWAYS: DecisionPathway[] = [
  // ----------------------------------------------------
  // PATHWAY 01: NEW WEBSITE
  // ----------------------------------------------------
  {
    id: 'new_website',
    number: 1,
    title: {
      en: '01. Build a New Website',
      si: '01. නව වෙබ් අඩවියක් නිර්මාණය කරගැනීම',
    },
    subtitle: {
      en: 'High-converting business presence, client trust, and qualified lead generation.',
      si: 'පාරිභෝගිකයින් වැඩි කරවන, විශ්වසනීයත්වය හා නවීන පෙනුම සහිත ව්‍යාපාරික වෙබ් අඩවි.',
    },
    shortDescription: {
      en: 'Custom digital platforms engineered for conversion, speed, and luxury aesthetics.',
      si: 'ව්‍යාපාරික වෙබ් අඩවි, ආයතනික පෙනුම සහ වැඩි පාරිභෝගික ඇමතුම් ලබාදෙන පද්ධති.',
    },
    icon: 'Globe',
    badge: {
      en: 'Conversion First',
      si: 'පාරිභෝගික ආකර්ෂණය',
    },
    steps: [
      {
        stepIndex: 1,
        stepTitle: {
          en: 'Business Category',
          si: 'ව්‍යාපාර වර්ගය',
        },
        stepQuestion: {
          en: 'What exact industry does your business operate in?',
          si: 'ඔබ මෙම වෙබ් අඩවිය නිර්මාණය කරන්නේ කුමන ආකාරයේ ව්‍යාපාරයක් සඳහාද?',
        },
        stepSubBrief: {
          en: 'Helps us calibrate conversion ergonomics and visual language for your sector.',
          si: 'ඔබගේ ක්ෂේත්‍රයට වඩාත්ම ගැළපෙන පාරිභෝගික ආකර්ෂණ සැලැස්ම සකස් කිරීමට.',
        },
        avatarSpeech: {
          en: 'Select your exact business category so we can architect the ideal layout.',
          si: 'විශිෂ්ට තේරීමක්! මුලින්ම ඔබගේ ව්‍යාපාරික ක්ෂේත්‍රය තෝරන්න.',
        },
        options: [
          {
            id: 'p1_cat_restaurant',
            indexNumber: 1,
            title: {
              en: '01. Restaurant, Cafe & Food',
              si: '01. ආපනශාලා, කැෆේ හා ආහාර පාන',
            },
            subtitle: {
              en: 'Digital visual menu, location directions, table inquiries, and direct WhatsApp orders.',
              si: 'ආකර්ෂණීය Menu පත්, පිහිටීම, ආසන වෙන්කිරීම් හා WhatsApp ඇණවුම් පහසුකම්.',
            },
            iconName: 'Building2',
            tag: { en: 'Food & Hospitality', si: 'ආහාර හා ආගන්තුක සත්කාර' },
            costWeight: 1.0,
            timelineDays: 7,
          },
          {
            id: 'p1_cat_salon',
            indexNumber: 2,
            title: {
              en: '02. Salon, Spa & Beauty Wellness',
              si: '02. සැලෝන්, ස්පා හා රූපලාවන්‍ය සේවා',
            },
            subtitle: {
              en: 'Service pricing catalog, stylist showcase, and instant appointment booking.',
              si: 'සේවා මිල ලැයිස්තුව, විශේෂඥයින් පෙන්වීම සහ ක්ෂණික වේලාවන් වෙන්කිරීම.',
            },
            iconName: 'Sparkles',
            tag: { en: 'Beauty & Wellness', si: 'රූපලාවන්‍ය හා සුවතා' },
            costWeight: 1.05,
            timelineDays: 7,
          },
          {
            id: 'p1_cat_retail',
            indexNumber: 3,
            title: {
              en: '03. Retail, Boutique & Showroom',
              si: '03. සිල්ලර, ඇඟලුම් හා ප්‍රදර්ශනාගාර',
            },
            subtitle: {
              en: 'Product showcase, store locator, seasonal offers, and direct customer inquiries.',
              si: 'භාණ්ඩ ප්‍රදර්ශනය, ප්‍රදර්ශනාගාර පිහිටීම, විශේෂ දීමනා හා සෘජු විමසීම්.',
            },
            iconName: 'ShoppingBag',
            tag: { en: 'Retail & Fashion', si: 'සිල්ලර හා විලාසිතා' },
            costWeight: 1.1,
            timelineDays: 8,
          },
          {
            id: 'p1_cat_realestate',
            indexNumber: 4,
            title: {
              en: '04. Real Estate, Villa & Construction',
              si: '04. දේපළ වෙළඳාම්, විලා හා ඉදිකිරීම්',
            },
            subtitle: {
              en: 'High-res property gallery, amenity filters, inquiry capture, and WhatsApp viewing booking.',
              si: 'දේපළ ඡායාරූප, පහසුකම් විස්තර සහ දේපළ පරීක්ෂාව සඳහා වේලාවන් වෙන්කිරීම.',
            },
            iconName: 'Building',
            tag: { en: 'Real Estate & Living', si: 'දේපළ හා නවාතැන්' },
            costWeight: 1.25,
            timelineDays: 10,
          },
          {
            id: 'p1_cat_professional',
            indexNumber: 5,
            title: {
              en: '05. Professional Services & Corporate',
              si: '05. නීතිඥ, වෛද්‍ය, උපදේශන හෝ ආයතනික සේවා',
            },
            subtitle: {
              en: 'Authoritative firm credentials, practice areas, case studies, and quote consultation.',
              si: 'ආයතනික විශ්වසනීයත්වය, සේවා විස්තර, සුදුසුකම් හා සේවාදායක උපදේශන.',
            },
            iconName: 'Briefcase',
            tag: { en: 'Corporate & Legal', si: 'ආයතනික හා උපදේශන' },
            costWeight: 1.15,
            timelineDays: 9,
          },
        ],
      },
      {
        stepIndex: 2,
        stepTitle: {
          en: 'Main Goal',
          si: 'ප්‍රධාන ඉලක්කය',
        },
        stepQuestion: {
          en: 'What is the primary action your website must drive?',
          si: 'නව වෙබ් අඩවියෙන් ඔබ බලාපොරොත්තු වන ප්‍රධානම ප්‍රතිඵලය කුමක්ද?',
        },
        stepSubBrief: {
          en: 'Defines your hero section call-to-action and primary conversion funnel.',
          si: 'වෙබ් අඩවියේ ප්‍රධාන Call-to-Action එක හා conversion funnel එක තීරණය කිරීමට.',
        },
        avatarSpeech: {
          en: 'Select what you want this website to achieve most for your revenue.',
          si: 'මෙම වෙබ් අඩවිය හරහා ඔබට ලබාගත යුතු ප්‍රධානම ප්‍රතිඵලය තෝරන්න.',
        },
        options: [
          {
            id: 'p1_goal_calls',
            indexNumber: 1,
            title: {
              en: '01. Direct Inbound Phone Calls',
              si: '01. ක්ෂණික දුරකථන ඇමතුම් ලබාගැනීම',
            },
            subtitle: {
              en: 'Prominent one-tap calling buttons across mobile viewports for quick sales conversations.',
              si: 'Mobile දුරකථන වලින් එක tap එකකින් ඇමතුම් ලබාගත හැකි විශේෂ සැලසුමක්.',
            },
            iconName: 'PhoneCall',
            tag: { en: 'Direct Calling', si: 'සෘජු ඇමතුම්' },
            costWeight: 1.0,
            timelineDays: 0,
          },
          {
            id: 'p1_goal_whatsapp',
            indexNumber: 2,
            title: {
              en: '02. High-Converting WhatsApp Leads',
              si: '02. සුදුසුකම් ලත් WhatsApp පණිවිඩ හා විමසීම්',
            },
            subtitle: {
              en: 'Automated pre-filled WhatsApp chat links routing directly to your sales team.',
              si: 'පාරිභෝගිකයාගේ අවශ්‍යතාවය සටහන්ව ස්වයංක්‍රීයව WhatsApp වෙත යොමුවීම.',
            },
            iconName: 'MessageCircle',
            tag: { en: 'WhatsApp Leads', si: 'WhatsApp විමසීම්' },
            costWeight: 1.05,
            timelineDays: 1,
          },
          {
            id: 'p1_goal_trust',
            indexNumber: 3,
            title: {
              en: '03. Brand Trust & High Market Authority',
              si: '03. ඉහළ විශ්වසනීයත්වය හා පිළිගැනීම තහවුරු කිරීම',
            },
            subtitle: {
              en: 'Luxury UI styling that commands higher prices, trust badges, and verified client proof.',
              si: 'ඉහළ මිලකට සේවාවන් විකිණිය හැකි ජාත්‍යන්තර මට්ටමේ සුඛෝපභෝගී පෙනුමක්.',
            },
            iconName: 'ShieldCheck',
            tag: { en: 'Authority & Prestige', si: 'පිළිගැනීම හා ගෞරවය' },
            costWeight: 1.15,
            timelineDays: 2,
          },
          {
            id: 'p1_goal_portfolio',
            indexNumber: 4,
            title: {
              en: '04. Showcase Work & Case Studies',
              si: '04. කලින් කළ සාර්ථක ව්‍යාපෘති හා නිර්මාණ ප්‍රදර්ශනය',
            },
            subtitle: {
              en: 'Interactive image galleries, before/after showcases, and client success stories.',
              si: 'විශිෂ්ට නිර්මාණ එකතුව, Before/After සැසඳීම් හා පාරිභෝගික සාක්ෂි.',
            },
            iconName: 'Award',
            tag: { en: 'Showcase & Proof', si: 'සාක්ෂි හා ප්‍රදර්ශනය' },
            costWeight: 1.1,
            timelineDays: 1,
          },
          {
            id: 'p1_goal_seo',
            indexNumber: 5,
            title: {
              en: '05. Rank at the Top of Google Search',
              si: '05. Google සෙවුම් වල ඉහළින්ම පෙනී සිටීම (SEO)',
            },
            subtitle: {
              en: 'Schema.org rich snippets, blazing fast speed, and local Colombo/global SEO targeting.',
              si: 'Google PageSpeed 95+ සහ ප්‍රදේශය අනුව Google මුල් පිටුවට ගෙන එන SEO තාක්ෂණය.',
            },
            iconName: 'Target',
            tag: { en: 'Search Dominance', si: 'Google ප්‍රමුඛතාව' },
            costWeight: 1.2,
            timelineDays: 3,
          },
        ],
      },
      {
        stepIndex: 3,
        stepTitle: {
          en: 'Lead Flow',
          si: 'පාරිභෝගික ක්‍රියාමාර්ගය',
        },
        stepQuestion: {
          en: 'How should qualified leads reach your team?',
          si: 'වෙබ් අඩවියට පැමිණෙන පාරිභෝගිකයා කළ යුතු ප්‍රධානතම පියවර කුමක්ද?',
        },
        stepSubBrief: {
          en: 'Configures your direct WhatsApp funnel and instant inquiry routing engine.',
          si: 'WhatsApp හා ක්ෂණික විමසීම් සෘජුව ලබාගන්නා ක්‍රමය තහවුරු කිරීමට.',
        },
        avatarSpeech: {
          en: 'How do you want visitors to interact and convert on your site?',
          si: 'පාරිභෝගිකයා ඔබව සම්බන්ධ කරගත යුතු පහසුම ක්‍රමය තෝරන්න.',
        },
        options: [
          {
            id: 'p1_act_whatsapp',
            indexNumber: 1,
            title: {
              en: '01. Instant 1-Tap WhatsApp Message',
              si: '01. ක්ෂණික WhatsApp පණිවිඩයක් එවීමට සැලැස්වීම',
            },
            subtitle: {
              en: 'Direct WhatsApp conversion funnel with customized pre-written inquiries.',
              si: 'එක් tap එකකින් WhatsApp විවෘත වී පාරිභෝගිකයා කෙළින්ම කතාබහට යොමු වේ.',
            },
            iconName: 'MessageSquare',
            tag: { en: 'Instant Chat', si: 'ක්ෂණික කතාබහ' },
            costWeight: 1.0,
            timelineDays: 0,
          },
          {
            id: 'p1_act_phone',
            indexNumber: 2,
            title: {
              en: '02. Direct Calling Line',
              si: '02. සෘජු දුරකථන ඇමතුමක් ලබා ගැනීමට සැලැස්වීම',
            },
            subtitle: {
              en: 'Sticky call button engineered for maximum mobile thumb convenience.',
              si: 'Smart phone එකෙන් පහසුවෙන් අමතන්න හැකි Sticky Call Button එකක් සහිතව.',
            },
            iconName: 'Phone',
            tag: { en: 'Immediate Call', si: 'ක්ෂණික ඇමතුම්' },
            costWeight: 1.0,
            timelineDays: 0,
          },
          {
            id: 'p1_act_quote',
            indexNumber: 3,
            title: {
              en: '03. Request an Itemized Quotation / Callback',
              si: '03. මිල ගණන් හා ඇස්තමේන්තුවක් ඉල්ලුම් කිරීම',
            },
            subtitle: {
              en: 'Smart interactive form that collects project requirements and delivers to your inbox.',
              si: 'පාරිභෝගිකයාගේ විස්තර නිවැරදිව ලබාගෙන ඔබට Email හෝ WhatsApp ලබාදෙන Form එකක්.',
            },
            iconName: 'FileText',
            tag: { en: 'Qualified Inquiries', si: 'සුදුසුකම් ලත් විමසීම්' },
            costWeight: 1.1,
            timelineDays: 1,
          },
          {
            id: 'p1_act_book',
            indexNumber: 4,
            title: {
              en: '04. Book an In-Person or Online Visit',
              si: '04. හමුවක් හෝ වේලාවක් වෙන් කරවා ගැනීම',
            },
            subtitle: {
              en: 'Time slot selection connected to calendar or WhatsApp for quick confirmation.',
              si: 'පහසු දිනයක් හා වේලාවක් තෝරාගෙන හමුවීම තහවුරු කරගැනීම.',
            },
            iconName: 'CalendarCheck',
            tag: { en: 'Direct Booking', si: 'කාලසටහන වෙන්කිරීම' },
            costWeight: 1.15,
            timelineDays: 2,
          },
          {
            id: 'p1_act_catalog',
            indexNumber: 5,
            title: {
              en: '05. Browse Catalog & Inquire on Items',
              si: '05. භාණ්ඩ හෝ සේවා තොරතුරු බලා විමසීම',
            },
            subtitle: {
              en: 'Visual item browsing with per-item "Inquire on WhatsApp" buttons.',
              si: 'සෑම භාණ්ඩයක් යටින්ම "Inquire on WhatsApp" පහසුකම සහිත catalog එකක්.',
            },
            iconName: 'Eye',
            tag: { en: 'Catalog Inquiries', si: 'භාණ්ඩ විමසීම්' },
            costWeight: 1.12,
            timelineDays: 1,
          },
        ],
      },
    ],
  },

  // ----------------------------------------------------
  // PATHWAY 02: ONLINE STORE (ECOMMERCE)
  // ----------------------------------------------------
  {
    id: 'ecommerce_store',
    number: 2,
    title: {
      en: '02. Online Store (E-Commerce)',
      si: '02. අන්තර්ජාල අලෙවිසැලක් (E-Commerce)',
    },
    subtitle: {
      en: 'Sell products 24/7 with zero-friction checkout or automated WhatsApp orders.',
      si: 'පැය 24 පුරා භාණ්ඩ අලෙවි වන, කාඩ්පත් හෝ WhatsApp මගින් ඇණවුම් ලබාගන්නා Store එකක්.',
    },
    shortDescription: {
      en: 'Modern digital storefronts engineered for fast browsing, high cart completion, and zero lost sales.',
      si: 'පහසුවෙන් භාණ්ඩ තෝරාගෙන තත්පර කිහිපයකින් ඇණවුම් කළ හැකි නවීන අලෙවිසැල්.',
    },
    icon: 'ShoppingBag',
    badge: {
      en: 'Direct Sales',
      si: 'සෘජු අලෙවිය',
    },
    steps: [
      {
        stepIndex: 1,
        stepTitle: {
          en: 'Selling Type',
          si: 'භාණ්ඩ වර්ගය',
        },
        stepQuestion: {
          en: 'What type of products will you sell online?',
          si: 'ඔබ මෙම Store එකෙන් අලෙවි කිරීමට බලාපොරොත්තු වන්නේ කුමන වර්ගයේ භාණ්ඩද?',
        },
        stepSubBrief: {
          en: 'Determines catalog structure, variant logic, and media asset loading.',
          si: 'භාණ්ඩ වර්ගය අනුව catalog සැකැස්ම සහ image loading වේගය තීරණය කිරීමට.',
        },
        avatarSpeech: {
          en: 'What kind of products will you be offering in your online store?',
          si: 'ඔබ අලෙවි කරන්නේ කුමන වර්ගයේ භාණ්ඩද?',
        },
        options: [
          {
            id: 'p2_type_physical',
            indexNumber: 1,
            title: {
              en: '01. Physical Products',
              si: '01. ඇඳුම්, ඉලෙක්ට්‍රොනික්, ආහාර හා භාණ්ඩ (Physical Goods)',
            },
            subtitle: {
              en: 'Requires inventory tracking, delivery addresses, and shipping fee calculation.',
              si: 'තොග ගණන් බැලීම, ඩිලිවරි ලිපිනයන් සහ ඩිලිවරි ගාස්තු ගණනය කිරීම් සහිතව.',
            },
            iconName: 'ShoppingBag',
            tag: { en: 'Physical Goods', si: 'භෞතික භාණ්ඩ' },
            costWeight: 1.0,
            timelineDays: 10,
          },
          {
            id: 'p2_type_digital',
            indexNumber: 2,
            title: {
              en: '02. Digital Products & Downloads',
              si: '02. eBooks, Presets, Software, Courses (Digital Downloads)',
            },
            subtitle: {
              en: 'Instant automated download links upon payment confirmation with zero shipping.',
              si: 'මුදල් ගෙවූ සැණින් ස්වයංක්‍රීයව Download කරගත හැකි Digital පද්ධතියක්.',
            },
            iconName: 'Cpu',
            tag: { en: 'Instant Delivery', si: 'ක්ෂණික බාගත කිරීම' },
            costWeight: 1.1,
            timelineDays: 8,
          },
          {
            id: 'p2_type_services',
            indexNumber: 3,
            title: {
              en: '03. Bookable Services & Packages',
              si: '03. සේවා පැකේජ හා සාමාජිකත්ව (Services & Packages)',
            },
            subtitle: {
              en: 'Sell coaching packages, salon tiers, or fixed-price service bundles online.',
              si: 'සේවා පැකේජ සඳහා ඔන්ලයින් මුදල් ගෙවා කාලසටහන වෙන්කරවා ගැනීමේ පහසුකම.',
            },
            iconName: 'Layers',
            tag: { en: 'Service Sales', si: 'සේවා අලෙවිය' },
            costWeight: 1.15,
            timelineDays: 9,
          },
          {
            id: 'p2_type_wholesale',
            indexNumber: 4,
            title: {
              en: '04. B2B Wholesale & Bulk Supply',
              si: '04. තොග වෙළඳාම හා B2B සැපයුම් (Wholesale)',
            },
            subtitle: {
              en: 'Tiered bulk pricing, minimum order quantities (MOQ), and dealer logins.',
              si: 'තොග මිල ගණන්, අවම ඇණවුම් ප්‍රමාණ (MOQ) සහ ව්‍යාපාරික පාරිභෝගික ගිණුම්.',
            },
            iconName: 'Building2',
            tag: { en: 'B2B Wholesale', si: 'තොග වෙළඳාම' },
            costWeight: 1.3,
            timelineDays: 12,
          },
          {
            id: 'p2_type_marketplace',
            indexNumber: 5,
            title: {
              en: '05. Multi-Vendor / Diverse Catalog',
              si: '05. විවිධ විකුණුම්කරුවන්ගේ හෝ පුළුල් භාණ්ඩ එකතුවක්',
            },
            subtitle: {
              en: 'Multi-category marketplace with seller dashboards and unified cart checkout.',
              si: 'විකුණුම්කරුවන් කිහිපදෙනෙකුගේ භාණ්ඩ එක් store එකකින් අලෙවි කිරීම.',
            },
            iconName: 'Filter',
            tag: { en: 'Multi-Vendor', si: 'පුළුල් වෙළඳපොල' },
            costWeight: 1.45,
            timelineDays: 14,
          },
        ],
      },
      {
        stepIndex: 2,
        stepTitle: {
          en: 'Catalog Volume',
          si: 'භාණ්ඩ ප්‍රමාණය',
        },
        stepQuestion: {
          en: 'How many items will you launch in your initial catalog?',
          si: 'ආරම්භයේදී ඔබේ store එකේ භාණ්ඩ කීයක් පමණ අලෙවි කිරීමට තිබේද?',
        },
        stepSubBrief: {
          en: 'Calibrates database indexing, filter speeds, and search indexing.',
          si: 'Store එකේ වේගය සහ Database ප්‍රමාණය නිවැරදිව තීරණය කිරීමට.',
        },
        avatarSpeech: {
          en: 'Select your initial catalog volume to size the database and speed optimization.',
          si: 'භාණ්ඩ ප්‍රමාණය තෝරන්න.',
        },
        options: [
          {
            id: 'p2_vol_small',
            indexNumber: 1,
            title: {
              en: '01. 1–10 Signature Products',
              si: '01. භාණ්ඩ 1 සිට 10 දක්වා විශේෂිත සුළු ප්‍රමාණයක්',
            },
            subtitle: {
              en: 'Focused boutique presentation with deep product storytelling and ultra-fast speed.',
              si: 'අවධානය දිනාගන්නා ප්‍රධාන භාණ්ඩ කිහිපයක් සඳහා ඉතා වේගවත් boutique store එකක්.',
            },
            iconName: 'Award',
            tag: { en: 'Boutique Store', si: 'සුළු එකතුවක්' },
            costWeight: 1.0,
            timelineDays: 0,
          },
          {
            id: 'p2_vol_medium',
            indexNumber: 2,
            title: {
              en: '02. 11–50 Growing Catalog',
              si: '02. භාණ්ඩ 11 සිට 50 දක්වා මධ්‍යම ප්‍රමාණයක්',
            },
            subtitle: {
              en: 'Category browsing, search bar, stock counters, and related product recommendations.',
              si: 'වර්ගීකරණය, සෙවුම් පහසුකම්, තොග ගණනය සහ අදාළ භාණ්ඩ යෝජනා සහිතව.',
            },
            iconName: 'ShoppingBag',
            tag: { en: 'Standard Catalog', si: 'මධ්‍යම Store' },
            costWeight: 1.15,
            timelineDays: 2,
          },
          {
            id: 'p2_vol_large',
            indexNumber: 3,
            title: {
              en: '03. 50–200 Diverse Products',
              si: '03. භාණ්ඩ 50 සිට 200 දක්වා පුළුල් එකතුවක්',
            },
            subtitle: {
              en: 'Faceted filtering by size, color, price range, and instant search index.',
              si: 'මිල, ප්‍රමාණය, වර්ණය අනුව filter කිරීම් සහිත පුළුල් භාණ්ඩ එකතුවක්.',
            },
            iconName: 'Layers',
            tag: { en: 'Faceted Catalog', si: 'පුළුල් එකතුව' },
            costWeight: 1.25,
            timelineDays: 3,
          },
          {
            id: 'p2_vol_mega',
            indexNumber: 4,
            title: {
              en: '04. 200+ Enterprise Mega Inventory',
              si: '04. භාණ්ඩ 200කට වඩා වැඩි මහා පරිමාණ එකතුවක්',
            },
            subtitle: {
              en: 'High-volume database architecture, bulk CSV import/export, and warehouse sync.',
              si: 'Excel/CSV හරහා එකවර භාණ්ඩ දහස් ගණනක් ඇතුළත් කළ හැකි Enterprise පද්ධතියක්.',
            },
            iconName: 'Database',
            tag: { en: 'Mega Inventory', si: 'මහා පරිමාණ' },
            costWeight: 1.4,
            timelineDays: 5,
          },
          {
            id: 'p2_vol_funnel',
            indexNumber: 5,
            title: {
              en: '05. Single Hero Product Sales Funnel',
              si: '05. තනි ප්‍රධාන භාණ්ඩයක් සඳහා අධි-වේගී Sales Funnel එකක්',
            },
            subtitle: {
              en: 'Optimized 1-page conversion machine engineered for viral social media ads.',
              si: 'Facebook/TikTok Ads වලින් එන අයට එක පිටුවකින් ක්ෂණිකව මිලදී ගත හැකි Funnel එකක්.',
            },
            iconName: 'Flame',
            tag: { en: 'Ad Funnel', si: 'අධි-වේගී Funnel' },
            costWeight: 1.05,
            timelineDays: 1,
          },
        ],
      },
      {
        stepIndex: 3,
        stepTitle: {
          en: 'Ordering Flow',
          si: 'ඇණවුම් ක්‍රමය',
        },
        stepQuestion: {
          en: 'How do you want customers to complete checkout?',
          si: 'ගනුදෙනුකරුවන් ඇණවුම් කළ යුතු වඩාත් සුදුසු ක්‍රමය කුමක්ද?',
        },
        stepSubBrief: {
          en: 'Selects your payment gateway, WhatsApp checkout, or hybrid COD pipeline.',
          si: 'කාඩ්පත් ගෙවීම්, WhatsApp ඇණවුම් හෝ COD ක්‍රමවේදය තෝරාගැනීමට.',
        },
        avatarSpeech: {
          en: 'Choose how your customers should pay and place their orders.',
          si: 'පාරිභෝගිකයා ඇණවුම තහවුරු කළ යුතු ප්‍රධාන ක්‍රමය තෝරන්න.',
        },
        options: [
          {
            id: 'p2_flow_whatsapp',
            indexNumber: 1,
            title: {
              en: '01. Instant WhatsApp One-Click Order',
              si: '01. ස්වයංක්‍රීය WhatsApp ඔස්සේ ක්ෂණික ඇණවුම්',
            },
            subtitle: {
              en: 'Cart items, total price, and delivery address generate directly into a WhatsApp message.',
              si: 'භාණ්ඩ විස්තර, මුළු මුදල සහ ලිපිනය ස්වයංක්‍රීයව සටහන් වී WhatsApp පණිවිඩයක් ලෙස ලැබීම.',
            },
            iconName: 'MessageCircle',
            tag: { en: 'Zero Commission', si: 'නොමිලේ ඇණවුම්' },
            costWeight: 1.0,
            timelineDays: 0,
          },
          {
            id: 'p2_flow_gateway',
            indexNumber: 2,
            title: {
              en: '02. Online Card Payment Gateway Checkout',
              si: '02. Online Card Payment Gateway (Visa, Master, Koko, Mintpay)',
            },
            subtitle: {
              en: 'Direct automated online payment with PayHere, WebXPay, Stripe, or Installment buy-now-pay-later.',
              si: 'ක්‍රෙඩිට්/ඩෙබිට් කාඩ්පත් හා පහසු ගෙවීමේ (Buy Now Pay Later) ක්‍රම ඔස්සේ මුදල් ලබාගැනීම.',
            },
            iconName: 'CreditCard',
            tag: { en: 'Automated Sales', si: 'ස්වයංක්‍රීය ගෙවීම්' },
            costWeight: 1.2,
            timelineDays: 2,
          },
          {
            id: 'p2_flow_cod',
            indexNumber: 3,
            title: {
              en: '03. Cash on Delivery (COD) + Bank Slip Upload',
              si: '03. Cash on Delivery (COD) සහ බැංකු රිසිට්පත් upload කිරීම',
            },
            subtitle: {
              en: 'Standard local payment flow where buyers confirm COD or upload bank transfer receipts.',
              si: 'භාණ්ඩ ලැබුණු පසු මුදල් ගෙවීම හෝ බැංකු තැන්පතු රිසිට්පත site එකට upload කිරීම.',
            },
            iconName: 'FileCheck',
            tag: { en: 'Local Delivery', si: 'දේශීය ක්‍රමය' },
            costWeight: 1.05,
            timelineDays: 1,
          },
          {
            id: 'p2_flow_hybrid',
            indexNumber: 4,
            title: {
              en: '04. Hybrid: Online Cards + WhatsApp Assistant',
              si: '04. කාඩ්පත් ගෙවීම් සහ WhatsApp සහාය යන දෙකම (Hybrid)',
            },
            subtitle: {
              en: 'Buyers can pay online instantly or tap to ask questions on WhatsApp before completing.',
              si: 'කාඩ් මගින් ගෙවීමට මෙන්ම සැකයක් ඇත්නම් WhatsApp මගින් විමසීමටද අවස්ථාව.',
            },
            iconName: 'Zap',
            tag: { en: 'Maximum Flexibility', si: 'උපරිම පහසුව' },
            costWeight: 1.25,
            timelineDays: 2,
          },
          {
            id: 'p2_flow_quote',
            indexNumber: 5,
            title: {
              en: '05. Custom Quote-to-Order for Bespoke Items',
              si: '05. විශේෂ භාණ්ඩ සඳහා මිල විමසා තහවුරු කරගැනීම',
            },
            subtitle: {
              en: 'Customer selects customization options and submits for a custom production quote.',
              si: 'භාණ්ඩයේ වෙනස්කම් තෝරාගෙන මිල විමසා සාකච්ඡා කර ඇණවුම් කිරීම.',
            },
            iconName: 'FileText',
            tag: { en: 'Bespoke Custom', si: 'විශේෂ ඇණවුම්' },
            costWeight: 1.15,
            timelineDays: 2,
          },
        ],
      },
    ],
  },

  // ----------------------------------------------------
  // PATHWAY 03: ONLINE BOOKING & APPOINTMENTS
  // ----------------------------------------------------
  {
    id: 'booking_system',
    number: 3,
    title: {
      en: '03. Online Booking & Appointments',
      si: '03. වේලාවන් වෙන්කර ගැනීමේ පද්ධතියක්',
    },
    subtitle: {
      en: 'Automated time slot scheduling, client reminders, and online calendar sync.',
      si: 'පාරිභෝගිකයින්ට පහසුවෙන් වේලාවන් වෙන්කරගත හැකි, SMS/WhatsApp alerts සහිත පද්ධති.',
    },
    shortDescription: {
      en: 'Eliminate double-booking and endless phone tag with an automated scheduling platform.',
      si: 'අතින් ලියන පොත් වෙනුවට දවස පුරා ස්වයංක්‍රීයව වැඩ කරන කාලසටහන් පද්ධතියක්.',
    },
    icon: 'CalendarCheck',
    badge: {
      en: 'Zero Hassle',
      si: 'ස්වයංක්‍රීය කාලසටහන්',
    },
    steps: [
      {
        stepIndex: 1,
        stepTitle: {
          en: 'Booking Category',
          si: 'සේවා කාණ්ඩය',
        },
        stepQuestion: {
          en: 'What appointment format do you schedule?',
          si: 'ඔබ වෙන් කරවා ගැනීමට බලාපොරොත්තු වන්නේ කුමන ආකාරයේ සේවාවන් සඳහාද?',
        },
        stepSubBrief: {
          en: 'Tailors your booking calendar layout and customer intake flow.',
          si: 'කාලසටහන හා සේවාදායක intake flow එක නිවැරදිව සකස් කිරීමට.',
        },
        avatarSpeech: {
          en: 'What category of appointments will you manage online?',
          si: 'ඔබ වෙන් කරවා ගන්නේ කුමන ආකාරයේ සේවාවන් සඳහාද?',
        },
        options: [
          {
            id: 'p3_cat_oneonone',
            indexNumber: 1,
            title: {
              en: '01. One-on-One Client Appointments',
              si: '01. සැලෝන්, වෛද්‍ය, නීතිඥ හෝ පුද්ගලික හමුවීම් (1-on-1)',
            },
            subtitle: {
              en: 'Individual time slots, doctor/therapist appointments, or client consultation meetings.',
              si: 'තනි පාරිභෝගිකයෙකු සඳහා වේලාවක් වෙන්කිරීම (සැලෝන්, වෛද්‍ය, උපදේශන).',
            },
            iconName: 'UserCheck',
            tag: { en: '1-on-1 Sessions', si: 'පුද්ගලික හමුවීම්' },
            costWeight: 1.0,
            timelineDays: 8,
          },
          {
            id: 'p3_cat_group',
            indexNumber: 2,
            title: {
              en: '02. Group Classes, Workshops & Fitness',
              si: '02. පුහුණු පන්ති, යෝගා, ජිම් හෝ වැඩමුළු (Group Sessions)',
            },
            subtitle: {
              en: 'Capacity-limited group slots (e.g. 15 attendees per session) with automated waitlists.',
              si: 'සීමිත පිරිසකට සහභාගී විය හැකි පන්ති, වැඩමුළු හා යෝගා/ජිම් සැසි.',
            },
            iconName: 'Users',
            tag: { en: 'Group Capacity', si: 'කණ්ඩායම් පන්ති' },
            costWeight: 1.15,
            timelineDays: 9,
          },
          {
            id: 'p3_cat_rooms',
            indexNumber: 3,
            title: {
              en: '03. Hotel Rooms, Luxury Villas & Venues',
              si: '03. හෝටල් කාමර, විලා, හෝල් හා ඉඩකඩ වෙන්කිරීම් (Rooms & Venues)',
            },
            subtitle: {
              en: 'Nightly rates, check-in/check-out dates, guest count, and seasonal pricing.',
              si: 'දිනයන් අනුව කාමර හෝ විලා වෙන්කිරීම්, අමුත්තන් ගණන සහ විශේෂ ගාස්තු.',
            },
            iconName: 'Building',
            tag: { en: 'Hospitality & Stays', si: 'නවාතැන් හා හෝල්' },
            costWeight: 1.3,
            timelineDays: 12,
          },
          {
            id: 'p3_cat_rentals',
            indexNumber: 4,
            title: {
              en: '04. Vehicle & Equipment Rentals',
              si: '04. වාහන, කැමරා හා උපකරණ කුලියට දීම (Rentals)',
            },
            subtitle: {
              en: 'Hourly or daily rental bookings with security deposit calculation.',
              si: 'පැය හෝ දින ගණනට වාහන හෝ උපකරණ කුලියට දීම සහ ඇප තැන්පතු පාලනය.',
            },
            iconName: 'ShieldCheck',
            tag: { en: 'Asset Rentals', si: 'කුලියට දීම්' },
            costWeight: 1.25,
            timelineDays: 11,
          },
          {
            id: 'p3_cat_virtual',
            indexNumber: 5,
            title: {
              en: '05. Professional Virtual Consultations',
              si: '05. Zoom / Google Meet Online උපදේශන සේවා (Virtual Calls)',
            },
            subtitle: {
              en: 'Automatic Google Meet / Zoom link generation delivered to client upon booking.',
              si: 'වෙන්කළ සැණින් සේවාදායකයාට Zoom හෝ Google Meet ලින්ක් එක ස්වයංක්‍රීයව ලැබීම.',
            },
            iconName: 'Video',
            tag: { en: 'Virtual Sync', si: 'ඔන්ලයින් හමුවීම්' },
            costWeight: 1.1,
            timelineDays: 8,
          },
        ],
      },
      {
        stepIndex: 2,
        stepTitle: {
          en: 'Required Logic',
          si: 'අවශ්‍ය පහසුකම්',
        },
        stepQuestion: {
          en: 'What automated scheduling rules do you require?',
          si: 'ඔබේ පද්ධතියට අත්‍යවශ්‍ය වන ප්‍රධානතම තාක්ෂණික පහසුකම් මොනවාද?',
        },
        stepSubBrief: {
          en: 'Eliminates double-bookings and automates customer reminder alerts.',
          si: 'දෙවරක් වෙන්වීම් වැළැක්වීමට සහ ස්වයංක්‍රීය WhatsApp alerts යැවීමට.',
        },
        avatarSpeech: {
          en: 'Define the intelligent rules and reminders behind your calendar.',
          si: 'ස්වයංක්‍රීය පහසුකම් තෝරන්න.',
        },
        options: [
          {
            id: 'p3_logic_slots',
            indexNumber: 1,
            title: {
              en: '01. Real-Time Time Slots & Buffer Gaps',
              si: '01. හිස් වේලාවන් ස්වයංක්‍රීයව පෙන්වීම සහ විරාම කාල (Buffer Times)',
            },
            subtitle: {
              en: 'Displays only open available slots and automatically leaves buffer time between clients.',
              si: 'පවතින වේලාවන් පමණක් පෙන්වා, සේවාදායකයින් දෙදෙනෙකු අතර විරාමයක් තැබීම.',
            },
            iconName: 'Clock',
            tag: { en: 'Smart Slots', si: 'නිවැරදි වේලාවන්' },
            costWeight: 1.0,
            timelineDays: 0,
          },
          {
            id: 'p3_logic_reminders',
            indexNumber: 2,
            title: {
              en: '02. Automated WhatsApp / SMS Reminders',
              si: '02. පාරිභෝගිකයාට ස්වයංක්‍රීය WhatsApp / SMS සිහිකැඳවීම්',
            },
            subtitle: {
              en: 'Drastically reduces no-shows by sending alerts 24h and 2h before the appointment.',
              si: 'හමුවීමට පැය 24කට සහ පැය 2කට පෙර ස්වයංක්‍රීයව Reminder එකක් යැවීම.',
            },
            iconName: 'MessageSquareCode',
            tag: { en: 'Zero No-Shows', si: 'මගහැරීම් වැළැක්වීම' },
            costWeight: 1.1,
            timelineDays: 1,
          },
          {
            id: 'p3_logic_sync',
            indexNumber: 3,
            title: {
              en: '03. Google Calendar & Outlook Real-Time Sync',
              si: '03. Google Calendar & Phone Calendar කෙළින්ම Sync වීම',
            },
            subtitle: {
              en: 'Bookings instantly appear on your phone calendar so your team is never blind.',
              si: 'ලැබෙන bookings සියල්ල ඔබගේ Phone Calendar එකට ක්ෂණිකව sync වේ.',
            },
            iconName: 'Calendar',
            tag: { en: 'Calendar Sync', si: 'දින දර්ශන Sync' },
            costWeight: 1.15,
            timelineDays: 1,
          },
          {
            id: 'p3_logic_payment',
            indexNumber: 4,
            title: {
              en: '04. Advance Deposit / Full Online Payment',
              si: '04. වෙන්කිරීමේදී මුලික අත්තිකාරම් හෝ සම්පූර්ණ ගෙවීම්',
            },
            subtitle: {
              en: 'Require a non-refundable deposit before locking the calendar time slot.',
              si: 'වේලාව වෙන්කිරීමට පෙර සුළු අත්තිකාරම් මුදලක් කාඩ්පත් මගින් ලබාගැනීම.',
            },
            iconName: 'CreditCard',
            tag: { en: 'Advance Deposit', si: 'අත්තිකාරම් ගෙවීම්' },
            costWeight: 1.2,
            timelineDays: 2,
          },
          {
            id: 'p3_logic_reschedule',
            indexNumber: 5,
            title: {
              en: '05. Client Self-Service Reschedule & Cancel',
              si: '05. පාරිභෝගිකයාටම අවශ්‍ය නම් වේලාව වෙනස් කරගැනීම',
            },
            subtitle: {
              en: 'Clients manage their own rescheduling link without bothering your front desk.',
              si: 'සේවාදායකයාටම ලැබෙන link එකකින් පහසුවෙන් වෙනත් දිනයක් තෝරාගැනීම.',
            },
            iconName: 'RefreshCw',
            tag: { en: 'Self-Service', si: 'ස්වයං කළමනාකරණය' },
            costWeight: 1.05,
            timelineDays: 1,
          },
        ],
      },
      {
        stepIndex: 3,
        stepTitle: {
          en: 'Customer Experience',
          si: 'පාරිභෝගික අත්දැකීම',
        },
        stepQuestion: {
          en: 'How fast should the booking experience be?',
          si: 'පාරිභෝගිකයා වේලාව වෙන්කරගන්නා අත්දැකීම කෙසේ විය යුතුද?',
        },
        stepSubBrief: {
          en: 'Optimizes mobile touch targets for rapid sub-30 second appointments.',
          si: 'Smart phone එකෙන් තත්පර 30න් වේලාව වෙන්කරගැනීමේ පහසුව.',
        },
        avatarSpeech: {
          en: 'Choose the optimal flow for your clients when they reserve an appointment.',
          si: 'පාරිභෝගිකයාට වඩාත්ම පහසු සහ වේගවත් ක්‍රමය තෝරන්න.',
        },
        options: [
          {
            id: 'p3_exp_fast',
            indexNumber: 1,
            title: {
              en: '01. Ultra-Fast 20-Second Mobile Booking',
              si: '01. තත්පර 20න් Phone එකෙන් වෙන්කිරීම (Rapid Mobile)',
            },
            subtitle: {
              en: 'Pick service -> pick date -> enter phone number -> done. Zero friction.',
              si: 'සේවාව තෝරයි -> දිනය තෝරයි -> දුරකථන අංකය ලබාදෙයි -> අවසන්. උපරිම වේගවත්.',
            },
            iconName: 'Smartphone',
            tag: { en: 'Frictionless', si: 'උපරිම වේගය' },
            costWeight: 1.0,
            timelineDays: 0,
          },
          {
            id: 'p3_exp_intake',
            indexNumber: 2,
            title: {
              en: '02. Detailed Intake Questionnaire Flow',
              si: '02. අවශ්‍ය විස්තර කලින් ලබාගෙන තහවුරු කිරීම (Pre-Intake)',
            },
            subtitle: {
              en: 'Collect client medical history, preferences, or requirements before the visit.',
              si: 'පැමිණීමට පෙර සේවාදායකයාගේ අවශ්‍යතා හෝ රෝග ඉතිහාසය පූර්ව පෝරමයකින් ලබාගැනීම.',
            },
            iconName: 'FileText',
            tag: { en: 'Pre-Screening', si: 'පූර්ව විස්තර' },
            costWeight: 1.08,
            timelineDays: 1,
          },
          {
            id: 'p3_exp_staff',
            indexNumber: 3,
            title: {
              en: '03. Staff Member / Specialist Selection',
              si: '03. සේවය සපයන විශේෂඥයා හෝ සේවකයා තෝරාගැනීම',
            },
            subtitle: {
              en: 'Allows clients to choose their favorite hairdresser, doctor, or fitness coach.',
              si: 'තමන් කැමති සේවකයා හෝ උපදේශකයා තෝරාගෙන ඔහුට අදාළ වේලාවන් පමණක් දැකීම.',
            },
            iconName: 'Crown',
            tag: { en: 'Staff Selection', si: 'සේවක තේරීම' },
            costWeight: 1.15,
            timelineDays: 2,
          },
          {
            id: 'p3_exp_recurring',
            indexNumber: 4,
            title: {
              en: '04. Recurring Weekly / Monthly Bookings',
              si: '04. සතිපතා හෝ මාස්පතා නැවත නැවත වෙන්වීම් (Subscriptions)',
            },
            subtitle: {
              en: 'Clients book a fixed slot every Tuesday for an entire month automatically.',
              si: 'සෑම සතියකම හෝ මාසයකම ස්වයංක්‍රීයව නැවත වෙන්වෙන සාමාජික ක්‍රම.',
            },
            iconName: 'RefreshCw',
            tag: { en: 'Recurring Slots', si: 'නැවත වෙන්වීම්' },
            costWeight: 1.2,
            timelineDays: 2,
          },
          {
            id: 'p3_exp_approval',
            indexNumber: 5,
            title: {
              en: '05. VIP Concierge Approval Workflow',
              si: '05. පරිපාලක අනුමැතිය මත පමණක් තහවුරු වීම (VIP Concierge)',
            },
            subtitle: {
              en: 'Client requests the slot, and you manually approve or suggest alternative times.',
              si: 'ඉල්ලීම ලැබුණු පසු ඔබ පරීක්ෂා කර අනුමත කළ පසු පමණක් සේවාදායකයාට තහවුරු වීම.',
            },
            iconName: 'Shield',
            tag: { en: 'Approval Flow', si: 'අනුමැතිය මත' },
            costWeight: 1.1,
            timelineDays: 1,
          },
        ],
      },
    ],
  },

  // ----------------------------------------------------
  // PATHWAY 04: CUSTOM WEB SYSTEM / WEB APP
  // ----------------------------------------------------
  {
    id: 'custom_system',
    number: 4,
    title: {
      en: '04. Custom Web System / Web App',
      si: '04. විශේෂිත මෘදුකාංග පද්ධතියක් (Web App)',
    },
    subtitle: {
      en: 'Tailored internal portals, staff dashboards, inventory, and AI automation.',
      si: 'ව්‍යාපාරික කළමනාකරණය, පාරිභෝගික Portals, ගබඩා පද්ධති හා AI ස්වයංක්‍රීයකරණය.',
    },
    shortDescription: {
      en: 'Engineered web applications built specifically around your unique business operations.',
      si: 'ඔබේ ව්‍යාපාරික ක්‍රමවේදයටම ගැලපෙන පරිදි සාදන විශේෂිත Cloud මෘදුකාංග.',
    },
    icon: 'Cpu',
    badge: {
      en: 'Custom Architecture',
      si: 'සුවිශේෂී මෘදුකාංග',
    },
    steps: [
      {
        stepIndex: 1,
        stepTitle: {
          en: 'Core Workflow',
          si: 'ප්‍රධාන කාර්යය',
        },
        stepQuestion: {
          en: 'What core operational workflow needs custom software?',
          si: 'ඔබේ මෘදුකාංග පද්ධතිය හරහා විසඳිය යුතු ප්‍රධානම කාර්යය කුමක්ද?',
        },
        stepSubBrief: {
          en: 'Defines your business database schema and cloud architecture.',
          si: 'ව්‍යාපාරික දත්ත සමුදාය හා Cloud architecture එක තීරණය කිරීමට.',
        },
        avatarSpeech: {
          en: 'Select the primary core workflow this custom system will automate.',
          si: 'පද්ධතියේ ප්‍රධාන කාර්යය තෝරන්න.',
        },
        options: [
          {
            id: 'p4_flow_portal',
            indexNumber: 1,
            title: {
              en: '01. Self-Service Customer Portal & Account Hub',
              si: '01. පාරිභෝගික Login, Account විස්තර හා සේවා (Client Portal)',
            },
            subtitle: {
              en: 'Clients log in to view project progress, invoices, download files, or submit tickets.',
              si: 'පාරිභෝගිකයාට තම ගිණුමට පිවිස ලිපිගොනු, බිල්පත් බැලීමට සහ විස්තර ලබාගැනීමට.',
            },
            iconName: 'UserCheck',
            tag: { en: 'Client Hub', si: 'පාරිභෝගික Portal' },
            costWeight: 1.1,
            timelineDays: 12,
          },
          {
            id: 'p4_flow_dashboard',
            indexNumber: 2,
            title: {
              en: '02. Internal Staff Management & Operations Dashboard',
              si: '02. කාර්ය මණ්ඩල මෙහෙයුම් හා කළමනාකරණ Dashboard',
            },
            subtitle: {
              en: 'Assign tasks, monitor employee attendance, process client records, and track revenue.',
              si: 'කාර්ය මණ්ඩලයට වැඩ පැවරීම, පැමිණීම, සේවාදායක දත්ත හා ආදායම් වාර්තා බැලීම.',
            },
            iconName: 'Layers',
            tag: { en: 'Operations', si: 'මෙහෙයුම් Dashboard' },
            costWeight: 1.25,
            timelineDays: 14,
          },
          {
            id: 'p4_flow_inventory',
            indexNumber: 3,
            title: {
              en: '03. Smart Inventory & Warehouse Stock Tracking',
              si: '03. තොග හා ගබඩා ස්වයංක්‍රීයව පාලනය කරන පද්ධතියක් (Stock Hub)',
            },
            subtitle: {
              en: 'Barcode scanning, low-stock WhatsApp warnings, supplier orders, and multi-branch stock.',
              si: 'බාර්කෝඩ් කියවීම, තොග අඩුවන විට WhatsApp පණිවිඩ සහ ශාඛා කිහිපයක තොග පාලනය.',
            },
            iconName: 'Database',
            tag: { en: 'Inventory Control', si: 'තොග කළමනාකරණය' },
            costWeight: 1.35,
            timelineDays: 16,
          },
          {
            id: 'p4_flow_billing',
            indexNumber: 4,
            title: {
              en: '04. Automated Billing, Invoicing & Receipts System',
              si: '04. බිල්පත්, ගිණුම් හා මුදල් වාර්තා පද්ධතියක් (Invoicing Engine)',
            },
            subtitle: {
              en: 'Generate professional PDF invoices with QR codes, recurring monthly dues, and payment tracking.',
              si: 'QR කේත සහිත PDF බිල්පත්, මාසික ගෙවීම් පාලනය හා ලැබිය යුතු හිඟ මුදල් ලැයිස්තු.',
            },
            iconName: 'Calculator',
            tag: { en: 'Billing Engine', si: 'බිල්පත් පද්ධතිය' },
            costWeight: 1.2,
            timelineDays: 13,
          },
          {
            id: 'p4_flow_ai',
            indexNumber: 5,
            title: {
              en: '05. Intelligent AI-Assisted Automation Workflow',
              si: '05. AI තාක්ෂණය මගින් මෙහෙයවෙන ස්වයංක්‍රීය පද්ධතියක් (AI Ops)',
            },
            subtitle: {
              en: 'AI models that summarize documents, answer customer FAQs 24/7, or classify incoming files.',
              si: 'පාරිභෝගික ගැටලුවලට පිළිතුරු දෙන, ලියකියවිලි කියවන AI සහයක පද්ධතියක්.',
            },
            iconName: 'Bot',
            tag: { en: 'AI Automation', si: 'AI ස්වයංක්‍රීයකරණය' },
            costWeight: 1.4,
            timelineDays: 15,
          },
        ],
      },
      {
        stepIndex: 2,
        stepTitle: {
          en: 'User Roles',
          si: 'පරිශීලක අවසර',
        },
        stepQuestion: {
          en: 'Who will access this platform daily?',
          si: 'මෙම පද්ධතියට පිවිසෙන්නේ කුමන ආකාරයේ පරිශීලකයින්ද?',
        },
        stepSubBrief: {
          en: 'Configures role-based access control and administrative permissions.',
          si: 'ආරක්ෂාව හා අවසර කළමනාකරණය නිවැරදිව සකස් කිරීමට.',
        },
        avatarSpeech: {
          en: 'Select the user access model and role-based permissions needed.',
          si: 'පද්ධතිය භාවිත කරන පුද්ගලයින් තෝරන්න.',
        },
        options: [
          {
            id: 'p4_role_staff',
            indexNumber: 1,
            title: {
              en: '01. Internal Staff & Admins Only',
              si: '01. ආයතනයේ කාර්ය මණ්ඩලය හා කළමනාකාරිත්වය පමණි (Staff Only)',
            },
            subtitle: {
              en: 'Closed internal company tool with strict enterprise login protection.',
              si: 'ආයතනයේ අභ්‍යන්තර සාමාජිකයින්ට පමණක් පිවිසිය හැකි ආරක්ෂිත පද්ධතියක්.',
            },
            iconName: 'ShieldCheck',
            tag: { en: 'Closed Internal', si: 'අභ්‍යන්තර පමණි' },
            costWeight: 1.0,
            timelineDays: 0,
          },
          {
            id: 'p4_role_public',
            indexNumber: 2,
            title: {
              en: '02. Public Customers + Back-Office Admin',
              si: '02. බාහිර පාරිභෝගිකයින් සහ අභ්‍යන්තර පරිපාලකයින් (Two-Sided)',
            },
            subtitle: {
              en: 'Public users register their own accounts while company admins control data from behind.',
              si: 'පාරිභෝගිකයින් තමන්ගේම ගිණුම් සාදන අතර ආයතනය විසින් සියල්ල පාලනය කිරීම.',
            },
            iconName: 'Users',
            tag: { en: 'Dual Interface', si: 'දෙපැත්තම ආවරණය' },
            costWeight: 1.15,
            timelineDays: 2,
          },
          {
            id: 'p4_role_multitier',
            indexNumber: 3,
            title: {
              en: '03. Multi-Tier Hierarchical Roles',
              si: '03. බහු-ස්ථර අවසර (Super Admin, Manager, Cashier, Client)',
            },
            subtitle: {
              en: 'Granular permissions: each employee sees only the data permitted for their specific job role.',
              si: 'තනතුර අනුව පමණක් තොරතුරු දැකීමට හැකි Granular Permissions පද්ධතියක්.',
            },
            iconName: 'Crown',
            tag: { en: 'Granular RBAC', si: 'තනතුරු අනුව අවසර' },
            costWeight: 1.25,
            timelineDays: 3,
          },
          {
            id: 'p4_role_vendor',
            indexNumber: 4,
            title: {
              en: '04. External Vendors & Suppliers Portal',
              si: '04. බාහිර සැපයුම්කරුවන්ගේ පිවිසුම් පහසුකම් (Vendor Access)',
            },
            subtitle: {
              en: 'Third-party partners log in to update purchase orders, dispatch status, or quotes.',
              si: 'සැපයුම්කරුවන්ට ඇණවුම් බාරගැනීමට හා බිල්පත් ලබාදීමට වෙනම Login එකක්.',
            },
            iconName: 'Building2',
            tag: { en: 'B2B Partners', si: 'සැපයුම්කරුවන්' },
            costWeight: 1.2,
            timelineDays: 2,
          },
          {
            id: 'p4_role_open',
            indexNumber: 5,
            title: {
              en: '05. Open Access with Social Authentication',
              si: '05. Google හෝ Email මගින් ඕනෑම අයෙකුට පිවිසිය හැකි පද්ධතියක්',
            },
            subtitle: {
              en: '1-tap Google login, Apple ID, or phone OTP authentication for fast onboarding.',
              si: 'Google හෝ Phone OTP මගින් තත්පරයෙන් Login විය හැකි පද්ධතියක්.',
            },
            iconName: 'Globe',
            tag: { en: 'Social Auth', si: 'Google Login' },
            costWeight: 1.1,
            timelineDays: 1,
          },
        ],
      },
      {
        stepIndex: 3,
        stepTitle: {
          en: 'Deployment Scope',
          si: 'ආරම්භක පරිමාණය',
        },
        stepQuestion: {
          en: 'What is your target launch horizon?',
          si: 'ඔබේ ව්‍යාපෘතිය ආරම්භ කළ යුතු පරිමාණය හා වේගය කුමක්ද?',
        },
        stepSubBrief: {
          en: 'Establishes your sprint scope between rapid MVP and enterprise platform.',
          si: 'වේගවත් MVP හෝ සම්පූර්ණ Cloud පද්ධතියක් අතර පරිමාණය තෝරාගැනීමට.',
        },
        avatarSpeech: {
          en: 'What deployment scope matches your immediate roadmap?',
          si: 'ඔබට අවශ්‍ය ආරම්භක පරිමාණය තෝරන්න.',
        },
        options: [
          {
            id: 'p4_scope_mvp',
            indexNumber: 1,
            title: {
              en: '01. High-Speed MVP Launch (10–14 Days)',
              si: '01. අත්‍යවශ්‍යම අංග සහිතව දින 10-14න් නිමවන MVP එකක්',
            },
            subtitle: {
              en: 'Core essential features shipped rapidly to validate your business idea immediately.',
              si: 'අත්‍යවශ්‍යම දේ පමණක් සකසා ඉක්මනින්ම වැඩ ආරම්භ කළ හැකි වේගවත් ක්‍රමය.',
            },
            iconName: 'Flame',
            tag: { en: 'Rapid MVP', si: 'වේගවත් MVP' },
            costWeight: 1.0,
            timelineDays: 0,
          },
          {
            id: 'p4_scope_full',
            indexNumber: 2,
            title: {
              en: '02. Complete Production Platform with Full Integrations',
              si: '02. සම්පූර්ණ ප්‍රබල පද්ධතියක් ලෙස (Full Production Suite)',
            },
            subtitle: {
              en: 'Comprehensive business operating system with all integrations and reports.',
              si: 'සියලු පහසුකම්, වාර්තා හා බැංකු/SMS පද්ධති සම්බන්ධ කර සම්පූර්ණ විසඳුමක්.',
            },
            iconName: 'Award',
            tag: { en: 'Full Production', si: 'සම්පූර්ණ පද්ධතිය' },
            costWeight: 1.3,
            timelineDays: 10,
          },
          {
            id: 'p4_scope_cloud',
            indexNumber: 3,
            title: {
              en: '03. High-Scale Enterprise Cloud Architecture',
              si: '03. විශාල දත්ත ප්‍රමාණයකට සරිලන Enterprise Cloud Architecture',
            },
            subtitle: {
              en: 'Multi-region failover, auto-scaling databases, and sub-millisecond response caching.',
              si: 'දත්ත දස දහස් ගණනක් බිඳවැටීමකින් තොරව හැසිරවිය හැකි ප්‍රබල Cloud පද්ධතියක්.',
            },
            iconName: 'Server',
            tag: { en: 'Auto-Scaling', si: 'Cloud Architecture' },
            costWeight: 1.45,
            timelineDays: 14,
          },
          {
            id: 'p4_scope_pwa',
            indexNumber: 4,
            title: {
              en: '04. Mobile PWA + Desktop Synchronized Platform',
              si: '04. Phone සහ Computer දෙකටම App එකක් ලෙස භාවිතයට (PWA Sync)',
            },
            subtitle: {
              en: 'Installable directly to home screens as a mobile app without expensive Play Store fees.',
              si: 'Phone එකේ App එකක් ලෙස Install කරගත හැකි, Offline දත්තද මතක තබාගන්නා PWA.',
            },
            iconName: 'Smartphone',
            tag: { en: 'Installable PWA', si: 'App එකක් ලෙස' },
            costWeight: 1.2,
            timelineDays: 5,
          },
          {
            id: 'p4_scope_phased',
            indexNumber: 5,
            title: {
              en: '05. Phased Modular Rollout',
              si: '05. පියවරෙන් පියවර නව අංග එකතු වන සැලැස්මක් (Phased)',
            },
            subtitle: {
              en: 'Launch Phase 1 now; iteratively add Phase 2 and 3 as your revenue expands.',
              si: 'පළමු කොටස දැන් ආරම්භ කර, ආදායම වැඩිවන විට ඊළඟ කොටස් එකතු කරගැනීම.',
            },
            iconName: 'Sparkles',
            tag: { en: 'Modular Growth', si: 'පියවරෙන් පියවර' },
            costWeight: 1.1,
            timelineDays: 3,
          },
        ],
      },
    ],
  },

  // ----------------------------------------------------
  // PATHWAY 05: IMPROVE EXISTING WEBSITE
  // ----------------------------------------------------
  {
    id: 'improve_website',
    number: 5,
    title: {
      en: '05. Improve Existing Website',
      si: '05. දැනට ඇති වෙබ් අඩවිය දියුණු කිරීම',
    },
    subtitle: {
      en: 'Rebuild for speed, modern luxury redesign, and conversion rate optimization.',
      si: 'වේගය ඉහළ නැංවීම, නවීන පෙනුම ලබාදීම සහ විකුණුම් වැඩි කරවන Re-design එකක්.',
    },
    shortDescription: {
      en: 'Transform your slow, outdated site into a high-speed customer-generating digital asset.',
      si: 'පැරණි, අක්‍රිය වෙබ් අඩවි නවීන තාක්ෂණයෙන් නැවත ගොඩනැගීම.',
    },
    icon: 'TrendingUp',
    badge: {
      en: 'Speed & Rebuild',
      si: 'ප්‍රතිසංස්කරණය',
    },
    steps: [
      {
        stepIndex: 1,
        stepTitle: {
          en: 'Primary Pain Point',
          si: 'ප්‍රධාන ගැටලුව',
        },
        stepQuestion: {
          en: 'What is the biggest weakness in your current website?',
          si: 'දැනට පවතින වෙබ් අඩවියේ ඇති ප්‍රධානතම ගැටලුව කුමක්ද?',
        },
        stepSubBrief: {
          en: 'Pinpoints the exact performance or UX bottleneck holding your brand back.',
          si: 'වෙබ් අඩවියේ වේගය හෝ පාරිභෝගික ආකර්ෂණය අඩු කරන ප්‍රධාන බාධකය හඳුනාගැනීමට.',
        },
        avatarSpeech: {
          en: 'What is the single biggest weakness in your current website?',
          si: 'දැනට තිබෙන වෙබ් අඩවියේ ප්‍රධානම ගැටලුව කුමක්ද?',
        },
        options: [
          {
            id: 'p5_pain_speed',
            indexNumber: 1,
            title: {
              en: '01. Extremely Slow Loading & Poor Google PageSpeed',
              si: '01. වෙබ් අඩවිය load වීමට අධික වේලාවක් ගතවීම (Too Slow)',
            },
            subtitle: {
              en: 'Visitors leave before the page even opens. Google ranks slow websites at the bottom.',
              si: 'පිටුව open වීමට ප්‍රමාද වන නිසා පාරිභෝගිකයින් හැරී යාම සහ Google Ranking අඩුවීම.',
            },
            iconName: 'Clock',
            tag: { en: 'Performance Bottleneck', si: 'වේගය අඩුයි' },
            costWeight: 1.0,
            timelineDays: 6,
          },
          {
            id: 'p5_pain_design',
            indexNumber: 2,
            title: {
              en: '02. Outdated Design & Unprofessional Look',
              si: '02. පැරණි පෙනුම හා නවීන නොවීම (Outdated Look)',
            },
            subtitle: {
              en: 'The site looks like 2012, hurting client trust and making your company look small.',
              si: 'වෙබ් අඩවියේ පෙනුම නිසා ව්‍යාපාරයේ විශ්වසනීයත්වයට හානි වීම.',
            },
            iconName: 'AlertTriangle',
            tag: { en: 'Brand Damage', si: 'පැරණි පෙනුම' },
            costWeight: 1.1,
            timelineDays: 7,
          },
          {
            id: 'p5_pain_leads',
            indexNumber: 3,
            title: {
              en: '03. Zero Enquiries, WhatsApp Chats or Conversions',
              si: '03. මිනිසුන් ආවත් කිසිවෙකු සම්බන්ධ නොවීම (No Conversions)',
            },
            subtitle: {
              en: 'People visit, but nobody calls or messages. You lack a compelling conversion funnel.',
              si: 'Visitorsලා පැමිණියත් කිසිම Call එකක් හෝ WhatsApp message එකක් නොලැබීම.',
            },
            iconName: 'UserMinus',
            tag: { en: 'Broken Funnel', si: 'විමසීම් නෑ' },
            costWeight: 1.15,
            timelineDays: 7,
          },
          {
            id: 'p5_pain_mobile',
            indexNumber: 4,
            title: {
              en: '04. Broken or Frustrating Mobile Experience',
              si: '04. Smart Phone වල නිසි පරිදි නොපෙනීම (Mobile Broken)',
            },
            subtitle: {
              en: 'Elements overflow, text is microscopic, and buttons are impossible to tap on phones.',
              si: 'Smart phone එකෙන් බලද්දී අකුරු කැඩී යාම සහ භාවිතයට අපහසු වීම.',
            },
            iconName: 'Smartphone',
            tag: { en: 'Mobile Pain', si: 'Phone වල අවුල්' },
            costWeight: 1.05,
            timelineDays: 5,
          },
          {
            id: 'p5_pain_maintenance',
            indexNumber: 5,
            title: {
              en: '05. High Maintenance Costs & Difficult to Update',
              si: '05. වෙනස්කම් කරගැනීමට අධික වියදමක් යාම (Hard to Update)',
            },
            subtitle: {
              en: 'Every small edit requires paying someone or breaks the layout completely.',
              si: 'සුළු වෙනසක් කරගැනීමටත් අනවශ්‍ය ලෙස කාලය හා මුදල් වැයවීම.',
            },
            iconName: 'RefreshCw',
            tag: { en: 'High Cost', si: 'නඩත්තු කරදර' },
            costWeight: 1.0,
            timelineDays: 5,
          },
        ],
      },
      {
        stepIndex: 2,
        stepTitle: {
          en: 'Improvement Focus',
          si: 'ප්‍රධාන විසඳුම',
        },
        stepQuestion: {
          en: 'What is your primary goal for this rebuild?',
          si: 'වෙබ් අඩවියට ලැබිය යුතු ප්‍රධානම සහ වැදගත්ම විසඳුම කුමක්ද?',
        },
        stepSubBrief: {
          en: 'Prioritizes Google PageSpeed 95+ scores, luxury aesthetics, or conversions.',
          si: 'ක්ෂණික වේගය, සුඛෝපභෝගී පෙනුම හෝ විකුණුම් වැඩි කරවීම ප්‍රමුඛ කිරීමට.',
        },
        avatarSpeech: {
          en: 'Choose the primary engineering focus for this website rebuild.',
          si: 'ප්‍රධානම විසඳුම තෝරන්න.',
        },
        options: [
          {
            id: 'p5_fix_pagespeed',
            indexNumber: 1,
            title: {
              en: '01. 95+ PageSpeed Rebuild on Modern React',
              si: '01. තත්පර 1න් load වන අති නවීන React කේතකරණය (PageSpeed 95+)',
            },
            subtitle: {
              en: 'Full clean-code rewrite that earns green scores on Google PageSpeed Insights.',
              si: 'අනවශ්‍ය plugins සියල්ල ඉවත් කර පිරිසිදු කේතකරණයෙන් උපරිම වේගය ලබාදීම.',
            },
            iconName: 'Zap',
            tag: { en: 'Sub-Second Speed', si: 'ක්ෂණික වේගය' },
            costWeight: 1.15,
            timelineDays: 2,
          },
          {
            id: 'p5_fix_redesign',
            indexNumber: 2,
            title: {
              en: '02. Modern Luxury Rebranding & UI/UX Redesign',
              si: '02. ජාත්‍යන්තර මට්ටමේ සුඛෝපභෝගී නවීන පෙනුමක් (Luxury Redesign)',
            },
            subtitle: {
              en: 'Sleek dark/light luxury styling, bespoke typography, and high-trust aesthetics.',
              si: 'පාරිභෝගිකයා වශී කරවන සුඛෝපභෝගී නිර්මාණ ශිල්පය හා වර්ණ රටා.',
            },
            iconName: 'Sparkles',
            tag: { en: 'Luxury Rebrand', si: 'සුඛෝපභෝගී Redesign' },
            costWeight: 1.25,
            timelineDays: 3,
          },
          {
            id: 'p5_fix_funnel',
            indexNumber: 3,
            title: {
              en: '03. High-Converting Sales Funnel & WhatsApp Integration',
              si: '03. පාරිභෝගිකයින් ආකර්ෂණය කරවන විකුණුම් සැලැස්මක් (Conversion Funnel)',
            },
            subtitle: {
              en: 'Strategically placed CTAs, WhatsApp triggers, and conversion copy that drives sales.',
              si: 'පැමිණෙන පුද්ගලයින් සැබෑ පාරිභෝගිකයින් බවට පත්කරන Funnel එකක්.',
            },
            iconName: 'Target',
            tag: { en: 'Sales Booster', si: 'විකුණුම් වැඩි කිරීම' },
            costWeight: 1.1,
            timelineDays: 2,
          },
          {
            id: 'p5_fix_mobileux',
            indexNumber: 4,
            title: {
              en: '04. Mobile-First Ergonomic UX Optimization',
              si: '04. Smart Phone භාවිත කරන්නන්ට උපරිම පහසුව (Mobile-First UX)',
            },
            subtitle: {
              en: 'Designed from the phone up with comfortable thumb zones and zero clutter.',
              si: 'Phone එකෙන් පහසුවෙන් ක්‍රියාත්මක කළ හැකි Ergonomic Mobile නිර්මාණයක්.',
            },
            iconName: 'Smartphone',
            tag: { en: 'Mobile Ergonomics', si: 'Mobile ප්‍රශස්තකරණය' },
            costWeight: 1.05,
            timelineDays: 1,
          },
          {
            id: 'p5_fix_fullelevation',
            indexNumber: 5,
            title: {
              en: '05. Full Modernization & Google SEO Elevation',
              si: '05. සම්පූර්ණ ප්‍රතිසංස්කරණය සහ Google මුල් පිටුවට පැමිණීම (Full Upgrade)',
            },
            subtitle: {
              en: 'Speed, new luxury design, Schema.org SEO, and conversion architecture all in one.',
              si: 'වේගය, නව පෙනුම, SEO සහ විකුණුම් සැලැස්ම යන සියල්ල එකට ලැබෙන සම්පූර්ණ විසඳුම.',
            },
            iconName: 'Award',
            tag: { en: 'Full Overhaul', si: 'සම්පූර්ණ විසඳුම' },
            costWeight: 1.35,
            timelineDays: 5,
          },
        ],
      },
      {
        stepIndex: 3,
        stepTitle: {
          en: 'Current Setup',
          si: 'දැනට පවතින තත්ත්වය',
        },
        stepQuestion: {
          en: 'What is the current technical state of your site?',
          si: 'ඔබේ දැනට පවතින තාක්ෂණික තත්ත්වය කුමක්ද?',
        },
        stepSubBrief: {
          en: 'Determines domain migration, content transfer, and server transition.',
          si: 'Domain මාරු කිරීම, අන්තර්ගතය ගෙනයාම සහ Cloud server සැකැස්ම සඳහා.',
        },
        avatarSpeech: {
          en: 'Select your current domain, hosting, and content assets situation.',
          si: 'ඔබේ දැනට පවතින Domain සහ Hosting තත්ත්වය තෝරන්න.',
        },
        options: [
          {
            id: 'p5_sit_domainready',
            indexNumber: 1,
            title: {
              en: '01. I have domain and hosting access ready',
              si: '01. Domain නාමය සහ Hosting විස්තර මා සතුව ඇත',
            },
            subtitle: {
              en: 'Seamless redeployment to your existing domain with zero downtime.',
              si: 'ඔබේ දැනට පවතින Domain එකටම පැරණි site එක බිඳ නොවැටී නව පද්ධතිය සම්බන්ධ කිරීම.',
            },
            iconName: 'CheckCheck',
            tag: { en: 'Domain Ready', si: 'Domain සූදානම්' },
            costWeight: 1.0,
            timelineDays: 0,
          },
          {
            id: 'p5_sit_migrate',
            indexNumber: 2,
            title: {
              en: '02. Built on WordPress/Shopify/Wix and want to migrate',
              si: '02. WordPress/Shopify/Wix වලින් නව පද්ධතියකට මාරු වීමට (Replatforming)',
            },
            subtitle: {
              en: 'Move content away from slow heavy CMS platforms to ultra-fast modern code.',
              si: 'පැරණි බර CMS වෙනුවට තත්පර 1න් load වන නවීන තාක්ෂණයට දත්ත මාරු කිරීම.',
            },
            iconName: 'RefreshCw',
            tag: { en: 'Zero-Lag Migration', si: 'දත්ත මාරු කිරීම' },
            costWeight: 1.15,
            timelineDays: 2,
          },
          {
            id: 'p5_sit_unreachable',
            indexNumber: 3,
            title: {
              en: '03. Previous developer is unreachable, need reliable takeover',
              si: '03. පැරණි developer සොයාගත නොහැකි බැවින් නව භාරගැනීමක්',
            },
            subtitle: {
              en: 'Ravana Tech assists with asset recovery and seamless migration.',
              si: 'වෙබ් අඩවියේ අයිතිය නිරවුල් කරගෙන වගකීමෙන් යුතුව ඉදිරියට ගෙන යාම.',
            },
            iconName: 'ShieldCheck',
            tag: { en: 'Safe Takeover', si: 'නිරවුල් භාරගැනීම' },
            costWeight: 1.1,
            timelineDays: 1,
          },
          {
            id: 'p5_sit_contentready',
            indexNumber: 4,
            title: {
              en: '04. I have content/images ready, need fresh clean build',
              si: '04. සියලු විස්තර සූදානම්, නව කේතකරණයක් අවශ්‍යයි',
            },
            subtitle: {
              en: 'Fresh start on high-performance architecture using your approved branding assets.',
              si: 'දැනට තිබෙන හොඳ පින්තූර සහ විස්තර යොදාගෙන සම්පූර්ණයෙන්ම අලුතින් හැදීම.',
            },
            iconName: 'FileText',
            tag: { en: 'Fresh Assets', si: 'අලුතින් කේතකරණය' },
            costWeight: 1.05,
            timelineDays: 1,
          },
          {
            id: 'p5_sit_audit',
            indexNumber: 5,
            title: {
              en: '05. I want Ravana Tech to audit and recommend the full roadmap',
              si: '05. Ravana Tech මගින් සම්පූර්ණ Audit එකක් කර මඟ පෙන්වීමක්',
            },
            subtitle: {
              en: 'Comprehensive PageSpeed, SEO, and UX audit report delivered to you.',
              si: 'දැනට ඇති site එකේ අඩුපාඩු පෙන්වන නොමිලේ Audit වාර්තාවක් ලබාගැනීම.',
            },
            iconName: 'Lightbulb',
            tag: { en: 'Free Tech Audit', si: 'නොමිලේ Audit එකක්' },
            costWeight: 1.0,
            timelineDays: 0,
          },
        ],
      },
    ],
  },

  // ----------------------------------------------------
  // PATHWAY 06: UNIVERSAL "I'M NOT SURE — HELP ME CHOOSE"
  // (Zero Technical Jargon - 2 Questions to Instant Recommendation)
  // ----------------------------------------------------
  {
    id: 'not_sure',
    number: 6,
    title: {
      en: "06. I'm Not Sure — Help Me Choose",
      si: '06. මට හරියටම තේරෙන්නේ නැහැ — මඟ පෙන්වන්න',
    },
    subtitle: {
      en: 'Zero technical jargon. Answer 2 simple questions and get an instant tailored recommendation.',
      si: 'තාක්ෂණික දැනුම අවශ්‍ය නැත. සරල ප්‍රශ්න 2කින් ඔබට ගැළපෙනම විසඳුම ලබාගන්න.',
    },
    shortDescription: {
      en: 'Human-friendly guidance. We analyze your situation and recommend the optimal solution.',
      si: 'තාක්ෂණික වචන කිසිවක් නැතිව, ඔබේ ව්‍යාපාරයට වඩාත්ම ගැළපෙන ක්‍රමය තෝරාදීම.',
    },
    icon: 'HelpCircle',
    badge: {
      en: 'Instant Recommendation',
      si: 'ස්වයංක්‍රීය මඟපෙන්වීම',
    },
    steps: [
      {
        stepIndex: 1,
        stepTitle: {
          en: 'Current Situation',
          si: 'දැනට මුහුණ දෙන අභියෝගය',
        },
        stepQuestion: {
          en: 'What is happening right now in your business?',
          si: 'දැනට ඔබේ ව්‍යාපාරයේ මුහුණ දෙන ප්‍රධානම අභියෝගය කුමක්ද?',
        },
        stepSubBrief: {
          en: 'Identifies your real-world bottleneck without any technical jargon.',
          si: 'තාක්ෂණික වචන නැතිව, ඔබේ ව්‍යාපාරයේ සැබෑ අභියෝගය හඳුනාගැනීමට.',
        },
        avatarSpeech: {
          en: 'Tell me in simple words what is happening right now in your business.',
          si: 'සරලවම කියන්න දැනට ඔබේ ව්‍යාපාරයේ සිදුවන්නේ කුමක්ද කියලා.',
        },
        options: [
          {
            id: 'p6_now_nocontact',
            indexNumber: 1,
            title: {
              en: '01. "People don\'t contact me or buy"',
              si: '01. "මිනිසුන් මගේ ව්‍යාපාරය සොයාගන්නේ හෝ සම්බන්ධ වන්නේ නෑ"',
            },
            subtitle: {
              en: 'Potential customers cannot find you online, or they do not reach out when they do.',
              si: 'අන්තර්ජාලයෙන් ඔබව සොයාගැනීමට අපහසුයි, හෝ පැමිණෙන අය ඔබව සම්බන්ධ කරගන්නේ නෑ.',
            },
            iconName: 'UserMinus',
            tag: { en: 'Needs Visibility & Calls', si: 'පාරිභෝගිකයින් අවශ්‍යයි' },
            costWeight: 1.0,
            timelineDays: 7,
          },
          {
            id: 'p6_now_manual',
            indexNumber: 2,
            title: {
              en: '02. "I am doing too much manual work answering repetitive messages"',
              si: '02. "හැමෝටම එකම දේ manually type කර කර මහන්සි වෙනවා"',
            },
            subtitle: {
              en: 'Dozens of customers ask the same questions daily, wasting hours of your personal time.',
              si: 'මිල, වේලාවන් සහ විස්තර අහන හැමෝටම දවස පුරා එකම දේ type කරන්න සිදුවීම.',
            },
            iconName: 'Clock',
            tag: { en: 'Needs Automation', si: 'ස්වයංක්‍රීයකරණය අවශ්‍යයි' },
            costWeight: 1.1,
            timelineDays: 8,
          },
          {
            id: 'p6_now_orders',
            indexNumber: 3,
            title: {
              en: '03. "I have products to sell, but orders are messy and unorganized"',
              si: '03. "විකුණන්න බඩු තියෙනවා, ඒත් Orders කළමනාකරණය අපහසුයි"',
            },
            subtitle: {
              en: 'Orders arrive across Facebook, WhatsApp, and calls, making slips and deliveries a headache.',
              si: 'WhatsApp, Facebook ඔස්සේ එන ඇණවුම් ලිපිගොනු පාලනය කරගැනීමට නොහැකි වීම.',
            },
            iconName: 'ShoppingBag',
            tag: { en: 'Needs Clean Store', si: 'Online Store එකක් අවශ්‍යයි' },
            costWeight: 1.15,
            timelineDays: 9,
          },
          {
            id: 'p6_now_amateur',
            indexNumber: 4,
            title: {
              en: '04. "My current website looks amateur and drives clients away"',
              si: '04. "දැනට තියෙන website එක දැක්කම clientsලා විශ්වාස කරන්නේ නෑ"',
            },
            subtitle: {
              en: 'Your digital image does not match the actual quality and premium value of your real business.',
              si: 'ඔබේ සේවාවේ සැබෑ වටිනාකම අන්තර්ජාලය තුළින් නොපෙනී යාම.',
            },
            iconName: 'AlertTriangle',
            tag: { en: 'Needs Luxury Polish', si: 'නවීන පෙනුම අවශ්‍යයි' },
            costWeight: 1.12,
            timelineDays: 7,
          },
          {
            id: 'p6_now_idea',
            indexNumber: 5,
            title: {
              en: '05. "I have a unique business idea and need a tailored system"',
              si: '05. "මට සුවිශේෂී අදහසක් තියෙනවා, ඒකට ගැලපෙන system එකක් ඕන"',
            },
            subtitle: {
              en: 'You want a custom platform with specific workflows that off-the-shelf templates cannot do.',
              si: 'සාමාන්‍ය වෙබ් අඩවියකට වඩා වැඩි විශේෂ කාර්යයක් කළ හැකි පද්ධතියක්.',
            },
            iconName: 'Lightbulb',
            tag: { en: 'Needs Custom Platform', si: 'විශේෂිත පද්ධතියක්' },
            costWeight: 1.3,
            timelineDays: 12,
          },
        ],
      },
      {
        stepIndex: 2,
        stepTitle: {
          en: 'Valuable Outcome',
          si: 'වටිනාම ප්‍රතිඵලය',
        },
        stepQuestion: {
          en: 'What is the single most valuable outcome you want?',
          si: 'ඔබට ලැබිය යුතු වටිනාම සහ වැදගත්ම ප්‍රතිඵලය කුමක්ද?',
        },
        stepSubBrief: {
          en: 'Matches you with the exact technical solution to achieve your business goal.',
          si: 'ඔබගේ ඉලක්කය සපුරාගැනීමට වඩාත්ම ගැළපෙන තාක්ෂණික විසඳුම ලබාදීමට.',
        },
        avatarSpeech: {
          en: 'What single outcome would make the biggest difference to your business?',
          si: 'ඔබට ලැබිය යුතු වටිනාම සහ වැදගත්ම ප්‍රතිඵලය තෝරන්න.',
        },
        options: [
          {
            id: 'p6_out_customers',
            indexNumber: 1,
            title: {
              en: '01. "More genuine customers and high-value orders every single week"',
              si: '01. "සෑම සතියකම සැබෑ පාරිභෝගිකයින් සහ ලාභදායී ගනුදෙනු ලබාගැනීම"',
            },
            subtitle: {
              en: 'Direct conversion engine turning visitors into paying clients via calls and WhatsApp.',
              si: 'වෙබ් අඩවියට එන අය සැබෑ ගනුදෙනුකරුවන් බවට පත්කරන සෘජු විකුණුම් සැලැස්මක්.',
            },
            iconName: 'TrendingUp',
            tag: { en: 'Revenue Growth', si: 'ආදායම් වර්ධනය' },
            costWeight: 1.0,
            timelineDays: 0,
          },
          {
            id: 'p6_out_autopilot',
            indexNumber: 2,
            title: {
              en: '02. "Save 3+ hours daily by putting customer inquiries on autopilot"',
              si: '02. "දිනපතා පැය ගණන් ඉතුරු කර දෙන ස්වයංක්‍රීය පද්ධතියක්"',
            },
            subtitle: {
              en: 'Smart appointment bookings and catalog FAQs that handle inquiries while you sleep.',
              si: 'ඔබ නිදාසිටින වෙලාවටත් පාරිභෝගිකයින්ට තොරතුරු දෙන හා වේලාවන් වෙන්කරන ක්‍රමයක්.',
            },
            iconName: 'Zap',
            tag: { en: 'Save Daily Hours', si: 'කාලය ඉතිරි කිරීම' },
            costWeight: 1.1,
            timelineDays: 1,
          },
          {
            id: 'p6_out_prestige',
            indexNumber: 3,
            title: {
              en: '03. "A prestigious, world-class brand image that commands top prices"',
              si: '03. "ඉහළ මිලකට සේවාවන් විකිණිය හැකි ජාත්‍යන්තර මට්ටමේ පිළිගැනීමක්"',
            },
            subtitle: {
              en: 'Top 1% luxury presentation that immediately instills trust and crushes lowball competitors.',
              si: 'වෙළඳපොලේ තරඟකරුවන් අභිබවා ඉහළම ගෞරවයක් හා පිළිගැනීමක් ගොඩනැගීම.',
            },
            iconName: 'Crown',
            tag: { en: 'Premium Authority', si: 'උසස් පිළිගැනීම' },
            costWeight: 1.15,
            timelineDays: 2,
          },
          {
            id: 'p6_out_mobile',
            indexNumber: 4,
            title: {
              en: '04. "Flawless mobile ordering where customers checkout in 30 seconds"',
              si: '04. "තත්පර 30න් පාරිභෝගිකයාට Phone එකෙන් Order කළ හැකි පහසුව"',
            },
            subtitle: {
              en: 'Ultra-convenient one-click buying experience built specifically for mobile screens.',
              si: 'කිසිදු ගැටලුවකින් තොරව Phone එකෙන්ම පහසුවෙන් මුදල් ගෙවා ඇණවුම් කිරීමේ හැකියාව.',
            },
            iconName: 'Smartphone',
            tag: { en: 'Frictionless Mobile', si: 'Mobile පහසුව' },
            costWeight: 1.05,
            timelineDays: 1,
          },
          {
            id: 'p6_out_peace',
            indexNumber: 5,
            title: {
              en: '05. "Complete peace of mind with 100% technical management by Ravana Tech"',
              si: '05. "තාක්ෂණික කරදර කිසිවක් නැතිව 100% Ravana Tech රැකවරණය"',
            },
            subtitle: {
              en: 'Hosting, security, domain, and updates all managed expertly by Shanthapriya.',
              si: 'Hosting, ආරක්ෂාව සහ තාක්ෂණික සියලු කටයුතු අප විසින් සම්පූර්ණයෙන්ම බලාකියාගැනීම.',
            },
            iconName: 'ShieldCheck',
            tag: { en: '100% Peace of Mind', si: 'සම්පූර්ණ රැකවරණය' },
            costWeight: 1.08,
            timelineDays: 1,
          },
        ],
      },
    ],
  },
];
