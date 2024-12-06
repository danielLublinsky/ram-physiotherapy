function loadMarkdownTextBlock(targetId, markdownTitle, urlLeft, urlRight) {
  // Validate that inputs are URLs
  const validateUrl = (url) => {
    try {
      new URL(url); // Throws an error if the URL is invalid
      return true;
    } catch {
      return false;
    }
  };

  if (!validateUrl(urlLeft) || !validateUrl(urlRight)) {
    console.error("Invalid URL(s) provided for Markdown files.");
    return;
  }

  // Fetch the template and Markdown files concurrently
  Promise.all([
    fetch("./components/markdown-textBlock.html").then((res) => {
      if (!res.ok) throw new Error("Failed to fetch template.");
      return res.text();
    }),
    fetch(urlLeft).then((res) => {
      if (!res.ok)
        throw new Error(`Failed to fetch Markdown from URL: ${urlLeft}`);
      return res.text();
    }),
    fetch(urlRight).then((res) => {
      if (!res.ok)
        throw new Error(`Failed to fetch Markdown from URL: ${urlRight}`);
      return res.text();
    }),
  ])
    .then(([template, markdownLeft, markdownRight]) => {
      const targetElement = document.getElementById(targetId);
      if (!targetElement) {
        throw new Error(`Target element with ID "${targetId}" not found.`);
      }
      targetElement.innerHTML = template;

      // Populate the template fields
      const titleElement = targetElement.querySelector(".markdown-title");
      const contentElementLeft = targetElement.querySelector(
        ".markdown-contentLeft"
      );
      const contentElementRight = targetElement.querySelector(
        ".markdown-contentRight"
      );
      const imgElementLeft = targetElement.querySelector(".markdown-imgLeft");
      const imgElementRight = targetElement.querySelector(".markdown-imgRight");

      // Set the title
      if (titleElement) titleElement.textContent = markdownTitle;

      // Render Markdown to HTML using Marked.js
      const renderMarkdown = (markdown) =>
        typeof marked.parse === "function"
          ? marked.parse(markdown)
          : marked(markdown);

      if (contentElementLeft) {
        contentElementLeft.innerHTML = renderMarkdown(markdownLeft);
        const leftImage = contentElementLeft.querySelector("img");
        if (leftImage && imgElementLeft) {
          imgElementLeft.src = leftImage.src;
          imgElementLeft.style.display = "block";
          leftImage.remove();
        }
      }

      if (contentElementRight) {
        contentElementRight.innerHTML = renderMarkdown(markdownRight);
        const rightImage = contentElementRight.querySelector("img");
        if (rightImage && imgElementRight) {
          imgElementRight.src = rightImage.src;
          imgElementRight.style.display = "block";
          rightImage.remove();
        }
      }
    })
    .catch((error) =>
      console.error(`Error loading Markdown or template: ${error.message}`)
    );
}

(function ($) {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    fetch("./components/footer.html")
      .then((response) => response.text())
      .then((data) => {
        document.getElementById("footer-placeholder").innerHTML = data;
      });
    function loadHeader() {
      fetch("./components/header.html")
        .then((response) => response.text())
        .then((data) => {
          document.getElementById("navbar-placeholder").innerHTML = data;
          setActiveNavLink();
        });
    }

    function setActiveNavLink() {
      const path = window.location.pathname;
      const page = path.split("/").pop();
      const currentPage = page === "" ? "index.html" : page;
      const navLinks = document.querySelectorAll(
        ".navbar-nav .nav-link[data-page]"
      );
      navLinks.forEach((link) => {
        if (link.getAttribute("data-page") === currentPage) {
          link.classList.add("active");
        }
      });
    }

    loadHeader();
  });
  // Dropdown on mouse hover
  $(document).ready(function () {
    function toggleNavbarMethod() {
      if ($(window).width() > 992) {
        $(".navbar .dropdown")
          .on("mouseover", function () {
            $(".dropdown-toggle", this).trigger("click");
          })
          .on("mouseout", function () {
            $(".dropdown-toggle", this).trigger("click").blur();
          });
      } else {
        $(".navbar .dropdown").off("mouseover").off("mouseout");
      }
    }
    toggleNavbarMethod();
    $(window).resize(toggleNavbarMethod);
  });

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
    return false;
  });

  // Facts counter
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 2000,
  });

  // Date and time picker
  $("#date").datetimepicker({
    format: "L",
  });
  $("#time").datetimepicker({
    format: "LT",
  });

  // Service carousel
  $(".service-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 4500,
    autoplayHoverPause: true, // Pause on hover
    loop: true,
    responsive: {
      0: {
        items: 1,
      },
      576: {
        items: 2,
      },
      768: {
        items: 3,
      },
      992: {
        items: 4,
      },
      1200: {
        items: 5,
      },
    },
  });

  // Pricing carousel
  $(".pricing-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 1500,
    margin: 30,
    loop: true,
    dots: true,
    nav: false,
    responsive: {
      0: {
        items: 1,
      },
      576: {
        items: 1,
      },
      768: {
        items: 2,
      },
    },
  });

  // Testimonials carousel
  $(".testimonial-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 1500,
    margin: 30,
    dots: true,
    loop: true,
    items: 1,
  });
})(jQuery);
