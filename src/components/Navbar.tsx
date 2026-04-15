import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const MOBILE_BREAKPOINT = 992;

const products = [
  { label: 'Mark8 Ads', href: '/products/ads' },
  { label: 'Mark8 Sight', href: '/products/sight' },
  { label: 'Mark8 Shelf', href: '/products/shelf' },
  { label: 'Mark8 Reco', href: '/products/reco' },
  { label: 'Mark8 Returns', href: '/products/returns' },
];

const learnSupport = [
  { label: 'Blogs', href: '/blogs' },
  { label: 'Tutorials', href: '/tutorials' },
  { label: 'FAQs', href: '/faqs' },
];

const discover = [
  { label: 'About Us', href: '/about-us' },
  { label: 'News', href: '/news' },
  { label: 'Events', href: '/events' },
  { label: 'Careers', href: '/career' },
];

const DropdownArrow = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="22.344"
    height="12.479"
    viewBox="0 0 22.344 12.479"
    className="Header_dropdown_arrow__44VKN"
  >
    <path
      fill="none"
      stroke="currentColor"
      strokeMiterlimit={10}
      strokeWidth={2}
      d="m.703.71 10.469 10.362L21.641.71"
      data-name="Path 2513"
    />
  </svg>
);

interface NavDropdownProps {
  label: string;
  items: { label: string; href: string }[];
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  isMobile: boolean;
  onNavigate: (href: string) => void;
}

function NavDropdown({ label, items, isOpen, onToggle, onClose, isMobile, onNavigate }: NavDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  return (
    <div
      className="Header_links__hyKZG"
      ref={dropdownRef}
    >
      <div
        className="Header_link_title__KnPnj fs_16"
        style={{ cursor: 'pointer' }}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onToggle();
        }}
      >
        <span>{label}</span>
        <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'transform 0.3s ease',
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          transformOrigin: 'center center',
        }}>
          <DropdownArrow />
        </span>
      </div>
      <div className={`Header_dropdown__ogeNG ${isOpen ? 'Header_active__sryJG' : ''}`}>
        {items.map((item) => (
          <div key={item.href} className="Header_dropdown_link__66YNy fs_16 color_text">
            <a
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(item.href);
              }}
            >
              <p className="Header_dropdown_link__66YNy fs_16 color_text">{item.label}</p>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const bgBoxRef = useRef<HTMLDivElement>(null);
  const linksWrapRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Check mobile breakpoint
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Scroll listener for header_scrolled state
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Position the bg_box behind the links_wrap
  useEffect(() => {
    const updateBgBox = () => {
      const bgBox = bgBoxRef.current;
      const linksWrap = linksWrapRef.current;
      const header = headerRef.current;
      if (!bgBox || !linksWrap || !header || isMobile) return;

      const headerRect = header.getBoundingClientRect();
      const linksRect = linksWrap.getBoundingClientRect();

      bgBox.style.width = `${linksRect.width + 20}px`;
      bgBox.style.height = `${linksRect.height}px`;
      bgBox.style.left = `${linksRect.left - headerRect.left - 10}px`;
      bgBox.style.top = `${linksRect.top - headerRect.top}px`;
      bgBox.style.borderRadius = '5px';
    };

    updateBgBox();
    window.addEventListener('resize', updateBgBox);
    return () => window.removeEventListener('resize', updateBgBox);
  }, [isMobile]);

  const handleNavigate = useCallback((href: string) => {
    navigate(href);
    setSidebarOpen(false);
    setOpenDropdown(null);
  }, [navigate]);

  const toggleDropdown = (name: string) => {
    setOpenDropdown((prev) => (prev === name ? null : name));
  };

  const closeDropdown = (name: string) => {
    if (openDropdown === name) setOpenDropdown(null);
  };

  const headerClasses = [
    'Header_main_header__0zVVE',
    scrolled ? 'Header_header_scrolled__g7npq' : '',
    sidebarOpen ? 'Header_sidebar_opened__zLf90' : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={headerClasses} ref={headerRef}>
      <div className="Header_bg_box__iSYuh" ref={bgBoxRef} />
      <div className="container">
        <div className="Header_header_inside__mipeB">
          <Link to="/">
            <div className="Header_image_wrap__MrSDq">
              <img
                alt="Logo"
                loading="eager"
                fetchPriority="high"
                width={130}
                height={27}
                style={{ color: 'transparent' }}
                src="/img/logo-black.svg"
              />
            </div>
          </Link>

          <div className="Header_links_wrap__d9pKH" ref={linksWrapRef}>
            <NavDropdown
              label="Products"
              items={products}
              isOpen={openDropdown === 'products'}
              onToggle={() => toggleDropdown('products')}
              onClose={() => closeDropdown('products')}
              isMobile={isMobile}
              onNavigate={handleNavigate}
            />

            <div className="Header_links__hyKZG">
              <Link to="/why-us" onClick={() => { setSidebarOpen(false); setOpenDropdown(null); }}>
                <div className="Header_link_title__KnPnj fs_16">Why Us?</div>
              </Link>
            </div>

            <div className="Header_links__hyKZG">
              <Link to="/success-stories" onClick={() => { setSidebarOpen(false); setOpenDropdown(null); }}>
                <div className="Header_link_title__KnPnj fs_16">Success Stories</div>
              </Link>
            </div>

            <NavDropdown
              label="Learn & Support"
              items={learnSupport}
              isOpen={openDropdown === 'learn'}
              onToggle={() => toggleDropdown('learn')}
              onClose={() => closeDropdown('learn')}
              isMobile={isMobile}
              onNavigate={handleNavigate}
            />

            <div className="Header_links__hyKZG">
              <Link to="/pricing" onClick={() => { setSidebarOpen(false); setOpenDropdown(null); }}>
                <div className="Header_link_title__KnPnj fs_16">Pricing</div>
              </Link>
            </div>

            <NavDropdown
              label="Discover"
              items={discover}
              isOpen={openDropdown === 'discover'}
              onToggle={() => toggleDropdown('discover')}
              onClose={() => closeDropdown('discover')}
              isMobile={isMobile}
              onNavigate={handleNavigate}
            />

            <div className="Header_button__g_PqA">
              <Link to="/get-in-touch">
                <span className="Button_btn_wrap__DW66V">
                  <button className="fs_18 font_primary fw_400 Button_btn_common_styles__ddJx7 bg_neutral_dark">
                    <span>Get in Touch</span>
                  </button>
                </span>
              </Link>
            </div>
          </div>

          <div
            className="Header_hamburger_icon__jHERs"
            onClick={() => setSidebarOpen((prev) => !prev)}
          >
            <span className="Header_hamburger_line__e18nD" />
            <span className="Header_hamburger_line__e18nD" />
            <span className="Header_hamburger_line__e18nD" />
          </div>
        </div>
      </div>
    </div>
  );
}
