// MENU HAMBURGUESA
const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");

menu.classList.remove("active");

menuBtn.addEventListener("click", e => {
  e.stopPropagation();
  menu.classList.toggle("active");
});

menu.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    menu.classList.remove("active");
  });
});


// CARGA DE PRODUCTOS DESDE JSON

const catalogo = document.getElementById("catalogo");

fetch("productos.json")
  .then(res => res.json())
  .then(productos => {
    productos.forEach(prod => {
      const producto = document.createElement("div");
      producto.className = "producto";
      producto.dataset.categoria = prod.categoria;
      producto.dataset.titulo = prod.titulo;
      producto.dataset.precio = prod.precio;
      producto.dataset.stock = prod.stock;
      producto.dataset.descripcion = prod.descripcion;
      producto.innerHTML = `
        <div class="carousel">
          <button class="prev">‹</button>
          <img src="${prod.imagenes[0]}" class="carousel-img fade">
          <button class="next">›</button>

          <div class="carousel-images">
            ${prod.imagenes.map(img => `<img src="${img}">`).join("")}
          </div>
        </div>

        <div class="info">
          <h2>${prod.titulo}</h2>
          <p class="precio">${prod.precio}</p>
          <p class="stock disponible">${prod.stock}</p>
        </div>
      `;

      catalogo.appendChild(producto);
    });

    iniciarCarruseles();
    activarFiltro();
    activarModal();
  });


// FILTRO POR CATEGORIA

function activarFiltro() {
  const productos = document.querySelectorAll(".producto");

  menu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const categoria = link.dataset.categoria;

      productos.forEach(prod => {
        prod.style.display =
          categoria === "todos" || prod.dataset.categoria === categoria
            ? "block"
            : "none";
      });
    });
  });
}


// CARRUSEL + SWIPE + FADE

function iniciarCarruseles() {
  document.querySelectorAll(".carousel").forEach(carousel => {
    const mainImg = carousel.querySelector(".carousel-img");
    const images = carousel.querySelectorAll(".carousel-images img");
    let index = 0;

    const showImage = i => {
      index = (i + images.length) % images.length;
      mainImg.classList.remove("fade");
      void mainImg.offsetWidth;
      mainImg.src = images[index].src;
      mainImg.classList.add("fade");
    };

    carousel.querySelector(".next").addEventListener("click", e => {
      e.stopPropagation();
      showImage(index + 1);
    });

    carousel.querySelector(".prev").addEventListener("click", e => {
      e.stopPropagation();
      showImage(index - 1);
    });

    // SWIPE MOBILE
    let startX = 0;

    carousel.addEventListener("touchstart", e => {
      startX = e.touches[0].clientX;
    });

    carousel.addEventListener("touchend", e => {
      const endX = e.changedTouches[0].clientX;
      const diff = startX - endX;

      if (Math.abs(diff) > 50) {
        diff > 0 ? showImage(index + 1) : showImage(index - 1);
      }
    });
  });
}


// MODAL PRODUCTO

function activarModal() {
  const modal = document.getElementById("modalProducto");
  const modalImg = document.getElementById("modalImg");
  const modalTitulo = document.getElementById("modalTitulo");
  const modalPrecio = document.getElementById("modalPrecio");
  const modalStock = document.getElementById("modalStock");
  const modalDesc = document.getElementById("modalDesc");
  const closeBtn = document.querySelector(".close");

  document.querySelectorAll(".producto").forEach(prod => {
    prod.addEventListener("click", e => {
      if (
        e.target.classList.contains("prev") ||
        e.target.classList.contains("next")
      ) return;

      modalImg.src = prod.querySelector(".carousel-img").src;
      modalTitulo.textContent = prod.dataset.titulo;
      modalPrecio.textContent = prod.dataset.precio;
      modalStock.textContent = prod.dataset.stock;
      modalDesc.textContent = prod.dataset.descripcion || "";

      modal.classList.add("active");
    });
  });

  closeBtn.addEventListener("click", () => {
    modal.classList.remove("active");
  });

  modal.addEventListener("click", e => {
    if (e.target === modal) {
      modal.classList.remove("active");
    }
  });
}
