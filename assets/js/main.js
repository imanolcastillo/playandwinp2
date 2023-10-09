/* Barra Navegación */
function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

/* Btn Arriba */
document.addEventListener("DOMContentLoaded", () => {

  const scrollToBottomButtom = document.getElementById('btn-ir-arriba');

  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      scrollToBottomButtom.style.display = 'block';
    } else {
      scrollToBottomButtom.style.display = 'none';
    }
  });

  scrollToBottomButtom.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
});





