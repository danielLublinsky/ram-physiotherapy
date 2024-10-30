function loadTextBlock(targetId, titles, description, imgSrc) {
  fetch("./components/text-block.html")
    .then((response) => response.text())
    .then((template) => {
      // Inject template into the target element
      const targetElement = document.getElementById(targetId);
      targetElement.innerHTML = template;

      // Populate template content dynamically within the specific target element
      targetElement.querySelector(".template-title-1").textContent = titles[0];
      targetElement.querySelector(".template-title-2").textContent = titles[1];
      targetElement.querySelector(".template-img").src = imgSrc;

      const descriptionElement = targetElement.querySelector(".template-description");
      const readMoreBtn = targetElement.querySelector(".read-more-btn");

      // Character limit for the short version of the description
      const charLimit = 1000;

      // Set the full description as data attribute
      descriptionElement.setAttribute("data-full-text", description);

      // If the description exceeds charLimit, show a shortened version and display "Read More" button
      if (description.length > charLimit) {
        descriptionElement.textContent = description.substring(0, charLimit) + "...";
        readMoreBtn.style.display = "inline-block";

        // Add click event for "Read More" button
        readMoreBtn.addEventListener("click", function () {
          // Toggle between showing full text and short text
          if (readMoreBtn.textContent === "קרא עוד") {
            descriptionElement.textContent = description;
            readMoreBtn.textContent = "קרא פחות";
          } else {
            descriptionElement.textContent = description.substring(0, charLimit) + "...";
            readMoreBtn.textContent = "קרא עוד";
          }
        });
      } else {
        // If the description is short, display it in full
        descriptionElement.textContent = description;
      }
    });
}


(function ($) {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    fetch("./components/footer.html")
      .then((response) => response.text())
      .then((data) => {
        document.getElementById("footer-placeholder").innerHTML = data;
      });
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
