function loadServiceCategory(targetId, categoryTitle, subServices) {
  fetch("./components/service-category.html")
    .then((response) => response.text())
    .then((template) => {
      // Inject template into the target element
      const targetElement = document.getElementById(targetId);
      targetElement.innerHTML = template;

      // Set the category title inside the span
      const categoryTitleSpan = targetElement.querySelector(
        ".category-title span"
      );
      categoryTitleSpan.textContent = categoryTitle;

      const subServicesContainer = targetElement.querySelector(".sub-services");

      // For each sub-service, create and append its element
      subServices.forEach((subService, index) => {
        // Create sub-service container
        const subServiceElement = document.createElement("div");
        subServiceElement.classList.add("sub-service", "mb-4", "text-right");
        subServiceElement.setAttribute("dir", "rtl");

        // Create a container for the icon and title
        const titleContainer = document.createElement("div");
        titleContainer.classList.add("d-flex", "align-items-center");

        // Add the icon
        const iconElement = document.createElement("i");
        iconElement.classList.add("far", "fa-circle", "px-2", "pb-2");
        titleContainer.appendChild(iconElement);

        // Add sub-service title
        const subServiceTitle = document.createElement("h4");
        subServiceTitle.classList.add("sub-service-title", "mb-2");
        subServiceTitle.textContent = subService.title;
        titleContainer.appendChild(subServiceTitle);

        // Append the title container to the sub-service element
        subServiceElement.appendChild(titleContainer);

        // Add sub-service description
        const subServiceDescription = document.createElement("p");
        subServiceDescription.classList.add("sub-service-description");
        subServiceDescription.textContent = subService.description;
        subServiceElement.appendChild(subServiceDescription);

        // Optionally add a separator between sub-services
        if (index < subServices.length - 1) {
          const separator = document.createElement("hr");
          subServiceElement.appendChild(separator);
        }

        // Append sub-service element to container
        subServicesContainer.appendChild(subServiceElement);
      });
    });
}
function loadTextBlock(
  targetId,
  titles,
  description,
  imgSrc,
  showButton,
  description2
) {
  fetch("./components/text-block.html")
    .then((response) => response.text())
    .then((template) => {
      // Inject template into the target element
      const targetElement = document.getElementById(targetId);
      targetElement.innerHTML = template;

      // Populate template content dynamically within the specific target element
      targetElement.querySelector(".template-title-1").textContent = titles[0];
      targetElement.querySelector(".template-title-2").textContent = titles[1];
      const imgElement = targetElement.querySelector(".template-img");
      const description2Element = targetElement.querySelector(
        ".template-description-2"
      );

      if (imgSrc) {
        // Display image if imgSrc is provided
        imgElement.src = imgSrc;
        imgElement.style.display = "block";
      } else if (description2) {
        // Display description2 if imgSrc is not provided
        description2Element.textContent = description2;
        description2Element.style.display = "block";
      }

      const descriptionElement = targetElement.querySelector(
        ".template-description"
      );
      const readMoreBtn = targetElement.querySelector(".read-more-btn");

      // Character limit for the short version of the description
      const charLimit = 1000;

      // Set the full description as data attribute
      descriptionElement.setAttribute("data-full-text", description);

      // If the description exceeds charLimit, show a shortened version and display "Read More" button
      if (description.length > charLimit && showButton) {
        descriptionElement.textContent =
          description.substring(0, charLimit) + "...";
        readMoreBtn.style.display = "inline-block";

        // Add click event for "Read More" button
        readMoreBtn.addEventListener("click", function () {
          // Toggle between showing full text and short text
          if (readMoreBtn.textContent === "קרא עוד") {
            descriptionElement.textContent = description;
            readMoreBtn.textContent = "קרא פחות";
          } else {
            descriptionElement.textContent =
              description.substring(0, charLimit) + "...";
            readMoreBtn.textContent = "קרא עוד";
          }
        });
      } else {
        // If the description is short, display it in full
        descriptionElement.textContent = description;
      }
    });
}
function loadMarkdownTextBlock(targetId, markdownTitle, fileName, templatePath) {
  const markdownPath = `./txt/${fileName}`; // Construct the file path based on title

  // Fetch the template and markdown content
  Promise.all([fetch(templatePath).then((res) => res.text()), fetch(markdownPath).then((res) => res.text())])
    .then(([template, markdown]) => {
      // Inject template into the target element
      const targetElement = document.getElementById(targetId);
      targetElement.innerHTML = template;

      // Populate the template fields
      const titleElement = targetElement.querySelector(".markdown-title");
      const contentElement = targetElement.querySelector(".markdown-content");
      const imgElement = targetElement.querySelector(".markdown-img");

      // Set the title
      titleElement.textContent = markdownTitle;

      // Use Marked.js to render Markdown into HTML
      const htmlContent =
        typeof marked.parse === "function" ? marked.parse(markdown) : marked(markdown);
      contentElement.innerHTML = htmlContent;

      // Check for an image in the rendered content
      const firstImage = contentElement.querySelector("img");
      if (firstImage) {
        imgElement.src = firstImage.src;
        imgElement.style.display = "block";
        firstImage.remove(); // Remove the image from the content area
      }
    })
    .catch((error) => console.error(`Error loading Markdown or template: ${error}`));
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
