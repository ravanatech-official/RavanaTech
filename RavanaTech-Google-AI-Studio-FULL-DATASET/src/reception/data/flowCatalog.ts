import type { FlowNode, IntentId } from '../types';

const t = (en: string, si: string) => ({ en, si });
const option = (id: string, en: string, si: string, descEn: string, descSi: string, nextNodeId: string) => ({
  id, title:t(en,si), description:t(descEn,descSi), nextNodeId,
});

export const INTENTS: Array<{ id: IntentId; title: ReturnType<typeof t>; description: ReturnType<typeof t> }> = [
  { id:'new', title:t('I need something new','මට අලුත් දෙයක් අවශ්‍යයි'), description:t('Website, store, booking system, web app or landing page.','Website, online store, booking system හෝ web app එකක්.') },
  { id:'improve', title:t('I already have a website','මට දැනටමත් website එකක් තියෙනවා'), description:t('Improve design, speed, mobile experience or conversions.','Design, speed, mobile experience හෝ enquiries වැඩි කරමු.') },
  { id:'showcase', title:t('Show me what you can build','ඔබට හදන්න පුළුවන් දේ පෙන්වන්න'), description:t('See only the examples relevant to you.','ඔබට අදාළ examples විතරක් බලමු.') },
  { id:'unsure', title:t("I'm not sure what I need",'මට මොනවා අවශ්‍යද කියලා තවම හරියටම දන්නේ නැහැ'), description:t('No technical knowledge required. I will guide you.','Technical knowledge ඕන නැහැ. මම සරලව guide කරන්නම්.') },
  { id:'project', title:t('I want to discuss a project / quotation','Project එකක් / quotation එකක් ගැන කතා කරන්න ඕන'), description:t('We will prepare the useful information before you contact us.','Contact වෙන්න කලින් අවශ්‍ය information ටික අපි සකස් කරමු.') },
];

export const FLOW_NODES: Record<string, FlowNode> = {};

function add(node: FlowNode) { FLOW_NODES[node.id] = node; }
function node(id:string,intentId:IntentId,title:string,titleSi:string,question:string,questionSi:string,speech:string,speechSi:string,options:FlowNode['options']):FlowNode {
  return {id,intentId,title:t(title,titleSi),question:t(question,questionSi),founderSpeech:t(speech,speechSi),options};
}

// PATH 1 — NEW
add(node('new_1','new','What are you trying to create?','ඔබට හදන්න ඕන මොකක්ද?','Choose the closest one.','ඔබට වඩාත්ම ගැළපෙන එක තෝරන්න.','Good. I understand the direction. Let’s make the next choice simple.','හොඳයි. මට direction එක තේරුණා. දැන් ඊළඟ පියවරත් සරලව ගමු.',[
 option('business','Business website','ව්‍යාපාරික website එකක්','Present the business and turn visitors into enquiries.','ව්‍යාපාරය පැහැදිලිව පෙන්වා enquiries ගන්න.','new_2'),
 option('store','Online store','Online store එකක්','Products, orders and customer actions in one clear journey.','Products සහ orders සඳහා සරල online journey එකක්.','new_2'),
 option('booking','Booking / appointments','Booking / appointments system එකක්','Let customers request or book the right time.','Customersට වෙලාවක් තෝරගන්න පහසු කරන්න.','new_2'),
 option('app','Web application / custom system','Web application / custom system එකක්','A system built around your actual workflow.','ඔබේ වැඩ කරන ක්‍රමයට ගැළපෙන system එකක්.','new_2'),
 option('landing','Landing / campaign page','Landing / campaign page එකක්','A focused page for one offer or campaign.','එක offer එකකට focused page එකක්.','new_2'),
]));
add(node('new_2','new','Where are you now?','ඔබ දැන් ඉන්නේ කොතැනද?','Choose the situation that feels closest.','ඔබට ගැළපෙන තත්ත්වය තෝරන්න.','No matter where you start, you do not need to know the technical answer.','ඔබ කොතැනින් පටන් ගත්තත් technical answer දැනගෙන ඉන්න ඕන නැහැ.',[
 option('idea','Just an idea','අදහසක් පමණයි','We can shape it with you.','අදහස පැහැදිලි කරලා අපි ඉදිරියට යමු.','new_3'),
 option('assets','I have content / logo ready','Content / logo සූදානම්','You bring what you have; we structure the experience.','ඔබ ළඟ තියෙන දේ අපි හොඳ experience එකකට ගොඩනගමු.','new_3'),
 option('offline','I already run a business','දැනටමත් business එකක් තියෙනවා','We focus on the business result you want.','ඔබට අවශ්‍ය business result එකෙන් පටන් ගමු.','new_3'),
 option('launch','I am launching something new','අලුත් දෙයක් launch කරනවා','We can plan the first useful version.','පළමු useful version එක plan කරමු.','new_3'),
 option('unsure','I am not sure','මට තවම sure නැහැ','That is completely fine. I will guide you.','ඒක ප්‍රශ්නයක් නෙමෙයි. මම guide කරන්නම්.','new_3'),
]));
add(node('new_3','new','What should it help you achieve?','මේකෙන් ඔබට ලැබෙන්න ඕන ප්‍රධාන ප්‍රතිඵලය මොකක්ද?','Pick the result that matters most.','ඔබට වඩාත්ම වැදගත් result එක තෝරන්න.','Excellent. Now we connect the technology to your real goal.','හොඳයි. දැන් technology එක ඔබේ ඇත්තම goal එකට සම්බන්ධ කරමු.',[
 option('leads','More enquiries','වැඩි enquiries','Make it easier for the right people to contact you.','හරිම customerට ඔබව contact කරන්න පහසු කරමු.','new_4'),
 option('orders','More WhatsApp orders','වැඩි WhatsApp orders','Reduce typing and unnecessary steps.','Typing සහ අමතර steps අඩු කරමු.','new_4'),
 option('bookings','More bookings','වැඩි bookings','Make choosing and requesting a time simple.','Booking process එක සරල කරමු.','new_4'),
 option('sales','Sell online','Online විකුණන්න','Build a clear buying journey.','Buying journey එක පැහැදිලි කරමු.','new_4'),
 option('trust','Build trust / authority','විශ්වාසය / authority වැඩි කරන්න','Show the right proof at the right moment.','හරි proof එක හරි වෙලාවේ පෙන්වමු.','new_4'),
]));
add(node('new_4','new','What matters most to you?','ඔබට වඩාත්ම වැදගත් දේ මොකක්ද?','There is no wrong answer.','වැරදි answer එකක් නැහැ.','I have enough direction now to make this much more specific.','දැන් මේක ඔබට ගැළපෙන විදිහට specific කරන්න මට හොඳ direction එකක් තියෙනවා.',[
 option('simple','Keep it simple and practical','සරල හා practical','No unnecessary complexity.','අවශ්‍ය නැති complexity නැහැ.','new_5'),
 option('premium','Premium presentation','Premium look එකක්','A strong visual first impression.','පළමු බැලීමෙන්ම strong impression එකක්.','new_5'),
 option('speed','Launch quickly','ඉක්මනින් launch කරන්න','Prioritize the useful first version.','මුලින් useful version එකට priority.','new_5'),
 option('automation','Automation / AI','Automation / AI','Reduce repetitive work with smart systems.','නැවත නැවත කරන වැඩ අඩු කරමු.','new_5'),
 option('recommend','Recommend the right balance','හොඳම balance එක ඔබ recommend කරන්න','You do not need to decide alone.','ඔබ තනියම decide කරන්න ඕන නැහැ.','new_5'),
]));
add(node('new_5','new','What would be most useful now?','දැන් ඔබට වඩාත්ම useful දේ මොකක්ද?','Choose one. I will take care of the next step.','එකක් තෝරන්න. ඊළඟ පියවර මම සරල කරලා දෙන්නම්.','Perfect. You have already done most of the thinking. I can take it from here.','හොඳයි. ඔබට කරන්න තිබුණු වැදගත් thinking එක ගොඩක් දුරට ඉවරයි. මෙතනින් මම guide කරන්නම්.',[
 option('direction','Show my recommended direction','මට ගැළපෙන direction එක පෙන්වන්න','A short plan in plain language.','සරල භාෂාවෙන් කෙටි plan එකක්.','OUTCOME'),
 option('demo','Show a similar concept','සමාන concept එකක් පෙන්වන්න','See the idea before deciding.','තීරණය කරන්න කලින් example එකක් බලමු.','OUTCOME'),
 option('brief','Prepare my project brief','Project brief එක සකස් කරන්න','We use what you already told us.','ඔබ දැනටමත් දුන් information එකම භාවිතා කරනවා.','OUTCOME'),
 option('whatsapp','Talk on WhatsApp','WhatsApp එකෙන් කතා කරමු','No need to type everything again.','හැමදේම ආයෙ type කරන්න ඕන නැහැ.','OUTCOME'),
 option('agent','Ask Ravana Agent first','මුලින් Ravana Agentගෙන් අහන්න','Ask in simple Sinhala or English.','සරල සිංහලෙන් හෝ English වලින් අහන්න.','OUTCOME'),
]));

const PATHS: Record<Exclude<IntentId,'new'>, Array<{titles:[string,string][], questions:[string,string][], speeches:[string,string], options:string[][][]}>> = {
 improve: [{titles:[['What needs attention first?','මුලින් බලන්න ඕන දේ මොකක්ද?'],['What should improve?','වැඩිදියුණු කරන්න ඕන මොකක්ද?'],['What do you have available?','ඔබ ළඟ දැනට මොනවා තියෙනවාද?'],['What should success look like?','සාර්ථක වුණා කියන්නේ කොහොමද?'],['What would be useful now?','දැන් වඩාත් useful දේ මොකක්ද?']],questions:[['What feels wrong today?','දැනට website එකේ අමාරුම දේ මොකක්ද?'],['What would you like to improve?','ඔබට වැඩිදියුණු කරන්න ඕන මොනවාද?'],['What can you share with us?','අපට share කරන්න පුළුවන් මොනවාද?'],['What matters after the rebuild?','අලුත් කළාට පස්සේ වැදගත් result එක මොකක්ද?'],['How would you like to continue?','ඉදිරියට යන්න කැමති කොහොමද?']],speeches:['Understood. We will focus on the result, not make you diagnose the website yourself.','හරි. Website එකේ problem එක ඔබට technical විදිහට diagnose කරන්න ඕන නැහැ. Result එකෙන් පටන් ගමු.'],options:[
 [['Looks old','පරණ වගේ පේනවා','Improve the first impression.','පළමු impression එක හොඳ කරමු.'],['Too slow','හරිම slow','Focus on performance.','Speed එකට priority දෙමු.'],['Low enquiries','Enquiries අඩුයි','Focus on conversion.','Enquiries වැඩි කරමු.'],['Bad on mobile','Mobile එකේ අමාරුයි','Fix the mobile journey.','Mobile experience එක හදමු.'],['Not sure','මට sure නැහැ','We can guide you.','අපි guide කරන්නම්.']],
 [['Design','Design එක'],['Speed','Speed එක'],['Enquiries','Enquiries'],['Booking/order','Booking / order'],['Everything','හැමදේම']],
 [['Live link','Live link එක තියෙනවා'],['Files','Files තියෙනවා'],['Both','දෙකම තියෙනවා'],['Nothing handy','දැනට ළඟ නැහැ'],['Audit first','මුලින් audit කරන්න']],
 [['More enquiries','වැඩි enquiries'],['More sales','වැඩි sales'],['Easier journey','පහසු customer journey'],['More trust','වැඩි trust'],['All of these','මේ හැමදේම']],
 [['Start rebuild','Rebuild එක පටන් ගමු'],['Show examples','Examples බලමු'],['Simple audit','Simple audit එකක්'],['WhatsApp','WhatsApp'],['Ravana Agent','Ravana Agent']]
 ]}],
 showcase: [{titles:[['Which example is closest?','ඔබට ළඟම example එක මොකක්ද?'],['What do you want to see?','ඔබට බලන්න ඕන මොනවාද?'],['How much detail?','කොච්චර detail ඕනද?'],['What matters to you?','ඔබට වැදගත් මොනවාද?'],['What next?','ඊළඟට මොකක්ද?']],questions:[['Which business example feels closest?','ඔබේ business එකට සමාන example එක මොකක්ද?'],['What part do you want to see?','ඔබට විශේෂයෙන් බලන්න ඕන කොටස මොකක්ද?'],['How much detail would help?','ඔබට useful වෙන්නේ කොච්චර detail එකක්ද?'],['What are you evaluating?','ඔබ evaluate කරන්නේ මොනවාද?'],['What would be useful now?','දැන් useful දේ මොකක්ද?']],speeches:['Great. I will show only what is relevant instead of making you browse everything.','හොඳයි. හැම demo එකක්ම බලන්න දාලා ඔබේ කාලය ගන්නේ නැහැ. ඔබට අදාළ දේ පෙන්වමු.'],options:[
 [['Bakery','Bakery'],['Cafe','Cafe'],['Salon','Salon / Beauty'],['Real estate','Real estate'],['Fitness','Fitness / Personal Brand']],
 [['Visual design','Visual design'],['Customer journey','Customer journey'],['Ordering / booking','Ordering / booking'],['Lead generation','Lead generation'],['Everything','හැමදේම']],
 [['30-second look','තත්පර 30ක් වගේ'],['Quick tour','Quick tour'],['Full demo','Full demo'],['Compare two','දෙකක් compare කරන්න'],['Let Agent choose','Agent තෝරලා දෙන්න']],
 [['Design','Design'],['Simplicity','සරලකම'],['Business function','Business function'],['Automation','Automation'],['Something different','වෙනස් දෙයක්']],
 [['Another concept','වෙනත් concept එකක්'],['Map to my business','මගේ business එකට ගළපන්න'],['Project direction','Project direction'],['WhatsApp','WhatsApp'],['Ravana Agent','Ravana Agent']]
 ]}],
 unsure: [{titles:[['What are you trying to make easier?','ඔබට පහසු කරගන්න ඕන මොකක්ද?'],['What is happening now?','දැනට මොකද වෙන්නේ?'],['What would make you happiest?','ඔබට වඩාත් සතුටු කරන result එක මොකක්ද?'],['How involved do you want to be?','ඔබ කොච්චර involved වෙන්නද කැමති?'],['What next?','ඊළඟට මොකක්ද?']],questions:[['What are you trying to make easier?','ඔබට පහසු කරගන්න ඕන මොකක්ද?'],['What is happening today?','දැනට වෙන්නේ මොකක්ද?'],['What would make you happiest?','ඔබට සතුටුම result එක මොකක්ද?'],['How involved do you want to be?','ඔබ කොච්චර involved වෙන්නද කැමති?'],['What would help now?','දැන් help වෙන්නේ මොකක්ද?']],speeches:['You do not need technical knowledge. I will translate your situation into a practical direction.','Technical knowledge ඕන නැහැ. ඔබේ situation එක practical direction එකකට මම translate කරලා දෙන්නම්.'],options:[
 [['More customers','වැඩි customers'],['Orders','Orders'],['Bookings','Bookings'],['Show my work','මගේ වැඩ පෙන්වන්න'],['I don’t know yet','මට තවම දන්නේ නැහැ']],
 [['Repeated questions','එකම questions නැවත නැවත එනවා'],['Too much manual work','Manual වැඩ වැඩියි'],['Messages don’t convert','Messages එනවා, action වෙන්නේ නැහැ'],['People don’t understand me','මගේ business එක තේරෙන්නේ නැහැ'],['Everything feels messy','හැමදේම messy']],
 [['More enquiries','වැඩි enquiries'],['More orders/bookings','වැඩි orders / bookings'],['Less repetitive work','නැවත නැවත වැඩ අඩු කරන්න'],['Professional image','Professional image එකක්'],['Simple system','සරල system එකක්']],
 [['Handle it for me','ඔබලාම handle කරන්න'],['I approve key decisions','වැදගත් decisions මම approve කරන්නම්'],['I know what I want','මට අවශ්‍ය දේ දන්නවා'],['Show examples first','මුලින් examples බලමු'],['Let Agent help','Agentගෙන් help ගමු']],
 [['Recommended direction','Recommended direction'],['Relevant concept','Relevant concept'],['Project brief','Project brief'],['Talk to Shanthapriya','Shanthapriya එක්ක කතා කරන්න'],['Ravana Agent','Ravana Agent']]
 ]}],
 project: [{titles:[['What are you contacting us about?','ඔබ contact වෙන්නේ මොන project එකකටද?'],['Where are you based?','ඔබ සිටින්නේ කොහේද?'],['When do you want to move?','ඔබට පටන් ගන්න ඕන කවදාද?'],['What do you want first?','මුලින් ඔබට ඕන මොකක්ද?'],['How should we continue?','ඉදිරියට යන්නේ කොහොමද?']],questions:[['What is the project about?','Project එක මොකක් ගැනද?'],['Where are you based?','ඔබ සිටින්නේ කොහේද?'],['What timing feels right?','ඔබට ගැළපෙන timing එක මොකක්ද?'],['What would you like first?','මුලින් ඔබට අවශ්‍ය මොකක්ද?'],['What is the easiest way to continue?','පහසුම විදිහ මොකක්ද?']],speeches:['Good. I will use what you have already told us so you do not have to repeat yourself.','හොඳයි. ඔබ දැනටමත් කියපු දේම භාවිතා කරන නිසා ආයෙත් repeat කරන්න ඕන නැහැ.'],options:[
 [['New website','New website'],['Website rebuild','Website rebuild'],['Web application','Web application'],['AI / automation','AI / automation'],['Not sure','මට sure නැහැ']],
 [['Sri Lanka','ශ්‍රී ලංකාව'],['Asia / Middle East','Asia / Middle East'],['Europe','Europe'],['North America','North America'],['Elsewhere','වෙනත් රටක්']],
 [['As soon as practical','හැකි ඉක්මනින්'],['1–2 weeks','සති 1–2ක්'],['Within 1 month','මාසයක් ඇතුළත'],['Flexible','Flexible'],['Help me decide','මට decide කරන්න help කරන්න']],
 [['Simple recommendation','Simple recommendation'],['Rough scope','Rough scope'],['Quote discussion','Quote discussion'],['WhatsApp','WhatsApp'],['Call','Call']],
 [['WhatsApp','WhatsApp'],['Phone call','Phone call'],['Email','Email'],['Project brief','Project brief'],['Ravana Agent','Ravana Agent']]
 ]}],
};

for (const [intent, cfg] of Object.entries(PATHS) as Array<[Exclude<IntentId,'new'>, typeof PATHS[Exclude<IntentId,'new'>]]>) {
  const spec = cfg[0];
  for (let i=0;i<5;i++) {
    const next = i < 4 ? `${intent}_${i+2}` : 'OUTCOME';
    const opts = spec.options[i].map((o,j) => option(`${intent}_${i+1}_o${j+1}`, o[0], o[1], o[2] || 'We will use this to guide the next step.', o[3] || 'ඊළඟ පියවර guide කරන්න මේ information එක භාවිතා කරනවා.', next));
    add(node(`${intent}_${i+1}`, intent, spec.titles[i][0], spec.titles[i][1], spec.questions[i][0], spec.questions[i][1], spec.speeches[0], spec.speeches[1], opts));
  }
}

export const OUTCOME_NODE = 'OUTCOME';
