const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");
const links = menu.querySelectorAll("a");
const productos = document.querySelectorAll(".producto");

menuBtn.addEventListener("click", () => {
  menu.classList.toggle("active");
});

links.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const categoria = link.dataset.categoria;

    productos.forEach(producto => {
      if (categoria === "todos" || producto.dataset.categoria === categoria) {
        producto.style.display = "block";
      } else {
        producto.style.display = "none";
      }
    });

    menu.classList.remove("active");
  });
});

document.querySelectorAll(".carousel").forEach(carousel => {
  const mainImg = carousel.querySelector(".carousel-img");
  const images = carousel.querySelectorAll(".carousel-images img");
  let index = 0;

  const showImage = (i) => {
    index = (i + images.length) % images.length;
    mainImg.src = images[index].src;
  };

  carousel.querySelector(".next").addEventListener("click", () => {
    showImage(index + 1);
  });

  carousel.querySelector(".prev").addEventListener("click", () => {
    showImage(index - 1);
  });

  // 👉 SWIPE MOBILE
  let startX = 0;

  carousel.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
  });

  carousel.addEventListener("touchend", e => {
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        showImage(index + 1); // swipe izquierda
      } else {
        showImage(index - 1); // swipe derecha
      }
    }
  });
});

