document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector("#header");
    const gnbItems = document.querySelectorAll(".gnb");

    gnbItems.forEach((item) => {
        item.addEventListener("mouseenter", () => {
            header.classList.add("active");
        });

        item.addEventListener("mouseleave", () => {
            header.classList.remove("active");
        });
    });

    // 메인비주얼
    const visualSwiper = new Swiper(".visual-slider", {
        loop: true, // 무한 루프
        autoplay: {
            delay: 3000, // 3초마다 전환
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        effect: "fade", // 원하는 효과: slide, fade 등
        speed: 800, // 전환 속도

        on: {
            slideChange: function () {
                const bullets = document.querySelectorAll(
                    ".swiper-pagination-bullet"
                );

                bullets.forEach((bullet) => {
                    bullet.style.width = "30px";
                    bullet.style.opacity = "0.6";
                    bullet.style.transition = "all 0.3s ease"; // optional
                });

                const activeBullet = document.querySelector(
                    ".swiper-pagination-bullet-active"
                );
                if (activeBullet) {
                    activeBullet.style.width = "80px";
                    activeBullet.style.opacity = "1";
                }
            },
        },
    });

    const menuSwiper = new Swiper(".menu-slider", {
        loop: true, // 슬라이드 무한 반복
        slidesPerView: 3.5,
        spaceBetween: 30,
        autoplay: {
            delay: 3000,
        },
        speed: 800,

        navigation: {
            nextEl: ".menu-slider .swiper-button-next",
            prevEl: ".menu-slider .swiper-button-prev",
        },
    });

    // GSAP
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    // vision
    gsap.from(".vision h2", {
        opacity: 0,
        y: 50,
        duration: 1.5,
        ease: "power4.out",
        scrollTrigger: {
            trigger: ".vision",
            start: "top 70%",
            toggleActions: "play reverse play reverse",
            // markers: true,
        },
    });

    gsap.from(".vision-con figure", {
        scale: 0.8,
        autoAlpha: 0,
        duration: 1.6,
        ease: "power2.inOut",
        stagger: 0.5, // 여기서 시간차

        scrollTrigger: {
            trigger: ".vision", // 섹션 기준
            start: "top 70%",
            toggleActions: "play none reverse none",
            // markers: true,
        },
    });

    //  vision text
    const titles = gsap.utils.toArray(".vision-con dt, .vision-con dd ");

    titles.forEach((title) => {
        gsap.from(title, {
            autoAlpha: 0,
            y: 100,
            duration: 1.6,
            ease: "power2.inOut",
            scrollTrigger: {
                trigger: title,
                start: "top 80%",
                toggleActions: "play reverse play reverse", // 반복 가능
                // markers: true, // 개발 시 확인용
            },
        });
    });

    document.querySelectorAll(".notice figure img ").forEach((img) => {
        img.addEventListener("mouseenter", () => {
            gsap.to(img, {
                scale: 1.1,
                duration: 0.4,
                ease: "power2.out",
            });
        });

        img.addEventListener("mouseleave", () => {
            gsap.to(img, {
                scale: 1,
                duration: 0.4,
                ease: "power2.out",
            });
        });
    });

    // visual view more 부분
    let x = 0,
        y = 0;

    const visual = document.querySelector(".visual");
    const cursor = document.querySelector(".cursor");

    gsap.set(cursor, { autoAlpha: 0, scale: 0.3 });

    visual.addEventListener("mousemove", (e) => {
        // console.log(e);
        x = e.pageX;
        y = e.pageY;

        gsap.to(cursor, { left: x, top: y });
    });

    visual.addEventListener("mouseenter", () => {
        gsap.to(cursor, { autoAlpha: 1, scale: 1 });
    });
    visual.addEventListener("mouseleave", () => {
        gsap.to(cursor, { autoAlpha: 0, scale: 0.3 });
    });

    // TOP 버튼
    const btnTop = document.querySelector(".btn-top");
    gsap.from(btnTop, {
        autoAlpha: 0,
        scrollTrigger: {
            trigger: ".notice",
            // markers: true,
            start: "top 70%",
            toggleActions: "play none play reverse",
        },
    });

    // 클릭했을 때 상단으로 이동
    btnTop.addEventListener("click", () => {
        gsap.to(window, { duration: 1, scrollTo: 0 });
    });
});
