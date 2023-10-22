// Obtiene el valor de un input y lo convierte a número.
function formatCurrency(number) {
    if (typeof number !== 'number') {
      throw new Error('El valor proporcionado no es un número.');
    }
  
    return number.toLocaleString('en-US', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
  
  // Formatea un número a 2 decimales
  function formatDecimal(number) {
    if (typeof number !== 'number') {
      throw new Error('El valor proporcionado no es un número.');
    }
  
    return number.toFixed(2);
  }
  
  // Formatea una fecha a dd/mm/yyyy
 
  function formatDate(date) {
    if (!(date instanceof Date)) {
      throw new Error('El valor proporcionado no es una instancia de Date.');
    }
  
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1;
    const year = date.getUTCFullYear();
  

    const formattedDay = String(day).padStart(2, '0');
    const formattedMonth = String(month).padStart(2, '0');
  
    return `${formattedDay}/${formattedMonth}/${year}`;
  }