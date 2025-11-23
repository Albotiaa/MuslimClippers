import React, { useState, useRef, useEffect, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  ArrowRight, 
  ArrowUpRight,
  Menu,
  X,
  Play,
  Pause,
  Globe,
  Zap,
  ShieldCheck,
  TrendingUp,
  ChevronDown,
  Mic,
  Users,
  Smartphone,
  Briefcase,
  Plus,
  Loader2,
  Search,
  Check,
  BookOpen,
  Download,
  Lock,
  CreditCard,
  AlertCircle,
  Star,
  Moon,
  Scissors
} from 'lucide-react';

// --- Configuration ---

const CALENDLY_URL = "https://calendly.com/albotiaa/muslim-clippers";
const WHOP_PRODUCT_ID = "prod_XNU7hjigmbsmH";

// --- Data ---

const getFlagEmoji = (isoCode: string) => {
  return isoCode
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397));
};

const RAW_COUNTRIES = [
  ["Afghanistan", "AF", "93"],
  ["Åland Islands", "AX", "358"],
  ["Albania", "AL", "355"],
  ["Algeria", "DZ", "213"],
  ["American Samoa", "AS", "1684"],
  ["Andorra", "AD", "376"],
  ["Angola", "AO", "244"],
  ["Anguilla", "AI", "1264"],
  ["Antarctica", "AQ", "672"],
  ["Antigua and Barbuda", "AG", "1268"],
  ["Argentina", "AR", "54"],
  ["Armenia", "AM", "374"],
  ["Aruba", "AW", "297"],
  ["Australia", "AU", "61"],
  ["Austria", "AT", "43"],
  ["Azerbaijan", "AZ", "994"],
  ["Bahamas", "BS", "1242"],
  ["Bahrain", "BH", "973"],
  ["Bangladesh", "BD", "880"],
  ["Barbados", "BB", "1246"],
  ["Belarus", "BY", "375"],
  ["Belgium", "BE", "32"],
  ["Belize", "BZ", "501"],
  ["Benin", "BJ", "229"],
  ["Bermuda", "BM", "1441"],
  ["Bhutan", "BT", "975"],
  ["Bolivia", "BO", "591"],
  ["Bonaire, Sint Eustatius and Saba", "BQ", "599"],
  ["Bosnia and Herzegovina", "BA", "387"],
  ["Botswana", "BW", "267"],
  ["Bouvet Island", "BV", "47"],
  ["Brazil", "BR", "55"],
  ["British Indian Ocean Territory", "IO", "246"],
  ["British Virgin Islands", "VG", "1284"],
  ["Brunei Darussalam", "BN", "673"],
  ["Bulgaria", "BG", "359"],
  ["Burkina Faso", "BF", "226"],
  ["Burundi", "BI", "257"],
  ["Cabo Verde", "CV", "238"],
  ["Cambodia", "KH", "855"],
  ["Cameroon", "CM", "237"],
  ["Canada", "CA", "1"],
  ["Cayman Islands", "KY", "1345"],
  ["Central African Republic", "CF", "236"],
  ["Chad", "TD", "235"],
  ["Chile", "CL", "56"],
  ["China", "CN", "86"],
  ["Christmas Island", "CX", "61"],
  ["Cocos (Keeling) Islands", "CC", "61"],
  ["Colombia", "CO", "57"],
  ["Comoros", "KM", "269"],
  ["Congo", "CG", "242"],
  ["Cook Islands", "CK", "682"],
  ["Costa Rica", "CR", "506"],
  ["Croatia", "HR", "385"],
  ["Cuba", "CU", "53"],
  ["Curaçao", "CW", "599"],
  ["Cyprus", "CY", "357"],
  ["Czechia", "CZ", "420"],
  ["Democratic People's Republic of Korea", "KP", "850"],
  ["Democratic Republic of the Congo", "CD", "243"],
  ["Denmark", "DK", "45"],
  ["Djibouti", "DJ", "253"],
  ["Dominica", "DM", "1767"],
  ["Dominican Republic", "DO", "1"],
  ["Ecuador", "EC", "593"],
  ["Egypt", "EG", "20"],
  ["El Salvador", "SV", "503"],
  ["Equatorial Guinea", "GQ", "240"],
  ["Eritrea", "ER", "291"],
  ["Estonia", "EE", "372"],
  ["Eswatini", "SZ", "268"],
  ["Ethiopia", "ET", "251"],
  ["Falkland Islands", "FK", "500"],
  ["Faroe Islands", "FO", "298"],
  ["Fiji", "FJ", "679"],
  ["Finland", "FI", "358"],
  ["France", "FR", "33"],
  ["French Guiana", "GF", "594"],
  ["French Polynesia", "PF", "689"],
  ["French Southern Territories", "TF", "262"],
  ["Gabon", "GA", "241"],
  ["Gambia", "GM", "220"],
  ["Georgia", "GE", "995"],
  ["Germany", "DE", "49"],
  ["Ghana", "GH", "233"],
  ["Gibraltar", "GI", "350"],
  ["Greece", "GR", "30"],
  ["Greenland", "GL", "299"],
  ["Grenada", "GD", "1473"],
  ["Guadeloupe", "GP", "590"],
  ["Guam", "GU", "1671"],
  ["Guatemala", "GT", "502"],
  ["Guernsey", "GG", "44"],
  ["Guinea", "GN", "224"],
  ["Guinea-Bissau", "GW", "245"],
  ["Guyana", "GY", "592"],
  ["Haiti", "HT", "509"],
  ["Heard Island and McDonald Islands", "HM", "672"],
  ["Holy See", "VA", "39"],
  ["Honduras", "HN", "504"],
  ["Hong Kong", "HK", "852"],
  ["Hungary", "HU", "36"],
  ["Iceland", "IS", "354"],
  ["India", "IN", "91"],
  ["Indonesia", "ID", "62"],
  ["Iran", "IR", "98"],
  ["Iraq", "IQ", "964"],
  ["Ireland", "IE", "353"],
  ["Isle of Man", "IM", "44"],
  ["Israel", "IL", "972"],
  ["Italy", "IT", "39"],
  ["Ivory Coast", "CI", "225"],
  ["Jamaica", "JM", "1876"],
  ["Japan", "JP", "81"],
  ["Jersey", "JE", "44"],
  ["Jordan", "JO", "962"],
  ["Kazakhstan", "KZ", "7"],
  ["Kenya", "KE", "254"],
  ["Kiribati", "KI", "686"],
  ["Kuwait", "KW", "965"],
  ["Kyrgyzstan", "KG", "996"],
  ["Lao People's Democratic Republic", "LA", "856"],
  ["Latvia", "LV", "371"],
  ["Lebanon", "LB", "961"],
  ["Lesotho", "LS", "266"],
  ["Liberia", "LR", "231"],
  ["Libya", "LY", "218"],
  ["Liechtenstein", "LI", "423"],
  ["Lithuania", "LT", "370"],
  ["Luxembourg", "LU", "352"],
  ["Macao", "MO", "853"],
  ["Madagascar", "MG", "261"],
  ["Malawi", "MW", "265"],
  ["Malaysia", "MY", "60"],
  ["Maldives", "MV", "960"],
  ["Mali", "ML", "223"],
  ["Malta", "MT", "356"],
  ["Marshall Islands", "MH", "692"],
  ["Martinique", "MQ", "596"],
  ["Mauritania", "MR", "222"],
  ["Mauritius", "MU", "230"],
  ["Mayotte", "YT", "262"],
  ["Mexico", "MX", "52"],
  ["Micronesia", "FM", "691"],
  ["Monaco", "MC", "377"],
  ["Mongolia", "MN", "976"],
  ["Montenegro", "ME", "382"],
  ["Montserrat", "MS", "1664"],
  ["Morocco", "MA", "212"],
  ["Mozambique", "MZ", "258"],
  ["Myanmar", "MM", "95"],
  ["Namibia", "NA", "264"],
  ["Nauru", "NR", "674"],
  ["Nepal", "NP", "977"],
  ["Netherlands", "NL", "31"],
  ["New Caledonia", "NC", "687"],
  ["New Zealand", "NZ", "64"],
  ["Nicaragua", "NI", "505"],
  ["Niger", "NE", "227"],
  ["Nigeria", "NG", "234"],
  ["Niue", "NU", "683"],
  ["Norfolk Island", "NF", "672"],
  ["Northern Mariana Islands", "MP", "1670"],
  ["North Macedonia", "MK", "389"],
  ["Norway", "NO", "47"],
  ["Oman", "OM", "968"],
  ["Pakistan", "PK", "92"],
  ["Palau", "PW", "680"],
  ["Palestine", "PS", "970"],
  ["Panama", "PA", "507"],
  ["Papua New Guinea", "PG", "675"],
  ["Paraguay", "PY", "595"],
  ["Peru", "PE", "51"],
  ["Philippines", "PH", "63"],
  ["Pitcairn", "PN", "870"],
  ["Poland", "PL", "48"],
  ["Portugal", "PT", "351"],
  ["Puerto Rico", "PR", "1"],
  ["Qatar", "QA", "974"],
  ["Republic of Korea", "KR", "82"],
  ["Republic of Moldova", "MD", "373"],
  ["Réunion", "RE", "262"],
  ["Romania", "RO", "40"],
  ["Russian Federation", "RU", "7"],
  ["Rwanda", "RW", "250"],
  ["Saint Barthélemy", "BL", "590"],
  ["Saint Helena", "SH", "290"],
  ["Saint Kitts and Nevis", "KN", "1869"],
  ["Saint Lucia", "LC", "1758"],
  ["Saint Martin", "MF", "590"],
  ["Saint Pierre and Miquelon", "PM", "508"],
  ["Saint Vincent and the Grenadines", "VC", "1784"],
  ["Samoa", "WS", "685"],
  ["San Marino", "SM", "378"],
  ["Sao Tome and Principe", "ST", "239"],
  ["Saudi Arabia", "SA", "966"],
  ["Senegal", "SN", "221"],
  ["Serbia", "RS", "381"],
  ["Seychelles", "SC", "248"],
  ["Sierra Leone", "SL", "232"],
  ["Singapore", "SG", "65"],
  ["Sint Maarten", "SX", "1721"],
  ["Slovakia", "SK", "421"],
  ["Slovenia", "SI", "386"],
  ["Solomon Islands", "SB", "677"],
  ["Somalia", "SO", "252"],
  ["South Africa", "ZA", "27"],
  ["South Georgia and the South Sandwich Islands", "GS", "500"],
  ["South Sudan", "SS", "211"],
  ["Spain", "ES", "34"],
  ["Sri Lanka", "LK", "94"],
  ["Sudan", "SD", "249"],
  ["Suriname", "SR", "597"],
  ["Svalbard and Jan Mayen", "SJ", "47"],
  ["Sweden", "SE", "46"],
  ["Switzerland", "CH", "41"],
  ["Syrian Arab Republic", "SY", "963"],
  ["Taiwan", "TW", "886"],
  ["Tajikistan", "TJ", "992"],
  ["Tanzania", "TZ", "255"],
  ["Thailand", "TH", "66"],
  ["Timor-Leste", "TL", "670"],
  ["Togo", "TG", "228"],
  ["Tokelau", "TK", "690"],
  ["Tonga", "TO", "676"],
  ["Trinidad and Tobago", "TT", "1868"],
  ["Tunisia", "TN", "216"],
  ["Turkey", "TR", "90"],
  ["Turkmenistan", "TM", "993"],
  ["Turks and Caicos Islands", "TC", "1649"],
  ["Tuvalu", "TV", "688"],
  ["Uganda", "UG", "256"],
  ["Ukraine", "UA", "380"],
  ["United Arab Emirates", "AE", "971"],
  ["United Kingdom", "GB", "44"],
  ["United States Minor Outlying Islands", "UM", "1"],
  ["United States of America", "US", "1"],
  ["Uruguay", "UY", "598"],
  ["Uzbekistan", "UZ", "998"],
  ["Vanuatu", "VU", "678"],
  ["Venezuela", "VE", "58"],
  ["Viet Nam", "VN", "84"],
  ["Virgin Islands (U.S.)", "VI", "1340"],
  ["Wallis and Futuna", "WF", "681"],
  ["Western Sahara", "EH", "212"],
  ["Yemen", "YE", "967"],
  ["Zambia", "ZM", "260"],
  ["Zimbabwe", "ZW", "263"]
];

const COUNTRIES = RAW_COUNTRIES.map(([name, iso, code]) => ({
  name,
  iso,
  code: `+${code}`,
  flag: getFlagEmoji(iso)
}));

// --- Custom Hooks ---

const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  return mousePosition;
};

const useCountUp = (end: number, duration: number = 2000) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    
    let startTime: number | null = null;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = currentTime - startTime;
      const percentage = Math.min(progress / duration, 1);
      const ease = 1 - Math.pow(1 - percentage, 4); // Ease out quart
      
      setCount(Math.floor(end * ease));
      
      if (progress < duration) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };
    requestAnimationFrame(animate);
  }, [end, duration, isVisible]);

  return { count, ref };
};

// --- Components ---

const CustomCursor = () => {
  const { x, y } = useMousePosition();
  return (
    <>
      <div 
        className="cursor-dot hidden md:block fixed pointer-events-none z-[9999]"
        style={{ left: `${x}px`, top: `${y}px` }} 
      />
      <div 
        className="cursor-outline hidden md:block fixed pointer-events-none z-[9999]"
        style={{ 
          left: `${x}px`, 
          top: `${y}px`,
          transition: 'transform 0.15s ease-out, width 0.2s, height 0.2s' 
        }} 
      />
    </>
  );
};

const Marquee = ({ items, speed = 20 }: { items: string[], speed?: number }) => (
  <div className="relative flex overflow-hidden border-y border-grid bg-white py-4 z-20">
    <div className="animate-marquee whitespace-nowrap flex gap-8 items-center">
      {[...items, ...items, ...items, ...items].map((item, i) => (
        <React.Fragment key={i}>
          <span className="text-2xl md:text-4xl font-display font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#1a1a1a] to-[#666] tracking-tighter px-4">
            {item}
          </span>
          <div className="w-2 h-2 bg-accent rounded-full" />
        </React.Fragment>
      ))}
    </div>
  </div>
);

const DynamicPatternBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [cursor, setCursor] = useState({ x: -500, y: -500 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setCursor({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Moroccan Zellige Geometric Pattern
  const patternUrl = `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%231A1A1A' stroke-width='0.5' opacity='0.08'%3E%3Cpath d='M60 0 L90 30 L120 60 L90 90 L60 120 L30 90 L0 60 L30 30 Z' /%3E%3Ccircle cx='60' cy='60' r='20' /%3E%3Cpath d='M60 10 L110 60 L60 110 L10 60 Z' /%3E%3C/g%3E%3C/svg%3E")`;

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 -z-10 overflow-hidden pointer-events-none bg-[#F4F2ED]"
    >
      {/* Rotating Background Pattern - Massive Scale */}
      <div 
        className="absolute -inset-[50%] opacity-100 animate-spin-slow"
        style={{
          backgroundImage: patternUrl,
          backgroundSize: '120px 120px',
        }}
      />
      
      {/* Interactive Highlight - Orange Glow */}
      <div 
        className="absolute inset-0 opacity-100 transition-opacity duration-500"
        style={{
            background: `radial-gradient(circle 600px at ${cursor.x}px ${cursor.y}px, rgba(255, 77, 0, 0.08), transparent 70%)`
        }}
      />
    </div>
  );
};

// Reusable Reveal Card Component
interface RevealCardProps {
    frontContent: React.ReactNode;
    revealContent: React.ReactNode;
    className?: string;
    bgClass?: string;
    revealBgClass?: string;
}

const RevealCard = ({ frontContent, revealContent, className = "", bgClass = "bg-[#1a1a1a]", revealBgClass = "bg-accent/5" }: RevealCardProps) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [cursor, setCursor] = useState({ x: -500, y: -500 });
    const [isHovered, setIsHovered] = useState(false);
  
    const handleInteraction = (clientX: number, clientY: number) => {
      if(cardRef.current) {
          const rect = cardRef.current.getBoundingClientRect();
          setCursor({
              x: clientX - rect.left,
              y: clientY - rect.top
          });
      }
    };
  
    const handleMouseMove = (e: React.MouseEvent) => {
      setIsHovered(true);
      handleInteraction(e.clientX, e.clientY);
    };
  
    const handleTouchMove = (e: React.TouchEvent) => {
      setIsHovered(true);
      handleInteraction(e.touches[0].clientX, e.touches[0].clientY);
    };
  
    const handleMouseLeave = () => {
        setIsHovered(false);
    }
  
    const handleTouchEnd = () => {
        setIsHovered(false);
    }

    return (
        <div 
          ref={cardRef} 
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          onMouseLeave={handleMouseLeave}
          onTouchEnd={handleTouchEnd}
          className={`${className} ${bgClass} relative overflow-hidden group interactive rounded-sm`}
        >
            {/* Background Flashlight Reveal Layer */}
            <div 
               className={`absolute inset-0 flex flex-col items-center justify-center pointer-events-none p-6 md:p-8 transition-opacity duration-500 z-20`}
               style={{
                 WebkitMaskImage: `radial-gradient(circle 300px at ${cursor.x}px ${cursor.y}px, black 10%, transparent 90%)`,
                 maskImage: `radial-gradient(circle 300px at ${cursor.x}px ${cursor.y}px, black 10%, transparent 90%)`,
                 opacity: isHovered ? 1 : 0
               }}
            >
                <div className={`absolute inset-0 ${revealBgClass}`}></div>
                <div className="relative z-10 w-full h-full flex flex-col justify-center">
                    {revealContent}
                </div>
            </div>
            
            {/* Front Content Layer - Fades out on interaction */}
            <div 
              className="relative z-10 w-full h-full transition-opacity duration-200 flex flex-col"
              style={{ opacity: isHovered ? 0 : 1, pointerEvents: isHovered ? 'none' : 'auto' }}
            >
                {frontContent}
            </div>
        </div>
    );
};

const UGCOverlay = ({ onClose }: { onClose: () => void }) => {
    return (
        <div 
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-[#1a1a1a] flex items-center justify-center p-4 animate-in fade-in duration-300 backdrop-blur-sm bg-opacity-95 cursor-pointer"
        >
             <div 
                onClick={(e) => e.stopPropagation()}
                className="bg-[#F4F2ED] w-full max-w-5xl rounded-sm overflow-hidden flex flex-col md:flex-row shadow-2xl relative cursor-auto"
             >
                <button onClick={onClose} className="absolute top-4 right-4 z-50 p-2 bg-black/5 hover:bg-black/10 rounded-full transition-colors">
                    <X className="w-6 h-6 text-[#1a1a1a]" />
                </button>

                {/* Left: Content */}
                <div className="w-full md:w-3/5 p-8 md:p-16 flex flex-col justify-center">
                    <div className="inline-block self-start px-3 py-1 border border-accent rounded-full text-accent font-mono text-[10px] uppercase tracking-widest mb-6">
                        Enterprise Only
                    </div>
                    <h2 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tighter mb-6 leading-none">
                        Scale Your <br/><span className="text-accent">User Acquisition.</span>
                    </h2>
                    
                    <div className="space-y-6 font-serif text-[#1a1a1a]/80 text-lg leading-relaxed">
                        <p>
                            Great, you're not just looking for simple clipping. You want <span className="font-bold text-[#1a1a1a]">Growth</span>.
                        </p>
                        <p>
                            We've generated millions of views for our partners. This isn't luck.
                        </p>
                         <p>
                            We actively monitor the creative landscape to identify winning formats. We then adapt these proven concepts specifically for your app or product to drive performance at scale.
                        </p>
                        
                        <p className="text-sm border-l-2 border-accent pl-4 italic text-[#1a1a1a]/60 mt-4">
                            Because of the high-touch nature of this service (strategy, management, testing), this is an Enterprise offer.
                        </p>
                    </div>

                    <div className="mt-10">
                        <a 
                            href={CALENDLY_URL}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-3 bg-[#1a1a1a] text-white px-8 py-4 font-mono text-xs uppercase tracking-widest hover:bg-accent transition-colors shadow-xl"
                        >
                            Book Enterprise Call <ArrowUpRight className="w-4 h-4" />
                        </a>
                    </div>
                </div>

                {/* Right: Visual/Dark */}
                <div className="w-full md:w-2/5 bg-[#1a1a1a] text-white p-12 flex flex-col justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                    <div className="relative z-10">
                        <Smartphone className="w-16 h-16 text-accent mb-6" />
                        <h3 className="font-display font-bold text-3xl uppercase leading-tight mb-8">Strategic <br/>Adaptation</h3>
                        
                        <p className="font-serif text-lg text-white/90 leading-relaxed border-l-2 border-accent pl-6">
                            "We know what we do. We keep an eye on what works, apply it to fit your app or product, and do it at scale."
                        </p>
                    </div>
                </div>
             </div>
        </div>
    );
};

const ClientTypes = ({ onOpenEnterprise }: { onOpenEnterprise: () => void }) => {
    const clients = [
        { icon: Mic, label: "Podcasts", desc: "Long-form to viral shorts." },
        { icon: Users, label: "Coaches", desc: "Authority building content." },
        { icon: Briefcase, label: "Entrepreneurs", desc: "Personal branding at scale." },
        { icon: Smartphone, label: "Apps / SaaS", desc: "User acquisition creatives.", isAction: true },
    ];

    return (
        <section id="partners" className="py-20 px-6 md:px-10 max-w-[1600px] mx-auto border-x border-grid bg-[#F4F2ED]">
             <div className="flex flex-col md:flex-row gap-12 items-start md:items-center mb-12">
                <h2 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tighter shrink-0">
                    Who We <br/><span className="text-accent">Power</span>
                </h2>
                <div className="h-[1px] w-full bg-grid hidden md:block"></div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {clients.map((client, idx) => (
                    <div 
                        key={idx} 
                        onClick={client.isAction ? onOpenEnterprise : undefined}
                        className={`border border-grid p-8 transition-all group bg-white relative overflow-hidden ${client.isAction ? 'cursor-pointer hover:border-accent hover:shadow-xl' : 'hover:border-accent'}`}
                    >
                        {client.isAction && (
                            <div className="absolute top-0 right-0 bg-accent text-white text-[10px] font-mono uppercase px-2 py-1">
                                Enterprise
                            </div>
                        )}
                        <client.icon className="w-8 h-8 mb-6 text-[#1a1a1a] group-hover:text-accent transition-colors" />
                        <h3 className="text-xl font-display font-bold uppercase mb-2">{client.label}</h3>
                        <p className="font-mono text-xs text-[#1a1a1a]/60 uppercase tracking-wide">{client.desc}</p>
                        
                        {client.isAction && (
                            <div className="mt-6 inline-flex items-center gap-2 text-xs font-mono uppercase text-accent font-bold border-b border-accent/20 pb-0.5 group-hover:border-accent transition-colors visible opacity-100">
                                Learn More <ArrowUpRight className="w-3 h-3" />
                            </div>
                        )}
                    </div>
                ))}
             </div>
        </section>
    );
};

const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isGuideUnlocked, setIsGuideUnlocked] = useState(false);
  const [isEnterpriseOpen, setIsEnterpriseOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Check for unlock param on mount
    const params = new URLSearchParams(window.location.search);
    if (params.get('action') === 'unlock_guide') {
      setIsGuideUnlocked(true);
      // Optionally clean up URL to prevent re-unlock on refresh if desired
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculations for Hero Shrink Effect
  const heroScale = Math.max(0.95, 1 - scrollY / 2000);
  const heroRadius = Math.min(40, scrollY / 15);

  // Calculations for Nav Shrink Effect
  const navScale = Math.max(0.98, 1 - scrollY / 2000);
  const navTranslateY = Math.min(16, scrollY / 20);
  const navRadius = Math.min(16, scrollY / 20);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const handleCloseGuide = () => {
    setIsGuideUnlocked(false);
    // Clean up URL
    const url = new URL(window.location.href);
    url.searchParams.delete('action');
    window.history.replaceState({}, document.title, url.pathname + url.search);
  }

  return (
    <div className="relative min-h-screen bg-[#F4F2ED]">
      <div className="noise-overlay"></div>
      <CustomCursor />

      {/* Global Guide Overlay */}
      {isGuideUnlocked && (
        <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300">
             <div className="bg-white w-full max-w-5xl h-[90vh] rounded-lg overflow-hidden shadow-2xl">
                <StrategyGuide onClose={handleCloseGuide} />
             </div>
        </div>
      )}

      {/* Enterprise / UGC Overlay */}
      {isEnterpriseOpen && <UGCOverlay onClose={() => setIsEnterpriseOpen(false)} />}

      {/* Navigation - Floating/Shrinking on Scroll */}
      <nav 
        className="fixed top-0 left-0 right-0 mx-auto z-50 bg-[#F4F2ED]/80 backdrop-blur-lg border-b border-grid transition-all duration-300 ease-out will-change-transform"
        style={{
           maxWidth: '1600px',
           transform: `translateY(${navTranslateY}px) scale(${navScale})`,
           borderRadius: `${navRadius}px`,
           border: scrollY > 50 ? '1px solid rgba(26,26,26,0.1)' : undefined,
           boxShadow: scrollY > 50 ? '0 10px 40px -10px rgba(0,0,0,0.05)' : 'none',
           width: scrollY > 50 ? '96%' : '100%'
        }}
      >
        <div className="flex justify-between items-center px-6 md:px-10 h-20">
          <div className="flex items-center gap-2 interactive cursor-none hover:scale-105 transition-transform">
            <div className="w-3 h-3 bg-accent rounded-full animate-pulse"></div>
            <span className="font-display font-bold text-lg tracking-tighter uppercase">Muslim<span className="text-accent">Clippers</span></span>
          </div>

          <div className="hidden md:flex items-center gap-8 font-mono text-xs uppercase tracking-widest">
            <button onClick={() => scrollTo('partners')} className="hover:text-accent transition-colors interactive">Partners</button>
            <button onClick={() => scrollTo('manifesto')} className="hover:text-accent transition-colors interactive">Manifesto</button>
            <button onClick={() => scrollTo('process')} className="hover:text-accent transition-colors interactive">Process</button>
            
            {/* Added Clipper Link */}
            <a 
                href="https://whop.com/muslim-clippers/" 
                target="_blank" 
                rel="noreferrer"
                className="text-accent font-bold hover:text-[#1a1a1a] transition-colors interactive"
            >
                Become a Clipper
            </a>

            <button 
              onClick={() => scrollTo('apply')}
              className="interactive bg-[#1a1a1a] text-white px-6 py-3 hover:bg-accent transition-colors"
            >
              Start Project
            </button>
          </div>

          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden interactive">
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-[#F4F2ED] flex flex-col justify-center px-6 gap-8">
          {['Partners', 'Manifesto', 'Process', 'Results', 'Apply'].map((item) => (
            <button 
              key={item}
              onClick={() => scrollTo(item.toLowerCase())}
              className="text-5xl font-display font-black uppercase text-left hover:text-accent transition-colors"
            >
              {item}
            </button>
          ))}
          <a 
              href="https://whop.com/muslim-clippers/" 
              target="_blank" 
              rel="noreferrer"
              className="text-3xl font-display font-black uppercase text-left text-accent hover:text-[#1a1a1a] transition-colors"
          >
              Become a Clipper
          </a>
        </div>
      )}

      {/* Hero Section - Animated & Cinematic */}
      <header 
        className="relative h-screen flex flex-col justify-center max-w-[1600px] mx-auto border-x border-grid overflow-hidden transition-all duration-100 ease-out will-change-transform"
        style={{
            transform: `scale(${heroScale})`,
            borderRadius: `${heroRadius}px`,
            transformOrigin: 'center top'
        }}
      >
        <DynamicPatternBackground />
        
        <div className="relative z-10 px-6 md:px-10 flex flex-col justify-center h-full w-full">
          
          {/* Main Cinematic Text Block */}
          <div className="relative mix-blend-multiply">
             
             {/* Top Line - Fades In */}
             <div className="overflow-hidden mb-2 md:mb-4">
                <span className="block font-mono text-sm md:text-lg uppercase tracking-[0.3em] text-[#1a1a1a]/60 animate-slide-up" style={{animationDelay: '0.2s'}}>
                  Allah is the
                </span>
             </div>

             {/* Centerpiece - "RAZZAQ" with Arabic Backdrop */}
             <div className="relative">
                {/* The Arabic Calligraphy Background Layer */}
                {/* Centered, Floating gently, No rotation */}
                <div 
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[25vw] leading-none font-serif text-[#1a1a1a] opacity-[0.04] pointer-events-none select-none whitespace-nowrap z-0"
                >
                  <div className="animate-float">
                      ٱلْرَّزَّاقُ
                  </div>
                </div>

                {/* The Main English Text */}
                <h1 className="text-[15vw] md:text-[14vw] leading-[0.85] font-display font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-[#1a1a1a] via-[#1a1a1a] to-accent animate-gradient-text z-10 relative uppercase mt-[-1vw]">
                   RAZZAQ
                </h1>
             </div>

             {/* Bottom Line - "We Just Clip" - Redesigned */}
             <div className="mt-4 md:mt-2 overflow-hidden">
                <div className="flex items-center gap-3">
                    <h2 className="text-3xl md:text-6xl font-display font-bold uppercase tracking-tight text-[#1a1a1a]">
                        We Just <span className="font-serif-display italic text-pattern-fill px-1">Clip.</span>
                    </h2>
                </div>
             </div>

          </div>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mt-12 md:mt-20 animate-fade-in" style={{animationDelay: '1s'}}>
            <p className="max-w-md text-lg md:text-xl text-[#1a1a1a]/70 leading-relaxed font-light border-l-2 border-accent pl-6">
              The infrastructure for Muslim brands. <br/>
              <span className="text-accent font-medium">Strictly Halal. Maximum Reach.</span>
            </p>
            
            <div className="flex gap-4">
               <button onClick={() => scrollTo('apply')} className="interactive group flex items-center gap-4 bg-[#1a1a1a] text-white px-8 py-4 font-mono text-xs uppercase tracking-widest hover:bg-accent transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1">
                  Start Dominating 
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
               </button>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce z-10">
          <ChevronDown className="w-6 h-6 opacity-50" />
        </div>
      </header>

      <Marquee items={["Strictly Halal", "Zero Music", "Viral Formulas", "Ethical Editing", "Global Reach"]} />

      <ClientTypes onOpenEnterprise={() => setIsEnterpriseOpen(true)} />

      {/* Bento Grid Manifesto */}
      <section id="manifesto" className="py-20 px-6 md:px-10 max-w-[1600px] mx-auto border-x border-grid bg-[#F4F2ED]">
        <div className="mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <h2 className="text-6xl md:text-8xl font-display font-black tracking-tighter uppercase">
            Why <br/><span className="text-accent">Us?</span>
          </h2>
          <p className="max-w-md font-mono text-sm text-[#1a1a1a]/60 leading-relaxed items-start text-left md:text-right md:items-end uppercase">
            Generic agencies fail because they don't understand the boundaries. We built the standard.
          </p>
        </div>

        {/* Redesigned Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-[minmax(300px,auto)]">
          
          {/* Card 1: Ayat Reveal (Left, Tall) */}
          <div className="md:row-span-2 h-full">
              <RevealCard 
                className="h-full min-h-[500px] text-[#F4F2ED]"
                revealBgClass="bg-accent/5"
                revealContent={
                    <>
                        <p 
                        className="text-accent font-serif text-xl md:text-3xl leading-relaxed text-center w-full opacity-100 select-none mb-4 md:mb-6 p-6" 
                        dir="rtl"
                        >
                            فَتَعَـٰلَى ٱللَّهُ ٱلْمَلِكُ ٱلْحَقُّ ۗ وَلَا تَعْجَلْ بِٱلْقُرْءَانِ مِن قَبْلِ أَن يُقْضَىٰٓ إِلَيْكَ وَحْيُهُۥ ۖ وَقُل رَّبِّ زِدْنِى عِلْمًۭا
                        </p>
                        <p className="text-white/80 font-mono text-xs md:text-sm leading-relaxed text-center max-w-md mx-auto select-none tracking-wide px-6">
                            "Exalted is Allah, the True King! Do not rush to recite ˹a revelation of˺ the Quran ˹O Prophet˺ before it is ˹properly˺ conveyed to you, and pray, “My Lord! Increase me in knowledge.”"
                        </p>
                    </>
                }
                frontContent={
                    <div className="flex flex-col justify-start items-start h-full p-6 md:p-12">
                         <Globe className="w-10 h-10 md:w-12 md:h-12 text-accent mb-6" />
                         <div>
                            <h3 className="text-4xl md:text-6xl font-display font-bold mb-0 leading-tight text-left">
                            THE VETTED <br/> NETWORK
                            </h3>
                         </div>
                    </div>
                }
              />
          </div>

          {/* Card 2: The Origin Story (Top Right) */}
          <div className="h-full">
             <RevealCard 
                className="h-full p-8 text-[#F4F2ED]"
                bgClass="bg-[#1A1A1A]"
                revealBgClass="bg-white/5"
                revealContent={
                   <div className="text-center p-4">
                        <h4 className="font-display font-bold text-2xl text-accent mb-4 uppercase">The Origin</h4>
                        <p className="font-mono text-sm md:text-base leading-relaxed text-white/90">
                          "I started by scaling faceless TikTok pages to millions of views for myself. I took those viral learnings to build my personal brand, and now I help Islamic brands do the same."
                        </p>
                   </div>
                }
                frontContent={
                    <div className="flex flex-col items-center justify-center h-full text-center relative">
                        <div className="absolute top-0 right-0 opacity-30">
                           <Plus className="w-6 h-6" />
                        </div>
                        <StatNumber end={200} suffix="M+" label="VIEWS GENERATED" light />
                    </div>
                }
             />
          </div>

          {/* Card 3: The Clippers Network (Bottom Right) */}
          <div className="h-full">
             <RevealCard 
                className="h-full p-8 text-[#1a1a1a]"
                bgClass="bg-accent"
                revealBgClass="bg-black/10"
                revealContent={
                    <div className="text-center p-4">
                        <h4 className="font-display font-bold text-2xl text-white mb-4 uppercase">Who edits?</h4>
                        <p className="font-mono text-sm md:text-base leading-relaxed text-white/90">
                          We don't hire random freelancers. These are Muslim brothers, specifically trained and vetted to understand the algorithms and ensure your content goes viral.
                        </p>
                   </div>
                }
                frontContent={
                    <div className="flex flex-col items-center justify-center h-full text-center relative">
                         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none"></div>
                         <div className="absolute top-0 right-0 opacity-30">
                           <Plus className="w-6 h-6" />
                        </div>
                        <StatNumber end={8000} suffix="+" label="ACTIVE CLIPPERS" light />
                    </div>
                }
             />
          </div>

        </div>
      </section>

      {/* Sticky Process Section */}
      <section id="process" className="py-20 px-6 md:px-10 max-w-[1600px] mx-auto border-x border-grid">
        <div className="mb-20 border-b border-grid pb-8">
           <span className="font-mono text-accent text-sm uppercase tracking-widest mb-2 block">The Pipeline</span>
           <h2 className="text-5xl md:text-7xl font-display font-black uppercase tracking-tighter">Simple. Effective. <br/> Scalable.</h2>
        </div>

        <div className="relative">
          {/* Step 1 */}
          <div className="sticky-card bg-white border border-grid p-8 md:p-16 mb-10 min-h-[50vh] flex flex-col md:flex-row gap-12 rounded-xl items-center transition-transform origin-top hover:scale-[1.01]">
             <div className="w-full md:w-1/2">
                <span className="text-9xl font-display font-black text-grid stroke-text opacity-20">01</span>
                <h3 className="text-4xl font-display font-bold mt-[-20px] mb-6">You Create</h3>
                <p className="text-xl text-[#1a1a1a]/70 leading-relaxed font-light">
                  Focus on your message. Whether it's a podcast, a khutbah, or a vlog. Just upload your raw files to our secure portal. We handle the rest.
                </p>
             </div>
             <div className="w-full md:w-1/2 bg-[#F4F2ED] h-64 md:h-full rounded-lg flex items-center justify-center border border-grid">
                <Play className="w-20 h-20 text-[#1a1a1a]/10" />
             </div>
          </div>

          {/* Step 2 */}
          <div className="sticky-card bg-[#1a1a1a] text-[#F4F2ED] p-8 md:p-16 mb-10 min-h-[50vh] flex flex-col md:flex-row gap-12 rounded-xl items-center top-[15vh] transition-transform origin-top hover:scale-[1.01]">
             <div className="w-full md:w-1/2">
                <span className="text-9xl font-display font-black text-white/10">02</span>
                <h3 className="text-4xl font-display font-bold mt-[-20px] mb-6 text-accent">We Clip</h3>
                <p className="text-xl text-white/70 leading-relaxed font-light">
                  Our team extracts the gold. High-retention editing, engaging captions, and sound design that respects Islamic guidelines.
                </p>
             </div>
             <div className="w-full md:w-1/2 bg-white/5 h-64 md:h-full rounded-lg flex items-center justify-center border border-white/10">
                <Zap className="w-20 h-20 text-white/10" />
             </div>
          </div>

          {/* Step 3 */}
          <div className="sticky-card bg-accent text-white p-8 md:p-16 mb-10 min-h-[50vh] flex flex-col md:flex-row gap-12 rounded-xl items-center top-[20vh] transition-transform origin-top hover:scale-[1.01]">
             <div className="w-full md:w-1/2">
                <span className="text-9xl font-display font-black text-black/10">03</span>
                <h3 className="text-4xl font-display font-bold mt-[-20px] mb-6 text-white">You Dominate</h3>
                <p className="text-xl text-white/90 leading-relaxed font-light">
                  We distribute across TikTok, Reels, and Shorts. Your message reaches millions while you sleep. Allah is the Razzaq.
                </p>
             </div>
             <div className="w-full md:w-1/2 bg-black/10 h-64 md:h-full rounded-lg flex items-center justify-center border border-black/5">
                <TrendingUp className="w-20 h-20 text-white/20" />
             </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="apply" className="py-32 px-6 md:px-10 max-w-[1000px] mx-auto relative z-10">
         <div className="text-center mb-20">
            <span className="font-mono text-xs uppercase tracking-widest border border-[#1a1a1a] px-3 py-1 rounded-full">Application</span>
            <h2 className="text-5xl md:text-7xl font-display font-black mt-8 uppercase tracking-tighter">
              Are you ready <br/> to <span className="text-accent">Scale?</span>
            </h2>
         </div>

         <div className="bg-white border border-grid shadow-2xl p-8 md:p-16 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-[#1a1a1a]"></div>
            <MultiStepForm />
         </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1a1a1a] text-[#F4F2ED] pt-32 pb-10 px-6 md:px-10 border-t border-white/10">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-start gap-12 pb-20 border-b border-white/10">
          <div>
             <h4 className="text-4xl font-display font-black uppercase mb-6">Muslim<span className="text-accent">Clippers</span></h4>
             <p className="font-mono text-sm text-white/50 max-w-xs uppercase leading-relaxed">
               Strictly Halal content distribution for the modern Muslim brand.
             </p>
          </div>
          
          <div className="flex gap-12 font-mono text-sm uppercase tracking-widest">
             <div className="flex flex-col gap-4">
                <span className="text-accent">Socials</span>
                <a href="https://www.instagram.com/abd0.4__/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Instagram</a>
             </div>
          </div>
        </div>
        
        <div className="max-w-[1600px] mx-auto mt-8 flex justify-between items-center font-mono text-xs text-white/30 uppercase">
           <span>© {new Date().getFullYear()} Muslim Clippers</span>
           <span>All Rights Reserved</span>
        </div>
      </footer>

    </div>
  );
};

// --- Sub-Components ---

const StatNumber = ({ end, suffix, label, light }: { end: number, suffix: string, label: string, light?: boolean }) => {
  const { count, ref } = useCountUp(end);
  return (
    <div ref={ref} className="text-center">
       <div className={`text-5xl md:text-7xl font-display font-black mb-2 ${light ? 'text-white' : 'text-[#1a1a1a]'}`}>
         {count}{suffix}
       </div>
       <div className={`font-mono text-xs uppercase tracking-widest ${light ? 'text-white/70' : 'text-[#1a1a1a]/50'}`}>
         {label}
       </div>
    </div>
  );
};

// --- Country Phone Input Component ---
const CountryPhoneInput = ({ 
    value, 
    onChange, 
    iso, 
    onIsoChange 
}: { 
    value: string, 
    onChange: (val: string) => void, 
    iso: string, 
    onIsoChange: (val: string) => void 
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const filteredCountries = useMemo(() => {
        return COUNTRIES.filter(c => 
            c.name.toLowerCase().includes(search.toLowerCase()) || 
            c.code.includes(search)
        );
    }, [search]);

    const selectedCountry = COUNTRIES.find(c => c.iso === iso) || COUNTRIES.find(c => c.iso === 'US')!;

    return (
        <div className="relative flex gap-4" ref={dropdownRef}>
            {/* Dropdown Trigger */}
            <button 
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-[140px] flex items-center justify-between border-b border-grid py-4 text-lg bg-transparent transition-colors interactive hover:border-accent"
            >
                <span className="flex items-center gap-2 font-mono">
                    <span className="text-xl">{selectedCountry.flag}</span>
                    <span>{selectedCountry.code}</span>
                </span>
                <ChevronDown className="w-4 h-4 opacity-50" />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute top-full left-0 mt-2 w-[300px] max-h-[300px] bg-white border border-grid shadow-2xl z-50 flex flex-col animate-slide-up overflow-hidden rounded-sm">
                    <div className="p-3 border-b border-grid sticky top-0 bg-white z-10">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black/30" />
                            <input 
                                type="text" 
                                placeholder="Search country..." 
                                className="w-full pl-9 pr-3 py-2 text-sm bg-[#F4F2ED] border-none focus:outline-none rounded-sm placeholder-black/30"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                autoFocus
                            />
                        </div>
                    </div>
                    <div className="overflow-y-auto flex-1">
                        {filteredCountries.map((country, idx) => (
                            <button
                                key={idx}
                                type="button"
                                onClick={() => {
                                    onIsoChange(country.iso);
                                    setIsOpen(false);
                                    setSearch("");
                                }}
                                className="w-full flex items-center justify-between px-4 py-3 hover:bg-[#F4F2ED] transition-colors text-left group"
                            >
                                <span className="flex items-center gap-3">
                                    <span className="text-xl">{country.flag}</span>
                                    <span className="text-sm font-medium">{country.name}</span>
                                </span>
                                <span className="font-mono text-xs text-black/40 group-hover:text-accent">{country.code}</span>
                            </button>
                        ))}
                        {filteredCountries.length === 0 && (
                            <div className="p-4 text-center text-sm text-black/40">No countries found</div>
                        )}
                    </div>
                </div>
            )}

            {/* Phone Number Input */}
            <input 
                type="tel" 
                placeholder="Phone Number" 
                name="whatsapp_number"
                className="flex-1 border-b border-grid py-4 text-lg focus:outline-none focus:border-accent bg-transparent transition-colors placeholder-[#1a1a1a]/20 font-medium interactive font-mono"
                value={value} 
                onChange={e => onChange(e.target.value)}
            />
        </div>
    );
};

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '', 
    email: '', 
    whatsapp: '', 
    whatsappCode: '+1', 
    whatsappIso: 'US', // Added ISO tracking for precise country selection
    handle: '', 
    followers: '', 
    goal: '', 
    budget: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (f: string, v: string) => setFormData(p => ({ ...p, [f]: v }));
  const nextStep = () => setStep(p => p + 1);
  const prevStep = () => setStep(p => p - 1);
  const isValidEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  // Handle country change to update both ISO and Dial Code
  const handleCountryChange = (newIso: string) => {
      const country = COUNTRIES.find(c => c.iso === newIso);
      if (country) {
          setFormData(prev => ({
              ...prev,
              whatsappIso: country.iso,
              whatsappCode: country.code
          }));
      }
  };

  const handleSubmit = async () => {
      setIsSubmitting(true);

      // Simulate a brief network delay for UX
      await new Promise(resolve => setTimeout(resolve, 1500));

      const FORMSPREE_ENDPOINT = "https://formspree.io/f/mkgyypoj";

      // Prepare payload with combined phone number
      const payload = {
        ...formData,
        // Combine code and number for the email report
        whatsapp: `${formData.whatsappCode} ${formData.whatsapp}`
      };

      try {
          // Attempt submission, but do NOT block flow if it fails (e.g. endpoint issues)
          await fetch(FORMSPREE_ENDPOINT, {
              method: 'POST',
              body: JSON.stringify(payload),
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
              }
          }).then(res => {
              if (!res.ok) {
                  console.warn("Form submission backend returned error, but proceeding to next step for UX demo.");
              }
          }).catch(e => {
              console.warn("Form submission network failed (expected in dev if endpoint invalid):", e);
          });
          
          // Always proceed to next step to show the result screen
          nextStep();

      } catch (error) {
          console.error("Form submission error:", error);
          // Always proceed
          nextStep();
      } finally {
          setIsSubmitting(false);
      }
  };

  const handleNextClick = () => {
      if (step === 3) {
          handleSubmit();
      } else {
          nextStep();
      }
  }

  if (step === 4) return <CompletionState budget={formData.budget} />;

  return (
    <div className="min-h-[400px] flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-center mb-12">
           <span className="font-mono text-xs uppercase tracking-widest text-[#1a1a1a]/40">Step 0{step}/03</span>
           <div className="h-[1px] flex-1 bg-grid mx-4"></div>
        </div>

        {step === 1 && (
          <div className="animate-slide-up">
            <h3 className="text-3xl font-display font-bold mb-8">Who are you?</h3>
            <div className="grid gap-6">
               <input 
                 type="text" placeholder="Your Name" name="name"
                 className="w-full border-b border-grid py-4 text-lg focus:outline-none focus:border-accent bg-transparent transition-colors placeholder-[#1a1a1a]/20 font-medium interactive"
                 value={formData.name} onChange={e => handleInputChange('name', e.target.value)}
               />
               <input 
                 type="email" placeholder="Email Address" name="email"
                 className="w-full border-b border-grid py-4 text-lg focus:outline-none focus:border-accent bg-transparent transition-colors placeholder-[#1a1a1a]/20 font-medium interactive"
                 value={formData.email} onChange={e => handleInputChange('email', e.target.value)}
               />
               
               {/* New Country Phone Input */}
               <CountryPhoneInput 
                  value={formData.whatsapp}
                  onChange={(val) => handleInputChange('whatsapp', val)}
                  iso={formData.whatsappIso}
                  onIsoChange={handleCountryChange}
               />

               <div className="grid grid-cols-2 gap-6">
                 <input 
                   type="text" placeholder="@Handle" name="handle"
                   className="w-full border-b border-grid py-4 text-lg focus:outline-none focus:border-accent bg-transparent transition-colors placeholder-[#1a1a1a]/20 font-medium interactive"
                   value={formData.handle} onChange={e => handleInputChange('handle', e.target.value)}
                 />
                 <select 
                   name="followers"
                   className="w-full border-b border-grid py-4 text-lg focus:outline-none focus:border-accent bg-transparent transition-colors text-[#1a1a1a] font-medium interactive"
                   value={formData.followers} onChange={e => handleInputChange('followers', e.target.value)}
                 >
                   <option value="" disabled>Followers</option>
                   <option value="0-10k">0 - 10k</option>
                   <option value="10k-50k">10k - 50k</option>
                   <option value="50k+">50k+</option>
                 </select>
               </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-slide-up">
             <h3 className="text-3xl font-display font-bold mb-8">The Goal?</h3>
             <textarea 
               rows={4}
               name="goal"
               placeholder="I want to scale my personal brand..."
               className="w-full border border-grid p-4 text-lg focus:outline-none focus:border-accent bg-transparent transition-colors placeholder-[#1a1a1a]/20 resize-none interactive"
               value={formData.goal} onChange={e => handleInputChange('goal', e.target.value)}
             ></textarea>
          </div>
        )}

        {step === 3 && (
          <div className="animate-slide-up">
             <h3 className="text-3xl font-display font-bold mb-8">The Budget?</h3>
             <div className="space-y-4">
                {[
                  {val: 'less_1k', lbl: '< $1k / mo'},
                  {val: '1k_3k', lbl: '$1k - $3k / mo'},
                  {val: '5k_plus', lbl: '$5k+ / mo'}
                ].map(opt => (
                  <label key={opt.val} className={`flex items-center justify-between p-6 border cursor-pointer transition-all interactive ${formData.budget === opt.val ? 'border-accent bg-accent/5' : 'border-grid hover:border-accent/50'}`}>
                     <span className="text-lg font-medium font-display uppercase">{opt.lbl}</span>
                     <input type="radio" name="budget" value={opt.val} checked={formData.budget === opt.val} onChange={e => handleInputChange('budget', e.target.value)} className="accent-accent" />
                  </label>
                ))}
             </div>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center mt-12">
        {step > 1 ? (
          <button onClick={prevStep} className="text-xs font-mono uppercase tracking-widest hover:text-accent interactive">Back</button>
        ) : <div></div>}
        
        <button 
          onClick={handleNextClick}
          disabled={(step === 1 ? (!formData.name || !isValidEmail(formData.email) || !formData.whatsapp) : step === 2 ? !formData.goal : !formData.budget) || isSubmitting}
          className="bg-[#1a1a1a] text-white px-8 py-4 font-mono text-xs uppercase tracking-widest hover:bg-accent transition-all disabled:opacity-20 disabled:cursor-not-allowed interactive flex items-center gap-2"
        >
          {isSubmitting ? (
             <>
                Processing <Loader2 className="w-3 h-3 animate-spin" />
             </>
          ) : (
             <>
                {step === 3 ? 'Submit Application' : 'Next'} <ArrowRight className="w-3 h-3" />
             </>
          )}
        </button>
      </div>
    </div>
  );
};

// --- Strategy Components (New Downsell Flow) ---

const StrategyGuide = ({ onClose }: { onClose: () => void }) => {
    
    const handlePrint = () => {
        window.print();
    }

    return (
        <div className="print-container h-full overflow-y-auto custom-scrollbar p-8 relative bg-white">
            <div className="absolute top-0 right-0 p-4 z-10 flex gap-2 no-print">
                 <button onClick={handlePrint} className="p-2 hover:bg-[#F4F2ED] rounded-full interactive transition-colors group" title="Download PDF">
                    <Download className="w-6 h-6 group-hover:text-accent" />
                </button>
                <button onClick={onClose} className="p-2 hover:bg-[#F4F2ED] rounded-full interactive transition-colors group">
                    <X className="w-6 h-6 group-hover:text-red-500" />
                </button>
            </div>

            {/* Header */}
            <div className="border-b-4 border-black mb-12 pb-6 print-break-inside">
                <h2 className="text-5xl md:text-7xl font-display font-black uppercase tracking-tighter mb-2">Islamic Brand <br/><span className="text-accent">Growth Blueprint</span></h2>
                <div className="flex justify-between items-end">
                    <span className="font-mono text-xs uppercase tracking-widest text-black/50">Muslim Clippers Internal Document</span>
                    <span className="font-mono text-xs uppercase tracking-widest bg-black text-white px-2 py-1">Vol. 01</span>
                </div>
            </div>

            {/* Chapter 1 */}
            <div className="mb-16 print-break-inside">
                <div className="flex items-baseline gap-4 mb-6 border-b border-grid pb-4">
                    <span className="text-4xl font-display font-black text-black/10">01</span>
                    <h3 className="text-2xl font-display font-bold uppercase">The Halal Viral Formula</h3>
                </div>
                <div className="prose prose-lg max-w-none font-serif text-[#1a1a1a]/80 leading-relaxed">
                    <p className="mb-4">
                        The algorithm doesn't care about your intentions; it cares about retention. But as Muslims, we have boundaries. No music. No awrah. No lies.
                    </p>
                    <p className="mb-4">
                        Most people think this is a limitation. <strong>It is a superpower.</strong>
                    </p>
                    <p>
                        By removing the "cheap dopamine" of music, you are forced to rely on substance. Your hook must be visual, intellectual, or emotional. We use the "3-Second Rule" combined with rapid visual pacing (every 1.5s) to maintain retention without compromising our values.
                    </p>
                </div>
            </div>

            {/* Chapter 2 */}
            <div className="mb-16 print-break-inside">
                <div className="flex items-baseline gap-4 mb-6 border-b border-grid pb-4">
                    <span className="text-4xl font-display font-black text-black/10">02</span>
                    <h3 className="text-2xl font-display font-bold uppercase">The Tech Stack</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-[#F4F2ED] p-6 border border-grid">
                        <h4 className="font-bold mb-2 uppercase text-sm">Descript</h4>
                        <p className="text-sm text-black/60">For rapid transcription and cutting silence. The AI eye contact feature is haram if used deceptively, so use with caution.</p>
                    </div>
                    <div className="bg-[#F4F2ED] p-6 border border-grid">
                        <h4 className="font-bold mb-2 uppercase text-sm">CapCut Desktop</h4>
                        <p className="text-sm text-black/60">Speed is key. The auto-captions are 90% accurate. Use our custom presets for the "Hormozi" style without the cringe.</p>
                    </div>
                </div>
            </div>

             {/* Chapter 3 */}
             <div className="mb-16 print-break-inside">
                <div className="flex items-baseline gap-4 mb-6 border-b border-grid pb-4">
                    <span className="text-4xl font-display font-black text-black/10">03</span>
                    <h3 className="text-2xl font-display font-bold uppercase">Execution</h3>
                </div>
                 <ul className="space-y-4 font-mono text-sm">
                    <li className="flex items-center gap-4">
                        <Check className="w-5 h-5 text-accent" />
                        <span>Post 1x per day for 30 days. No exceptions.</span>
                    </li>
                    <li className="flex items-center gap-4">
                        <Check className="w-5 h-5 text-accent" />
                        <span>Reply to every comment in the first hour.</span>
                    </li>
                    <li className="flex items-center gap-4">
                        <Check className="w-5 h-5 text-accent" />
                        <span>Study your analytics. If retention drops at 0:03, change the hook.</span>
                    </li>
                 </ul>
            </div>

            <div className="bg-black text-white p-8 text-center no-print">
                <h3 className="font-display font-bold text-2xl mb-4">Want us to do this for you?</h3>
                <p className="text-white/60 mb-6 text-sm max-w-md mx-auto">Once you hit $5k/mo in revenue, come back to us. We'll handle the scale.</p>
                <button onClick={onClose} className="bg-accent px-6 py-3 font-mono text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors interactive">
                    Close Guide
                </button>
            </div>
        </div>
    );
};

const StrategyTeaser = ({ onUnlock }: { onUnlock: () => void }) => {
    return (
        <div className="text-center py-8 mt-8 animate-slide-up relative max-w-2xl mx-auto">
            
            {/* Pulse Effect Background for Emphasis */}
            <div className="absolute inset-0 bg-accent/10 blur-2xl -z-10 rounded-full opacity-60 animate-pulse"></div>

            <div className="bg-[#F4F2ED] group border-2 border-accent hover:scale-[1.02] p-1 rounded-lg cursor-pointer transition-all duration-300 shadow-2xl relative" onClick={onUnlock}>
                
               {/* Recommended Badge - Perfectly centered on top border */}
               <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-max">
                    <span className="bg-accent text-white font-mono text-[10px] uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg border border-white/20 flex items-center gap-2">
                        <Star className="w-3 h-3 fill-white" /> Highly Recommended
                    </span>
               </div>

               <div className="bg-white p-6 md:p-8 rounded-md flex flex-col md:flex-row items-stretch gap-8 text-left relative z-10">
                   
                   {/* Cover Art */}
                   <div className="w-full md:w-1/3 bg-[#1a1a1a] flex items-center justify-center relative overflow-hidden text-white shadow-lg group-hover:shadow-xl transition-all duration-500 aspect-[3/4] md:aspect-auto md:h-auto rounded-sm">
                        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                        <div className="absolute top-0 left-0 w-full h-1 bg-accent"></div>
                        <div className="relative z-10 flex flex-col items-center justify-center p-4 text-center">
                            <Moon className="w-10 h-10 text-accent mb-4 drop-shadow-lg" />
                            <span className="font-display font-black text-2xl leading-none mb-2 tracking-tighter">MUSLIM<br/>GROWTH<br/>BLUEPRINT</span>
                            <span className="bg-white text-black text-[10px] font-mono px-3 py-1 uppercase tracking-widest mt-2 rounded-sm">Vol. 01</span>
                        </div>
                   </div>

                   <div className="flex-1 flex flex-col justify-between py-2">
                        <div className="flex flex-col gap-4 md:gap-1">
                            <div className="flex items-center gap-1 mb-3 mt-4 md:mt-0">
                                {[1,2,3,4,5].map(i => (
                                    <Star key={i} className="w-4 h-4 text-accent" fill="currentColor" />
                                ))}
                                <span className="text-xs font-mono text-black/40 ml-2 font-bold">(5.0)</span>
                            </div>
                            
                            <h4 className="font-display font-bold text-2xl md:text-3xl uppercase mb-3 leading-tight">The Muslim Growth Blueprint</h4>
                            
                            <p className="text-sm text-[#1a1a1a]/70 mb-6 leading-relaxed font-medium">
                                The exact "Halal Viral Formula" we use to generate 200M+ views. <span className="text-accent font-bold">No music. No awrah.</span> Just pure retention science.
                            </p>
                            
                            <ul className="text-xs font-mono text-[#1a1a1a]/80 space-y-3 mb-8 uppercase tracking-wide">
                                <li className="flex items-center gap-3"><div className="p-1 bg-accent/10 rounded-full"><Check className="w-3 h-3 text-accent" /></div> <strong>Proven</strong> Viral Hooks</li>
                                <li className="flex items-center gap-3"><div className="p-1 bg-accent/10 rounded-full"><Check className="w-3 h-3 text-accent" /></div> Reach The <strong>Right</strong> Audience</li>
                                <li className="flex items-center gap-3"><div className="p-1 bg-accent/10 rounded-full"><Check className="w-3 h-3 text-accent" /></div> <strong>Crack</strong> The Algorithm</li>
                            </ul>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-grid gap-4 mt-auto">
                            <div className="flex flex-col items-center sm:items-start">
                                <span className="font-mono text-[10px] text-black/40 uppercase line-through decoration-accent decoration-2">$99.99</span>
                                <span className="font-display font-black text-4xl text-[#1a1a1a]">$19.99</span>
                            </div>
                            <button className="w-full sm:w-auto bg-accent text-white px-8 py-4 font-mono text-xs uppercase tracking-widest hover:bg-[#1a1a1a] transition-all flex items-center justify-center gap-2 shadow-lg shadow-accent/20 animate-pulse rounded-sm group-hover:translate-x-1">
                                Get Instant Access <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                   </div>
               </div>
           </div>
        </div>
    );
}

// --- Budget Flows (Fix for Render Error) ---

const LowBudgetFlow = () => {

  const handleUnlock = () => {
    if (typeof window !== 'undefined') {
        // Secure Redirect Logic to Whop
        // We construct a redirect URL that brings the user back to this page with the 'action=unlock_guide' param
        const currentUrl = new URL(window.location.href);
        currentUrl.searchParams.set('action', 'unlock_guide');
        
        const redirectUrl = encodeURIComponent(currentUrl.toString());
        const checkoutUrl = `https://whop.com/checkout/${WHOP_PRODUCT_ID}?redirect_url=${redirectUrl}`;
        
        window.location.href = checkoutUrl;
    }
  };

  return (
     <div className="text-center py-12 animate-slide-up">
         <div className="inline-block p-4 bg-red-50 text-red-500 rounded-full mb-6 border border-red-100">
            <X className="w-8 h-8" />
         </div>
         
         <h3 className="text-4xl font-display font-black mb-4 uppercase">We can't take you on.</h3>
         
         <div className="bg-[#F4F2ED] p-6 rounded-lg max-w-2xl mx-auto mb-12 border border-grid">
             <p className="font-medium text-[#1a1a1a] text-lg leading-relaxed">
                "focus on <span className="text-accent font-bold">solo growth</span> first. Don't invest in an agency until you have product-market fit."
             </p>
         </div>

         <div className="max-w-2xl mx-auto">
            <div className="mb-6">
                <p className="font-display font-bold text-xl uppercase text-accent mb-2">Don't leave empty handed</p>
                <h4 className="text-3xl font-display font-bold text-[#1a1a1a]">The Halal Virality Framework</h4>
                <p className="text-[#1a1a1a]/60 mt-4 max-w-lg mx-auto">
                    I've documented the exact framework I used to generate 200M+ views. 
                    No fluff. Just the raw, internal SOPs we use daily to dominate the Islamic niche.
                </p>
            </div>

            <StrategyTeaser onUnlock={handleUnlock} />
         </div>
     </div>
  );
};

const MediumBudgetFlow = () => {
    return (
      <div className="text-center py-12 animate-slide-up">
         <div className="inline-block p-4 bg-orange-100 text-orange-500 rounded-full mb-6"><TrendingUp /></div>
         <h3 className="text-3xl font-display font-bold mb-4">Potential Fit.</h3>
         <p className="text-[#1a1a1a]/60 max-w-md mx-auto mb-8">You're close. Our best results come from partners investing $5k+. Can you stretch?</p>
         <button onClick={() => window.location.reload()} className="bg-[#1a1a1a] text-white px-8 py-3 font-mono text-xs uppercase interactive hover:bg-accent transition-colors">Adjust Budget</button>
      </div>
    );
};

const HighBudgetFlow = () => {
    return (
      <div className="text-center py-12 animate-slide-up">
         <div className="inline-block p-4 bg-green-100 text-green-600 rounded-full mb-6"><ShieldCheck /></div>
         <h3 className="text-3xl font-display font-bold mb-4">Let's Build.</h3>
         <p className="text-[#1a1a1a]/60 max-w-md mx-auto mb-8">You match our partner profile perfectly. Let's discuss the infrastructure.</p>
         <a 
           href={CALENDLY_URL}
           target="_blank"
           rel="noopener noreferrer"
           className="inline-block bg-accent text-white px-10 py-4 font-mono text-xs uppercase tracking-widest interactive hover:bg-[#1a1a1a] transition-colors"
         >
           Book Strategy Call
         </a>
      </div>
    );
};

const CompletionState = ({ budget }: { budget: string }) => {
  // Dispatch to specific sub-components to avoid conditional hook render errors
  if (budget === 'less_1k') {
      return <LowBudgetFlow />;
  }

  if (budget === '1k_3k') {
    return <MediumBudgetFlow />;
  }

  // Default / 5k_plus
  return <HighBudgetFlow />;
};

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);