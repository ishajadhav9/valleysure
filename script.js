window.addEventListener("DOMContentLoaded", () => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  function updateCartCount() {
    const cartCountElem = document.getElementById("cart-count");
    if (cartCountElem) {
      const count = cart.reduce((acc, item) => acc + item.quantity, 0);
      cartCountElem.textContent = count > 0 ? count : "";
    }
  }

  function showToast(message) {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;
    Object.assign(toast.style, {
      position: "fixed",
      top: "1rem",
      right: "1rem",
      background: "#ff6f61",
      color: "white",
      padding: "1rem 1.5rem",
      borderRadius: "12px",
      zIndex: "1000",
      boxShadow: "0 6px 18px rgba(0, 0, 0, 0.1)",
      transition: "opacity 0.3s ease",
          opacity: "1"
    });
    document.body.appendChild(toast);
    // Wait 3 seconds, then fade out
  setTimeout(() => {
    toast.style.opacity = "0";
    // Remove the toast after the fade-out transition completes (300ms)
    setTimeout(() => toast.remove(), 300);
  }, 3000);
  }




    button.addEventListener('click', () => {
      const answer = button.nextElementSibling;
      const isExpanded = answer.classList.contains('show');

      // Close all other answers
      document.querySelectorAll('.faq-answer').forEach(ans => ans.classList.remove('show'));
      document.querySelectorAll('.faq-question').forEach(btn => btn.classList.remove('active'));

      // Toggle current
      if (!isExpanded) {
        answer.classList.add('show');
        button.classList.add('active');
      }
    });




  /************************************
   * PRODUCT CAROUSEL FUNCTIONALITY
   ************************************/
  const track = document.querySelector(".carousel-track");
  if (track) {
    const slides = document.querySelectorAll(".product-card-modern");
    let currentIndex = 0;
    const totalSlides = slides.length;

    function updateCarousel() {
      const slideWidth = slides[0]?.getBoundingClientRect().width || 0;
      track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    }

    document.querySelector(".next-btn")?.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % totalSlides;
      updateCarousel();
    });

    document.querySelector(".prev-btn")?.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
      updateCarousel();
    });

    setInterval(() => {
      currentIndex = (currentIndex + 1) % totalSlides;
      updateCarousel();
    }, 5000);

    window.addEventListener("resize", updateCarousel);
  }

  /************************************
   * THUMBNAIL SWITCHING FOR PRODUCT GALLERY
   ************************************/
  const thumbnails = document.querySelectorAll(".thumbnail");
  thumbnails.forEach(thumb => {
    thumb.addEventListener("click", function () {
      thumbnails.forEach(t => t.classList.remove("active"));
      this.classList.add("active");
      const newSrc = this.getAttribute("data-src");
      const gallery = this.closest(".product-gallery");
      const mainImg = gallery?.querySelector(".main-image img");
      if (newSrc && mainImg) mainImg.src = newSrc;
    });
  });

  /************************************
   * PRODUCT PAGE FUNCTIONALITY
   ************************************/
  const productCards = document.querySelectorAll(".product-detail");
  productCards.forEach(card => {
    const decreaseBtn = card.querySelector(".quantity-selector .decrease");
    const increaseBtn = card.querySelector(".quantity-selector .increase");
    const quantityInput = card.querySelector(".quantity-selector input");

    if (decreaseBtn && increaseBtn && quantityInput) {
      decreaseBtn.addEventListener("click", e => {
        e.stopPropagation();
        let val = parseInt(quantityInput.value, 10) || 1;
        if (val > 1) quantityInput.value = val - 1;
      });

      increaseBtn.addEventListener("click", e => {
        e.stopPropagation();
        let val = parseInt(quantityInput.value, 10) || 1;
        quantityInput.value = val + 1;
      });
    }
  });

  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  addToCartButtons.forEach(button => {
    button.addEventListener("click", function () {
      const productId = parseInt(this.dataset.id);
      const productName = this.dataset.name;
      const productPrice = parseFloat(this.dataset.price);
      const productImage = this.dataset.image;
      const quantityInput = this.closest(".product-detail")?.querySelector(".quantity-selector input");
      const quantity = parseInt(quantityInput?.value) || 1;

      const existingProductIndex = cart.findIndex(item => item.id === productId);
      if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity += quantity;
      } else {
        cart.push({
          id: productId,
          name: productName,
          price: productPrice,
          image: productImage,
          quantity: quantity
        });
      }

      saveCart();
      updateCartCount();
      showToast(`${productName} added to cart`);
    });
  });




  /************************************
 * FAQ TOGGLE FUNCTIONALITY
 ************************************/
const faqButtons = document.querySelectorAll('.faq-question');

faqButtons.forEach(button => {
  button.addEventListener('click', () => {
    const answer = button.nextElementSibling;
    const isExpanded = answer.classList.contains('show');

    // Close all answers
    document.querySelectorAll('.faq-answer').forEach(a => a.classList.remove('show'));
    document.querySelectorAll('.faq-question').forEach(q => q.classList.remove('active'));

    // Toggle current
    if (!isExpanded) {
      answer.classList.add('show');
      button.classList.add('active');
    }
  });
});

  
  /************************************
   * TAB FUNCTIONALITY
   ************************************/
  const tabs = document.querySelectorAll(".tabs .tab");
  const tabPanels = document.querySelectorAll(".tab-panel");

  tabs.forEach(tab => {
    tab.addEventListener("click", function () {
      const target = this.getAttribute("data-tab");
      tabs.forEach(t => t.classList.remove("active"));
      tabPanels.forEach(panel => panel.classList.remove("active"));
      this.classList.add("active");
      document.getElementById(target)?.classList.add("active");
    });
  });

  updateCartCount();
});
