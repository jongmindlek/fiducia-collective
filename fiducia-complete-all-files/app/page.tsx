"use client";

import { useEffect, useRef, useState } from "react";

const works = [
  { number: "01", category: "단편영화", title: "벽", role: "조명감독", year: "2023", image: "/media/portfolio/01/cover.jpg", gallery: Array.from({ length: 7 }, (_, i) => `/media/portfolio/01/${i ? String(i).padStart(2, "0") : "cover"}.jpg`) },
  { number: "02", category: "단편영화", title: "지나고 이어져 망가진", role: "연출감독", year: "2023", award: "전국대학독립영화제 본선 입상", image: "/media/portfolio/02/cover.jpg", gallery: Array.from({ length: 7 }, (_, i) => `/media/portfolio/02/${i ? String(i).padStart(2, "0") : "cover"}.jpg`) },
  { number: "03", category: "단편영화", title: "우리는 가족이니까", role: "촬영감독", year: "2024", image: "/media/portfolio/03/cover.jpg", gallery: Array.from({ length: 7 }, (_, i) => `/media/portfolio/03/${i ? String(i).padStart(2, "0") : "cover"}.jpg`) },
  { number: "04", category: "단편영화", title: "어른아이", role: "촬영 및 조명감독", year: "2024", image: "/media/portfolio/04/cover.jpg", gallery: Array.from({ length: 7 }, (_, i) => `/media/portfolio/04/${i ? String(i).padStart(2, "0") : "cover"}.jpg`) },
  { number: "05", category: "단편영화", title: "서울의 델라", role: "촬영 및 조명감독", year: "2026", image: "/media/portfolio/05/cover.jpg", gallery: Array.from({ length: 7 }, (_, i) => `/media/portfolio/05/${i ? String(i).padStart(2, "0") : "cover"}.jpg`) },
  { number: "06", category: "뮤직비디오", title: "여진(L∞na) ‘Red Hot Chili Summer’", role: "조명감독", year: "2026", image: "https://img.youtube.com/vi/Kdggz2tSGRU/maxresdefault.jpg", gallery: [], youtube: "Kdggz2tSGRU" },
].reverse();

const filmography = [
  { year: "2021", entries: [["단편영화", "호치킨", "편집감독"], ["단편영화", "300만원 짜리 사진", "편집감독"], ["단편영화", "리미티드", "편집감독"], ["단편영화", "가장 완벽한 순간", "연출"]] },
  { year: "2022", entries: [["단편영화", "잠자리", "연출"]] },
  { year: "2023", entries: [["단편영화", "맨홀 속으로", "조명감독"], ["단편영화", "벽", "조명감독"], ["단편영화", "총성", "촬영 및 조명감독"], ["단편영화", "지나고 이어져 망가진", "연출", "전국대학독립영화제 본선 입상"]] },
  { year: "2024", entries: [["단편영화", "우리는 가족이니까", "촬영감독"], ["단편영화", "어른아이", "촬영 및 조명감독"], ["뮤직비디오", "blueprint! / Kash bang", "개퍼"], ["웹드라마", "레오를 죽이는 4가지 방법", "조명팀"], ["홍보 영상", "헌법재판소 공식 영상", "조명팀"], ["광고", "알파인더스트리", "조명팀"], ["광고", "동경규동", "조명팀"]] },
  { year: "2025", entries: [["단편영화", "클로즈업", "조명감독", "충무로단편독립영화제 입상 · 제2회 화성영화제 장려상"], ["광고", "탑텐키즈", "촬영팀"], ["광고", "해밀로직스", "촬영팀"], ["광고", "늘봄 노타비스", "촬영팀"]] },
  { year: "2026", entries: [["뮤직비디오", "여진(L∞na) ‘Red Hot Chili Summer’", "조명감독"], ["단편영화", "서울의 델라", "촬영 및 조명감독"]] },
];

const services = [
  ["01", "WEDDING FILM", "웨딩 필름", "가장 가까운 시선으로 하루의 온도와 감정을 오래 남깁니다"],
  ["02", "INTERVIEW", "인터뷰", "사람의 목소리와 표정에 집중해 진정성 있는 메시지를 전합니다"],
  ["03", "BRAND FILM", "브랜드 필름", "브랜드의 태도와 핵심 가치를 선명한 영상 언어로 설계합니다"],
  ["04", "MUSIC VIDEO", "뮤직비디오", "음악의 분위기와 아티스트의 세계를 감각적인 장면으로 확장합니다"],
  ["05", "LONG & SHORT FILM", "장편 및 단편영화", "이야기의 호흡을 이해하고 기획부터 완성까지 함께 만들어갑니다"],
];

const packages = [
  { number: "01", name: "LIGHT", price: "700,000원 ~", description: "가장 기본적인 촬영 구성이 필요한 프로젝트를 위한 라이트 패키지입니다. 간단한 인터뷰, 스케치 영상, SNS 콘텐츠, 테스트 촬영 등에 적합합니다.", projects: "간단 인터뷰 / SNS 콘텐츠 / 행사 스케치 / 포트폴리오용 촬영" },
  { number: "02", name: "ESSENTIAL", price: "900,000원 ~", description: "기본적인 촬영 품질과 현장 안정성을 갖춘 실속형 패키지입니다. 브랜드 소개, 인터뷰, 행사 기록, 개인 콘텐츠 등 다양한 촬영에 활용하기 좋습니다.", projects: "브랜드 소개 영상 / 기업 인터뷰 / 제품 스케치 / 개인 프로필 영상 / 행사 기록" },
  { number: "03", name: "STANDARD", price: "1,400,000원 ~", description: "시네마 카메라와 전문 렌즈, 조명 구성을 활용하는 표준 촬영 패키지입니다. 브랜드 필름, 광고성 콘텐츠, 인터뷰, 뮤직비디오 등 완성도 있는 촬영이 필요한 프로젝트에 적합합니다.", projects: "브랜드 필름 / 시네마틱 인터뷰 / 제품 광고 / 뮤직비디오 / 단편 영상 촬영" },
  { number: "04", name: "SIGNATURE", price: "2,500,000원 ~", description: "피두사 컬렉티브의 촬영 스타일과 연출 설계가 본격적으로 반영되는 대표 패키지입니다. 단순 기록이 아닌 콘셉트와 무드가 있는 촬영을 원하는 프로젝트에 적합합니다.", projects: "브랜드 캠페인 / 프리미엄 인터뷰 / 웨딩 시네마틱 촬영 / 뮤직비디오 / 패션 필름 / 아티스트 프로모션" },
  { number: "05", name: "PLUS", price: "4,000,000원 ~", description: "촬영 장비와 현장 인력을 확장하여 더 큰 규모의 제작에 대응하는 패키지입니다. 멀티카메라, 조명 세팅, 현장 모니터링, 보조 인력 투입이 필요한 프로젝트에 적합합니다.", projects: "중소규모 광고 / 브랜드 다큐멘터리 / 행사 하이라이트 / 뮤직비디오 / 다인 인터뷰 / 제품 캠페인" },
  { number: "06", name: "PREMIUM", price: "6,000,000원 ~", description: "하이엔드 시네마 카메라, 시네마 렌즈, 대형 조명 장비와 전문 촬영·조명 인력이 투입되는 상위 촬영 패키지입니다. 광고, 뮤직비디오, 브랜드 캠페인, 영화적 연출이 필요한 프로젝트에 적합합니다.", projects: "광고 영상 / 뮤직비디오 / 프리미엄 브랜드 필름 / 영화 트레일러 / 웨딩 하이엔드 촬영 / 아트필름" },
  { number: "07", name: "CUSTOM", price: "개별 견적", description: "프로젝트의 목적, 규모, 기술 난이도에 따라 장비, 인력, 촬영 방식, 후반작업 범위를 별도로 설계하는 맞춤형 패키지입니다. 대형 광고 캠페인, 영화, 뮤직비디오, AI·VFX 기반 콘텐츠, 자체 IP 프로젝트에 적합합니다.", projects: "브랜드 캠페인 / 장편·단편영화 / 대형 뮤직비디오 / AI·VFX 콘텐츠 / 자체 IP 프로젝트" },
];

const recommendedPackageByService = [1, 2, 3, 4, 5];

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const [muted, setMuted] = useState(true);
  const [priceOpen, setPriceOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(services[0]);
  const [selectedPackage, setSelectedPackage] = useState(2);
  const [recommendedPackage, setRecommendedPackage] = useState(2);
  const [activeWork, setActiveWork] = useState(0);
  const [modalWork, setModalWork] = useState<number | null>(null);
  const [galleryIndex, setGalleryIndex] = useState(0);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && videoRef.current) {
          videoRef.current.muted = true;
          setMuted(true);
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (videoRef.current) videoRef.current.volume = 0.56;
  }, []);

  useEffect(() => {
    if (modalWork !== null) return;
    const timer = window.setInterval(() => setActiveWork((current) => (current + 1) % works.length), 3800);
    return () => window.clearInterval(timer);
  }, [modalWork]);

  useEffect(() => {
    if (modalWork === null) return;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setModalWork(null);
      if (event.key === "ArrowRight") setGalleryIndex((current) => (current + 1) % Math.max(works[modalWork].gallery.length, 1));
      if (event.key === "ArrowLeft") setGalleryIndex((current) => (current - 1 + Math.max(works[modalWork].gallery.length, 1)) % Math.max(works[modalWork].gallery.length, 1));
    };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [modalWork]);

  const openWork = (index: number) => { setModalWork(index); setGalleryIndex(0); };
  const changeGallery = (direction: number) => {
    if (modalWork === null) return;
    const count = works[modalWork].gallery.length;
    if (count) setGalleryIndex((current) => (current + direction + count) % count);
  };

  const toggleSound = async () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
    if (video.paused) await video.play().catch(() => undefined);
  };

  const openPrice = (service: (typeof services)[number]) => {
    const serviceIndex = services.findIndex((item) => item[0] === service[0]);
    const recommendation = recommendedPackageByService[serviceIndex] ?? 2;
    setSelectedService(service);
    setRecommendedPackage(recommendation);
    setSelectedPackage(recommendation);
    setPriceOpen(true);
  };

  return (
    <main>
      <header className="site-header">
        <a className="mini-brand" href="#top" aria-label="Fiducia Collective 홈">
          <img src="/media/fiducia-logo-white.png" alt="FIDUCIA COLLECTIVE" />
        </a>
        <nav aria-label="주요 메뉴">
          <a href="#works">WORKS</a>
          <a href="#services">SERVICES</a>
          <a href="#about">ABOUT</a>
          <a className="nav-contact" href="#contact">CONTACT ↗</a>
        </nav>
      </header>

      <section className="hero" id="top" ref={heroRef}>
        <video ref={videoRef} className="hero-video" autoPlay muted loop playsInline poster="/media/reel-poster.jpg" preload="metadata">
          <source src="/media/fiducia-reel-2025-hq.mp4" type="video/mp4" />
        </video>
        <div className="hero-shade" />
        <div className="hero-grain" />
        <div className="hero-controls">
          <a className="reel-link" href="#works"><span className="play">▶</span><span>2025 SHOWREEL</span></a>
          <button className="sound-toggle" type="button" onClick={toggleSound} aria-label={muted ? "영상 소리 켜기" : "영상 소리 끄기"}>
            <span className={`sound-bars ${muted ? "is-muted" : ""}`}><i /><i /><i /></span>
            {muted ? "SOUND ON" : "SOUND OFF"}
          </button>
        </div>
      </section>

      <section className="intro section-shell">
        <p className="eyebrow">BUILT AROUND YOUR STORY</p>
        <h2>예산은 유연하게<br />과정은 투명하게</h2>
        <p className="intro-copy">
          피두사 컬렉티브는 정해진 방식보다 프로젝트에 맞는 방식을 먼저 찾습니다.
          원하는 제작비와 목표를 함께 살피고, 꼭 필요한 과정에 집중해 맞춤형 제작안을 설계합니다.
          기획부터 촬영, 후반작업까지 진행 상황과 비용을 투명하게 공유하며 좋은 결과에 도달합니다.
        </p>
      </section>

      <section className="works" id="works">
        <div className="section-heading section-shell works-heading">
          <div><p className="eyebrow">RECENT WORKS</p><h2>최근 작품</h2></div>
          <p>{String(activeWork + 1).padStart(2, "0")} / 06 &nbsp; PORTFOLIO</p>
        </div>
        <div className="work-carousel">
          <div className="work-track" style={{ transform: `translateX(calc(20vw - ${activeWork * 60}vw - ${activeWork * 24}px))` }}>
          {works.map((work, index) => (
            <article className={`work-card ${activeWork === index ? "is-active" : ""}`} key={work.number} onMouseEnter={() => setActiveWork(index)}>
              <button className="work-image" type="button" aria-label={`${work.title} 상세 보기`} onClick={() => openWork(index)}>
                <img src={work.image} alt={`${work.title} 스틸`} />
                <span className="work-arrow">VIEW ↗</span>
              </button>
              <div className="work-info">
                <span>{work.number}</span><div><small>{work.category}</small><h3>{work.title}</h3></div><span>{work.role}</span><span>{work.year}</span>
              </div>
              {work.award && <div className="award-slot">AWARD — {work.award}</div>}
            </article>
          ))}
          </div>
        </div>
        <div className="work-nav section-shell">
          <button type="button" onClick={() => setActiveWork((activeWork - 1 + works.length) % works.length)} aria-label="이전 작품">←</button>
          <div>{works.map((work, index) => <button type="button" key={work.number} className={activeWork === index ? "active" : ""} onClick={() => setActiveWork(index)} aria-label={`${work.title} 보기`} />)}</div>
          <button type="button" onClick={() => setActiveWork((activeWork + 1) % works.length)} aria-label="다음 작품">→</button>
        </div>
      </section>

      <section className="services" id="services">
        <div className={`service-track ${priceOpen ? "show-price" : ""}`}>
          <div className="service-page section-shell">
            <div className="section-heading">
              <div><p className="eyebrow">WHAT WE CREATE</p><h2>필요한 만큼<br />정확하게 만듭니다</h2></div>
              <p className="services-note">목적과 예산을 먼저 듣고<br />가장 현실적인 제작 방식을 제안합니다</p>
            </div>
            <div className="service-list">
              {services.map((service) => (
                <button type="button" key={service[0]} onClick={() => openPrice(service)}>
                  <span>{service[0]}</span><div><b>{service[1]}</b><h3>{service[2]}</h3></div><p>{service[3]}</p><span className="service-arrow">→</span>
                </button>
              ))}
            </div>
          </div>

          <div className="price-page section-shell" aria-hidden={!priceOpen}>
            <button className="price-back" type="button" onClick={() => setPriceOpen(false)}>← SERVICES</button>
            <div className="price-heading">
              <div><p className="eyebrow">PACKAGE GUIDE</p><h2>{selectedService[2]}</h2><p>{selectedService[1]}</p></div>
              <p className="package-guide-note"><strong>적합한 패키지를 먼저 추천합니다</strong><br />다른 단계를 눌러 구성과 시작가를 비교할 수 있습니다</p>
            </div>
            <div className="package-grid">
              {packages.map((item, index) => (
                <button className={selectedPackage === index ? "selected" : ""} type="button" key={item.name} onClick={() => setSelectedPackage(index)}>
                  <span>{item.number}</span><strong>{item.name}</strong><small>{recommendedPackage === index ? "RECOMMENDED" : item.price}</small>
                </button>
              ))}
            </div>
            <div className="package-detail">
              <div className="package-detail-title"><span>{packages[selectedPackage].number} / SELECTED PACKAGE</span><h3>{packages[selectedPackage].name}</h3><strong>{packages[selectedPackage].price}</strong></div>
              <div><span>제품 설명</span><p>{packages[selectedPackage].description}</p></div>
              <div><span>추천 프로젝트</span><p>{packages[selectedPackage].projects}</p></div>
              <a href="#contact">이 패키지로 문의하기 ↗</a>
            </div>
            <div className="production-levels">
              <div className="levels-title"><p className="eyebrow">FIDUCIA COLLECTIVE</p><h3>PRODUCTION<br />LEVELS</h3><p>본 패키지는 촬영 기준 패키지입니다. 프로젝트의 규모와 목적에 따라 촬영 장비, 조명 장비, 현장 인력, 촬영 운영 범위를 구성합니다.</p></div>
              <div className="levels-terms">
                <h4>촬영 패키지 기준</h4>
                <ul>
                  <li>표시가격은 1회차 촬영 기준 시작가입니다</li>
                  <li>1회차 촬영은 최대 12시간을 기준으로 합니다</li>
                  <li>기본 촬영 구성에는 촬영감독, 촬영·조명 보조 인력, 기본 장비 구성, 장비 렌탈료, 수도권 기준 유류비가 포함됩니다</li>
                  <li>편집, 색보정, 자막, 사운드 후반작업, AI·VFX 작업은 기본 패키지에 포함되지 않습니다</li>
                  <li>장소 대관, 의상, 미술, 모델·배우 섭외, 주차비, 통행료, 지방 출장비는 별도입니다</li>
                  <li>장시간 촬영 시 현장 식비는 별도 협의됩니다</li>
                  <li>촬영 규모, 인력 구성, 장비 구성에 따라 최종 견적은 조정될 수 있습니다</li>
                </ul>
              </div>
              <div className="levels-notes">
                <article><span>01</span><h4>후반작업 안내</h4><p>편집, 색보정, 자막, 사운드 후반작업, AI·VFX는 촬영 패키지와 별도로 견적이 산정됩니다. 단, 웨딩 식전영상, 숏폼 콘텐츠, 간단한 스케치 영상 등 비교적 단순한 편집은 프로젝트에 따라 별도 협의가 가능합니다.</p></article>
                <article><span>02</span><h4>사운드 안내</h4><p>기본 패키지에는 전문 사운드 녹음이 포함되지 않습니다. 현장 음성 녹음이 필요한 경우 사운드 인력과 장비가 추가되며, 믹싱·보정·디자인은 별도 후반작업 견적으로 진행됩니다.</p></article>
                <article><span>03</span><h4>AI·VFX 안내</h4><p>AI·VFX 작업은 기본 촬영 패키지에 포함되지 않습니다. AI 프리비주얼, 배경 확장, 합성, 환경 제작, VFX 컷 제작 등은 프로젝트 난이도에 따라 별도 견적으로 진행됩니다.</p></article>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about section-shell" id="about">
        <div className="about-visual">
          <span className="orbit orbit-one" /><span className="orbit orbit-two" />
          <img className="about-mark" src="/media/fiducia-mark-white.png" alt="" aria-hidden="true" />
          <span className="about-caption">FIDUCIA / TRUST</span>
        </div>
        <div className="about-copy">
          <p className="eyebrow">ABOUT FIDUCIA</p>
          <h2>서로 다른 모습이<br />함께 맞춰지는 곳</h2>
          <p className="about-manifesto">클라이언트의 필요에 가장 먼저 맞추고<br />예술가와 창작자의 가치를 단단히 지키며<br />함께 성장하는 제작 공동체를 만듭니다</p>
          <p>피두사의 세 막대는 그래프이자 알파벳 F를 상징합니다. 서로 다른 길이는 사람과 프로젝트마다 필요한 방식이 다르다는 뜻입니다. 우리는 하나의 기준에 모두를 맞추기보다, 각자의 모양과 가능성을 이해하고 가장 알맞은 제작 방식을 함께 찾아갑니다.</p>
        </div>
      </section>

      <section className="filmography section-shell" id="filmography">
        <div className="section-heading">
          <div><p className="eyebrow">FILMOGRAPHY</p><h2>참여 작품</h2></div>
          <p>2021—2026</p>
        </div>
        <div className="history-list">
          {filmography.map((group) => (
            <article key={group.year}>
              <h3>{group.year}</h3>
              <div>
                {group.entries.map((entry, index) => (
                  <div className="history-entry" key={`${entry[1]}-${index}`}>
                    <span>{entry[0]}</span><strong>{entry[1]}</strong><span>{entry[2]}</span>{entry[3] && <em>{entry[3]}</em>}
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="contact section-shell" id="contact">
        <p className="eyebrow">LET’S TALK</p>
        <h2>Your story<br />starts here</h2>
        <div className="contact-actions">
          <a href="http://pf.kakao.com/_WLxapn" target="_blank" rel="noreferrer"><span>카카오톡 채널</span><span>↗</span></a>
          <a href="https://www.instagram.com/fiduciacollective/" target="_blank" rel="noreferrer"><span>인스타그램</span><span>↗</span></a>
        </div>
        <div className="business-info"><span>FIDUCIA COLLECTIVE</span><span>사업자등록번호 872-28-01941</span></div>
        <div className="contact-bottom">
          <div className="footer-brand"><img src="/media/fiducia-logo-white.png" alt="FIDUCIA COLLECTIVE" /></div>
          <div><a href="http://pf.kakao.com/_WLxapn" target="_blank" rel="noreferrer">KAKAO ↗</a><a href="https://www.instagram.com/fiduciacollective/" target="_blank" rel="noreferrer">INSTAGRAM ↗</a></div>
          <p>© 2026 FIDUCIA COLLECTIVE</p>
        </div>
      </section>

      {modalWork !== null && (
        <div className="work-modal" role="dialog" aria-modal="true" aria-label={`${works[modalWork].title} 작품 상세`}>
          <button className="modal-close" type="button" onClick={() => setModalWork(null)} aria-label="작품 상세 닫기">CLOSE ×</button>
          <div className="modal-meta">
            <div><span>{works[modalWork].number} / {works[modalWork].category}</span><h2>{works[modalWork].title}</h2></div>
            <div><span>{works[modalWork].year}</span><strong>{works[modalWork].role}</strong>{works[modalWork].award && <em>{works[modalWork].award}</em>}</div>
          </div>
          {works[modalWork].youtube ? (
            <div className="youtube-frame"><iframe src={`https://www.youtube-nocookie.com/embed/${works[modalWork].youtube}?autoplay=1&rel=0`} title={works[modalWork].title} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen /></div>
          ) : (
            <>
              <div className="gallery-window">
                <div className="gallery-track" style={{ transform: `translateX(calc(12vw - ${galleryIndex * 78}vw))` }}>
                  {works[modalWork].gallery.map((image, index) => <img className={galleryIndex === index ? "active" : ""} src={image} alt={`${works[modalWork].title} 스틸 ${index + 1}`} key={image} />)}
                </div>
                <button className="gallery-prev" type="button" onClick={() => changeGallery(-1)} aria-label="이전 사진">←</button>
                <button className="gallery-next" type="button" onClick={() => changeGallery(1)} aria-label="다음 사진">→</button>
              </div>
              <div className="gallery-count">{String(galleryIndex + 1).padStart(2, "0")} / {String(works[modalWork].gallery.length).padStart(2, "0")}</div>
            </>
          )}
        </div>
      )}
    </main>
  );
}
