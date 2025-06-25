
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

  function updateCartDisplay() {
    const cartContainer = document.getElementById("cart-items");
    const checkoutTotalElem = document.getElementById("checkout-total-price");
    const floatingTotalElem = document.getElementById("floating-total-price");

    if (!cartContainer) return;

    cartContainer.innerHTML = "";

    if (cart.length === 0) {
      cartContainer.innerHTML = "<p>Your cart is empty.</p>";
      if (checkoutTotalElem) checkoutTotalElem.textContent = "0.00";
      if (floatingTotalElem) floatingTotalElem.textContent = "0.00";
      updateCartCount();
      return;
    }

    let total = 0;

    cart.forEach((item, index) => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;

      const cartItem = document.createElement("div");
      cartItem.className = "cart-item";
      cartItem.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="cart-item__image">
        <div class="cart-item__details">
          <div class="cart-item__name">${item.name}</div>
          <div class="cart-item__unit-price">Unit Price: ₹${item.price.toFixed(2)}</div>
          <div class="cart-item__quantity">
            Quantity:
            <button class="quantity-btn increase-qty" data-index="${index}">+</button>
            ${item.quantity}
            <button class="quantity-btn decrease-qty" data-index="${index}">-</button>
            <button class="remove-btn remove-item" data-index="${index}">&times;</button>
          </div>
          <div class="cart-item__total-price">Total: ₹${itemTotal.toFixed(2)}</div>
        </div>
      `;
      cartContainer.appendChild(cartItem);
    });

    if (checkoutTotalElem) checkoutTotalElem.textContent = total.toFixed(2);
    if (floatingTotalElem) floatingTotalElem.textContent = total.toFixed(2);
    updateCartCount();
    bindCartEvents();
  }

  function bindCartEvents() {
    document.querySelectorAll(".increase-qty").forEach(btn => {
      btn.addEventListener("click", function () {
        const index = this.dataset.index;
        cart[index].quantity += 1;
        saveCart();
        updateCartDisplay();
      });
    });

    document.querySelectorAll(".decrease-qty").forEach(btn => {
      btn.addEventListener("click", function () {
        const index = this.dataset.index;
        if (cart[index].quantity > 1) {
          cart[index].quantity -= 1;
        } else {
          cart.splice(index, 1);
        }
        saveCart();
        updateCartDisplay();
      });
    });

    document.querySelectorAll(".remove-item").forEach(btn => {
      btn.addEventListener("click", function () {
        const index = this.dataset.index;
        cart.splice(index, 1);
        saveCart();
        updateCartDisplay();
      });
    });
  }


  document.addEventListener("DOMContentLoaded", function() {
  const video = document.querySelector("video.hero-video");
  const source = video.querySelector("source");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          source.src = source.dataset.src;
          video.load();
          observer.unobserve(video);
        }
      });
    });

    observer.observe(video);
  } else {
    // Fallback for browsers that do not support IntersectionObserver
    source.src = source.dataset.src;
    video.load();
  }
});


  const hamburger = document.getElementById("hamburger");
  const navLinks = document.querySelector(".nav-links");
  if (hamburger && navLinks) {
    hamburger.addEventListener("click", function () {
      navLinks.classList.toggle("show");
      document.body.classList.toggle("menu-open");
      this.classList.toggle("active");
    });
  }

  const track = document.querySelector(".carousel-track");
  if (track) {
    const slides = document.querySelectorAll(".product-card-modern");
    let currentIndex = 0;
    const totalSlides = slides.length;
    function updateCarousel() {
      if (slides.length === 0) return;
      const slideWidth = slides[0].getBoundingClientRect().width;
      track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    }
    const nextBtn = document.querySelector(".next-btn");
    const prevBtn = document.querySelector(".prev-btn");
    if (nextBtn) {
      nextBtn.addEventListener("click", function () {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateCarousel();
      });
    }
    if (prevBtn) {
      prevBtn.addEventListener("click", function () {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateCarousel();
      });
    }
    setInterval(function () {
      currentIndex = (currentIndex + 1) % totalSlides;
      updateCarousel();
    }, 5000);
    window.addEventListener("resize", updateCarousel);
  }

  const thumbnails = document.querySelectorAll(".thumbnail");
  if (thumbnails.length > 0) {
    thumbnails.forEach(thumb => {
      thumb.addEventListener("click", function () {
        thumbnails.forEach(t => t.classList.remove("active"));
        this.classList.add("active");
        const newSrc = this.getAttribute("data-src");
        const gallery = this.closest(".product-gallery");
        if (gallery) {
          const mainImg = gallery.querySelector(".main-image img");
          if (newSrc && mainImg) {
            mainImg.src = newSrc;
          }
        }
      });
    });
  }

  const productCards = document.querySelectorAll(".product-detail");
  if (productCards.length > 0) {
    productCards.forEach(card => {
      const decreaseBtn = card.querySelector(".quantity-selector .decrease");
      const increaseBtn = card.querySelector(".quantity-selector .increase");
      const quantityInput = card.querySelector(".quantity-selector input");
      if (decreaseBtn && increaseBtn && quantityInput) {
        decreaseBtn.addEventListener("click", function (e) {
          e.stopPropagation();
          let currentVal = parseInt(quantityInput.value, 10) || 1;
          if (currentVal > 1) {
            quantityInput.value = currentVal - 1;
          }
        });
        increaseBtn.addEventListener("click", function (e) {
          e.stopPropagation();
          let currentVal = parseInt(quantityInput.value, 10) || 1;
          quantityInput.value = currentVal + 1;
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

        const existingProductIndex = cart.findIndex(item => item.id === productId);
        if (existingProductIndex !== -1) {
          cart[existingProductIndex].quantity += 1;
        } else {
          const product = {
            id: productId,
            name: productName,
            price: productPrice,
            image: productImage,
            quantity: 1
          };
          cart.push(product);
        }
        saveCart();
        updateCartCount();
        updateCartDisplay();
      });
    });
  }

  updateCartDisplay(); // initial render
});
