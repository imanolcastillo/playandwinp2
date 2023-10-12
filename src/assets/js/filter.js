// Definimos la clase RealEstate
class Juegos {

    constructor(name, genre, platform, price, rating, image) {
      this.name = name;
      this.genre = genre;
      this.platform = platform;
      this.price = price;
      this.rating = rating;
      this.image = image;
    }
  
  }
  
  
  // Creamos objetos
  const game1 = new Juegos("The Sims 4", "Simulacion", "PC", 29.99, 4, "sims.jpg");
  const game2 = new Juegos("Apex Legends", "RPG", "PC", 0, 4, "apex-legends.jpg");
  const game3 = new Juegos("FIFA 24", "Deportes", "Xbox", 59.99, 5, "fc-24.jpeg");
  const game4 = new Juegos("Immortals of Aveum", "RPG", "PC", 19.99, 5, "immortals.jpg");
  
  
  // Almacenamos los objetos en un array
  const JuegosList = [game1, game2, game3, game4];
  
  
  // Accedemos datos por indices
  console.log('Impresion en consola de elementos accesados por indices: ');
  console.log(JuegosList[0]);
  console.log(JuegosList[1]);
  console.log(JuegosList[1]);
  
  
  // Accedemos datos con funcion forEach() de array
  console.log('Impresion en consola de elementos accesados con forEach(): ');
  JuegosList.forEach(item => {console.log(item)});
  
  //#endregion
  
  
  //#region TABLA (VIEW)
  // Funcion que controla el despliegue de un array de RealEstate en la tabla, asi como el mensaje a mostrar.
  function displayTable(juegos) {
  
    clearTable();
  
    showLoadingMessage();
  
    setTimeout(() => {
  
      if (juegos.length === 0) {
  
        showNotFoundMessage();
  
      } else {
  
          hideMessage();
  
          const tablaBody = document.getElementById('data-table-body');
  
          const imagePath = `../assets/img/juegos/`;
  
          juegos.forEach(juego => {
  
            const row = document.createElement('tr');
  
            row.innerHTML = `
              <td> <img src="${imagePath + juego.image}" alt="${juego.name}" width="100"> </td>
              <td>${juego.name}</td>
              <td>${juego.genre}</td>
              <td>${juego.platform}</td>
              <td>${juego.price}</td>
              <td>${juego.rating}</td>
            `;
  
            tablaBody.appendChild(row);
  
          });
  
      }
  
    }, 2000);
  
  }
  
  
  // Funcion que limpia la tabla
  function clearTable() {
    const tableBody = document.getElementById('data-table-body');
  
    tableBody.innerHTML = '';
  }
  
  
  // Funcion que muestra mensaje de carga
  function showLoadingMessage() {
    const message = document.getElementById('message');
  
    message.innerHTML = 'Cargando...';
  
    message.style.display = 'block';
  }
  
  
  // Funcion que muestra mensaje de que no se encuentraron datos
  function showNotFoundMessage() {
    const message = document.getElementById('message');
  
    message.innerHTML = 'No se encontraron casas con el filtro proporcionado.';
  
    message.style.display = 'block';
  }
  
  
  // Funcion que oculta mensaje
  function hideMessage() {
    const message = document.getElementById('message');
  
    message.style.display = 'none';
  }
  
  //#endregion
  
  
  //#region FILTROS (VIEW)
  
  
  // Funcion que inicializa los eventos de los botones del filto
  function initButtonsHandler() {
  
    document.getElementById('filter-form').addEventListener('submit', event => {
      event.preventDefault();
      applyFilters();
    });
  
    document.getElementById('reset-filters').addEventListener('click', () => {
      document.querySelectorAll('input.filter-field').forEach(input => input.value = '');
      applyFilters();
    });
  
  }
  
  
  // Funcion que gestiona la aplicacion del filtro a los datos y su despliegue.
  function applyFilters() {
    const filterText = document.getElementById('text').value.toLowerCase();
    const filtergenre = document.getElementById('genre').value.toLowerCase();
    const filterplatform = document.getElementById('platform').value.toLowerCase();
    const filterrating = parseFloat(document.getElementById('rating').value);
    const filterMinPrice = parseFloat(document.getElementById('price-min').value);
    const filterMaxPrice = parseFloat(document.getElementById('price-max').value);
  
    const filteredGames = filterGames(JuegosList, filterText,filtergenre,filterplatform, filterrating, filterMinPrice, filterMaxPrice);
  
    displayTable(filteredGames);
  }
  
  
  // Funcion con la logica para filtrar
  function filterGames(juegos, text, genre, platform, rating, minPrice, maxPrice) {
  
    return juegos.filter( juego =>
        (!rating || juego.rating === rating) &&
        (!minPrice || juego.price >= minPrice) &&
        (!maxPrice || juego.price <= maxPrice) &&
        (!genre    || juego.genre.toLowerCase().includes(genre)) &&
        (!platform || juego.platform.toLowerCase().includes(platform)) &&
        (!text     || juego.name.toLowerCase().includes(text) || juego.genre.toLowerCase().includes(text))
      );
  }
  
  //#endregion
  
  
  //#region INICIALIZAMOS FUNCIONALIDAD (CONTROLLER)
  
  displayTable(JuegosList);
  
  initButtonsHandler();
  
  //#endregion