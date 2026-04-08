import { useRef, useEffect } from 'react';
import { useNavigateLinks } from '../hooks/useNavigateLinks';

const headerHTML = `<div class="Header_main_header__0zVVE"><div class="Header_bg_box__iSYuh" style="width: 826.109px; height: 54px; left: 506.391px; top: 23px; border-radius: 5px;"></div><div class="container"><div class="Header_header_inside__mipeB"><a href="/"><div class="Header_image_wrap__MrSDq"><img alt="Logo" loading="lazy" width="130" height="27" decoding="async" data-nimg="1" style="color:transparent" src="https://infytrix.info/img/logo-black.svg"></div></a><div class="Header_links_wrap__d9pKH"><div class="Header_links__hyKZG"><div class="Header_link_title__KnPnj fs_16"><span>Products</span><svg xmlns="http://www.w3.org/2000/svg" width="22.344" height="12.479" viewBox="0 0 22.344 12.479" class="Header_dropdown_arrow__44VKN "><path fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2" d="m.703.71 10.469 10.362L21.641.71" data-name="Path 2513"></path></svg></div><div class="Header_dropdown__ogeNG "><div class="Header_dropdown_link__66YNy fs_16 color_text"><a href="/products/ads"><p class="Header_dropdown_link__66YNy fs_16 color_text">Mark8 <!-- -->Ads</p></a></div><div class="Header_dropdown_link__66YNy fs_16 color_text"><a href="/products/sight"><p class="Header_dropdown_link__66YNy fs_16 color_text">Mark8 <!-- -->Sight</p></a></div><div class="Header_dropdown_link__66YNy fs_16 color_text"><a href="/products/shelf"><p class="Header_dropdown_link__66YNy fs_16 color_text">Mark8 <!-- -->Shelf</p></a></div><div class="Header_dropdown_link__66YNy fs_16 color_text"><a href="/products/reco"><p class="Header_dropdown_link__66YNy fs_16 color_text">Mark8 <!-- -->Reco</p></a></div><div class="Header_dropdown_link__66YNy fs_16 color_text"><a href="/products/returns"><p class="Header_dropdown_link__66YNy fs_16 color_text">Mark8 <!-- -->Returns</p></a></div></div></div><div class="Header_links__hyKZG"><a href="/why-us"><div class="Header_link_title__KnPnj fs_16">Why Us?</div></a></div><div class="Header_links__hyKZG"><a href="/success-stories"><div class="Header_link_title__KnPnj fs_16">Success Stories</div></a></div><div class="Header_links__hyKZG"><div class="Header_link_title__KnPnj fs_16"><span>Learn &amp; Support</span><svg xmlns="http://www.w3.org/2000/svg" width="22.344" height="12.479" viewBox="0 0 22.344 12.479" class="Header_dropdown_arrow__44VKN "><path fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2" d="m.703.71 10.469 10.362L21.641.71" data-name="Path 2513"></path></svg></div><div class="Header_dropdown__ogeNG "><div class="Header_dropdown_link__66YNy fs_16 color_text"><a href="/blogs"><p>Blogs</p></a></div><div class="Header_dropdown_link__66YNy fs_16 color_text"><a href="/tutorials"><p class="Header_dropdown_link__66YNy fs_16 color_text">Tutorials</p></a></div><div class="Header_dropdown_link__66YNy fs_16 color_text"><a href="/faqs"><p class="Header_dropdown_link__66YNy fs_16 color_text">FAQs</p></a></div></div></div><div class="Header_links__hyKZG"><a href="/pricing"><div class="Header_link_title__KnPnj fs_16">Pricing</div></a></div><div class="Header_links__hyKZG"><div class="Header_link_title__KnPnj fs_16"><span>Discover</span><svg xmlns="http://www.w3.org/2000/svg" width="22.344" height="12.479" viewBox="0 0 22.344 12.479" class="Header_dropdown_arrow__44VKN "><path fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2" d="m.703.71 10.469 10.362L21.641.71" data-name="Path 2513"></path></svg></div><div class="Header_dropdown__ogeNG "><div class="Header_dropdown_link__66YNy fs_16 color_text"><a href="/about-us"><p>About Us</p></a></div><div class="Header_dropdown_link__66YNy fs_16 color_text"><a href="/news"><p>News</p></a></div><div class="Header_dropdown_link__66YNy fs_16 color_text"><a href="/events"><p>Events</p></a></div><div class="Header_dropdown_link__66YNy fs_16 color_text"><a href="/career"><p class="Header_dropdown_link__66YNy fs_16 color_text">Careers</p></a></div></div></div><div class="Header_button__g_PqA"><a href="/get-in-touch"><span class="Button_btn_wrap__DW66V false"><button class="fs_18 font_primary fw_400 Button_btn_common_styles__ddJx7  bg_neutral_dark"><span>Get in Touch</span></button></span></a></div></div><div class="Header_hamburger_icon__jHERs"><span class="Header_hamburger_line__e18nD"></span><span class="Header_hamburger_line__e18nD"></span><span class="Header_hamburger_line__e18nD"></span></div></div></div></div></div>`;

const MOBILE_BREAKPOINT = 992;

export default function Navbar() {
  const ref = useRef<HTMLDivElement>(null);
  useNavigateLinks(ref);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const cleanups: Array<() => void> = [];

    // --- Desktop hover dropdowns ---
    const linkGroups = el.querySelectorAll('.Header_links__hyKZG');
    linkGroups.forEach((group) => {
      const dropdown = group.querySelector('.Header_dropdown__ogeNG');
      if (!dropdown) return;

      const onEnter = () => {
        if (window.innerWidth >= MOBILE_BREAKPOINT) {
          dropdown.classList.add('Header_active__sryJG');
        }
      };
      const onLeave = () => {
        if (window.innerWidth >= MOBILE_BREAKPOINT) {
          dropdown.classList.remove('Header_active__sryJG');
        }
      };

      group.addEventListener('mouseenter', onEnter);
      group.addEventListener('mouseleave', onLeave);
      cleanups.push(() => {
        group.removeEventListener('mouseenter', onEnter);
        group.removeEventListener('mouseleave', onLeave);
      });
    });

    // --- Mobile hamburger toggle ---
    const header = el.querySelector('.Header_main_header__0zVVE');
    const hamburger = el.querySelector('.Header_hamburger_icon__jHERs');

    if (header && hamburger) {
      const toggleSidebar = () => {
        header.classList.toggle('Header_sidebar_opened__zLf90');
      };
      hamburger.addEventListener('click', toggleSidebar);
      cleanups.push(() => hamburger.removeEventListener('click', toggleSidebar));
    }

    // --- Mobile dropdown click toggle ---
    linkGroups.forEach((group) => {
      const title = group.querySelector('.Header_link_title__KnPnj');
      const dropdown = group.querySelector('.Header_dropdown__ogeNG');
      const arrow = group.querySelector('.Header_dropdown_arrow__44VKN');
      if (!title || !dropdown) return;

      const onClick = (e: Event) => {
        if (window.innerWidth >= MOBILE_BREAKPOINT) return;
        // Only toggle if the click is on the title itself (not a link inside dropdown)
        if (!(e.target as HTMLElement).closest('.Header_dropdown__ogeNG')) {
          e.preventDefault();
          e.stopPropagation();
          const isActive = dropdown.classList.toggle('Header_active__sryJG');
          if (arrow) {
            arrow.classList.toggle('Header_rotated__Ha3am', isActive);
          }
        }
      };
      group.addEventListener('click', onClick);
      cleanups.push(() => group.removeEventListener('click', onClick));
    });

    // --- Close mobile nav on link click ---
    const linksWrap = el.querySelector('.Header_links_wrap__d9pKH');
    if (header && linksWrap) {
      const onLinkClick = (e: Event) => {
        const anchor = (e.target as HTMLElement).closest('a');
        if (anchor && window.innerWidth < MOBILE_BREAKPOINT) {
          header.classList.remove('Header_sidebar_opened__zLf90');
          // Also close all dropdowns
          el.querySelectorAll('.Header_dropdown__ogeNG.Header_active__sryJG').forEach((d) => {
            d.classList.remove('Header_active__sryJG');
          });
          el.querySelectorAll('.Header_dropdown_arrow__44VKN.Header_rotated__Ha3am').forEach((a) => {
            a.classList.remove('Header_rotated__Ha3am');
          });
        }
      };
      linksWrap.addEventListener('click', onLinkClick);
      cleanups.push(() => linksWrap.removeEventListener('click', onLinkClick));
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return <div ref={ref} dangerouslySetInnerHTML={{ __html: headerHTML }} />;
}
