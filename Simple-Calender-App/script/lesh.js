  // Function to get the last day of the month
  function getLastDayOfMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
  }

  // Function to get the day of the week for the first day of the month
  function getFirstDayOfWeek(year, month) {
    return new Date(year, month, 1).getDay();
  }

  // Function to generate the calendar for a given month and year
  function generateCalendar(year, month) {
    const tableBody = document.querySelector('#calendar tbody');
    tableBody.innerHTML = '';

    const lastDay = getLastDayOfMonth(year, month);
    const firstDayOfWeek = getFirstDayOfWeek(year, month);

    let day = 1;

    // Loop through each row
    for (let i = 0; i < 6; i++) {
      const row = document.createElement('tr');

      // Loop through each day of the week
      for (let j = 0; j < 7; j++) {
        const cell = document.createElement('td');

        // Fill in the cells with the days of the month
        if ((i === 0 && j < firstDayOfWeek) || day > lastDay) {
          cell.textContent = '';
        } else {
          cell.textContent = day;
          day++;
        }

        row.appendChild(cell);
      }

      tableBody.appendChild(row);
    }
  }

  // Function to go to the previous month
  function prevMonth() {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    generateCalendar(currentYear, currentMonth);
  }

  // Function to go to the next month
  function nextMonth() {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    generateCalendar(currentYear, currentMonth);
  }

  // Get the current date
  const currentDate = new Date();
  let currentYear = currentDate.getFullYear();
  let currentMonth = currentDate.getMonth();

  // Generate the calendar for the current month
  generateCalendar(currentYear, currentMonth);