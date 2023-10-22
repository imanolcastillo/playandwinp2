// DATOS
class Venta {
    constructor(id, nombre, genero, plataforma, vendedor, fecha, precio, detalle) {
      this.id = id; 
      this.nombre = nombre; 
      this.genero = genero;  
      this.plataforma = plataforma;
      this.vendedor = vendedor;
      this.fecha = fecha; 
      this.precio = precio;
      this.detalle = detalle;
    }
  }
  
  function mapAPIToSales(data) {
    return data.map(item => {
      return new Venta(
        item.id,
        item.nombre,
        item.genero,
        item.plataforma,
        item.vendedor,
        new Date(item.fecha),
        item.precio,
        item.detalle
      );
    });
  }

  class Juego {
  
    constructor(id, nombre, precio) {
      this.id = id;
      this.nombre = nombre;
      this.precio = precio;
    }
  
  }
  
  function displaySalesView(ventas) {
  
    clearTable();
  
    showLoadingMessage();
    console.log(ventas.length);
  
    if (ventas.length === 0) {
  
      showNotFoundMessage();
  
    } else {
  
      hideMessage();
  
      displaySalesTable(ventas);
    }
  
  }
  
  
  function displayClearSalesView() {
    clearTable();
  
    showInitialMessage();
  }

// Agrega todos los elementos de la tabla de ventas.
  function displaySalesTable(ventas) {
  
    const tablaBody = document.getElementById('data-table-body');
  
    ventas.forEach(venta => {
  
      const row = document.createElement('tr');
  
      row.innerHTML = `
        <td>${venta.id}</td>
        <td>${venta.nombre}</td>
        <td>${venta.genero}</td>
        <td>${venta.plataforma}</td>
        <td>${venta.vendedor}</td>
        <td>${formatDate(venta.fecha)}</td>
        <td class="text-right">${formatCurrency(venta.precio)}</td>
        <td>${venta.detalle}</td>
        <td>
          <button class="btn-delete fa-solid fa-trash" data-sale-id="${venta.id}">Eliminar</button>
        </td>
      `;
  
      tablaBody.appendChild(row);
  
    });
  
    initDeleteSaleButtonHandler();
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
  
  
  // Funcion que muestra mensaje de carga
  function showInitialMessage() {
    const message = document.getElementById('message');
  
    message.innerHTML = 'No se ha realizado una consulta de ventas.';
  
    message.style.display = 'block';
  }
  
  
  // Funcion que muestra mensaje de que no se encuentraron datos
  function showNotFoundMessage() {
    const message = document.getElementById('message');
  
    message.innerHTML = 'No se encontraron juegos en venta.';
  
    message.style.display = 'block';
  }
  
  
  // Funcion que oculta mensaje
  function hideMessage() {
    const message = document.getElementById('message');
  
    message.style.display = 'none';
  }
  
  //FILTROS (VIEW)
  
  function initFilterButtonsHandler() {
  
    document.getElementById('filter-form').addEventListener('submit', event => {
      event.preventDefault();
      searchSales();
    });
  
    document.getElementById('reset-filters').addEventListener('click', () => clearSales());
  
  }
  
  
  function clearSales() {
    document.querySelector('select.filter-field').selectedIndex = 0;
    document.querySelectorAll('input.filter-field').forEach(input => input.value = '');
  
    displayClearSalesView();
  }
  
  
  function resetSales() {
    document.querySelector('select.filter-field').selectedIndex = 0;
    document.querySelectorAll('input.filter-field').forEach(input => input.value = '');
    searchSales();
  }
  
  
  function searchSales() {
    const nombre = document.getElementById('juego-filtro').value;
    const vendedor = document.getElementById('vendedor-filtro').value;
    const fecha = document.getElementById('fecha-filtro').value;
  
    getSalesData(nombre, vendedor, fecha);
  }
  
  // Boton Agregar y Eliminar (VIEW)
  
  function initAddSaleButtonsHandler() {
  
    document.getElementById('addSale').addEventListener('click', () => {
      openAddSaleModal()
    });
  
    document.getElementById('modal-background').addEventListener('click', () => {
      closeAddSaleModal();
    });
  
    document.getElementById('sale-form').addEventListener('submit', event => {
      event.preventDefault();
      processSubmitSale();
    });
  
  }
  
  
  function openAddSaleModal() {
    document.getElementById('sale-form').reset();
    document.getElementById('modal-background').style.display = 'block';
    document.getElementById('modal').style.display = 'block';
  }
  
  
  function closeAddSaleModal() {
    document.getElementById('sale-form').reset();
    document.getElementById('modal-background').style.display = 'none';
    document.getElementById('modal').style.display = 'none';
  }
  
  
  function processSubmitSale() {
    const nombre = document.getElementById('juego').value;
    const genero = document.getElementById('genero').value;
    const plataforma = document.getElementById('plataforma').value;
    const vendedor = document.getElementById('vendedor').value;
    const fecha = document.getElementById('fecha').value;
    const precio = document.getElementById('precio').value;
    const detalle = document.getElementById('detalle').value;
  
    const saleToSave = new Venta(
      null,
      nombre,
      genero,
      plataforma,
      vendedor,
      fecha,
      parseFloat(precio),
      detalle
    );
  
    createSale(saleToSave);
  }
  
  
  function initDeleteSaleButtonHandler() {
  
    document.querySelectorAll('.btn-delete').forEach(button => {
  
      button.addEventListener('click', () => {
  
        const saleId = button.getAttribute('data-sale-id');
        deleteSale(saleId);
  
      });
  
    });
  
  }

  // API (MODEL)
  function getSalesData(nombre, vendedor, fecha) {
  
    const url = buildGetSalesDataUrl(nombre, vendedor, fecha);
    console.log(url);

    fetchAPI(url, 'GET')
      .then(data => {
        const salesList = mapAPIToSales(data);
        displaySalesView(salesList);
      });
  }
  
  
  function createSale(venta) {
  
    fetchAPI(`${apiURL}/venta`, 'POST', venta)
      .then(venta => {
        closeAddSaleModal();
        resetSales();
        window.alert(`Venta ${venta.id} creada correctamente.`);
      });
  
  }
  
  
  function deleteSale(saleId) {
  
    const confirm = window.confirm(`¿Estás seguro de que deseas eliminar la venta ${saleId}?`);
  
    if (confirm) {
  
      fetchAPI(`${apiURL}/venta/${saleId}`, 'DELETE')
        .then(() => {
          resetSales();
          window.alert("Venta eliminada.");
        });
  
    }
  }
  
  function buildGetSalesDataUrl(nombre, vendedor, fecha) {

    const url = new URL(`${apiURL}/venta`);
    console.log(apiURL);

    if (nombre) {
      url.searchParams.append('nombre', nombre);
    }
  
    if (vendedor) {
      url.searchParams.append('vendedor', vendedor);
    }
  
    if (fecha) {
      url.searchParams.append('fecha', fecha);
    }
  
    return url;
  }

  // Inicializacion

  initAddSaleButtonsHandler();
  
  initFilterButtonsHandler();

  getSalesData();
