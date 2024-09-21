function drawChart() {
    // Получаем значения с формы
    const initialDeposit = parseFloat(document.getElementById('initialDeposit').value);
    const rate = parseFloat(document.getElementById('rate').value) / 100;
    const years = parseInt(document.getElementById('years').value);

    // Проверка, что все значения корректны
    if (isNaN(initialDeposit) || isNaN(rate) || isNaN(years) || initialDeposit <= 0 || rate <= 0 || years <= 0) {
        alert('Please enter valid values.');
        return;
    }

    // Рассчитываем данные для построения графика
    let deposits = [];
    let amount = initialDeposit;

    for (let year = 0; year <= years; year++) {
        deposits.push(amount);  // сохраняем сумму вклада на текущий год
        amount += amount * rate;  // добавляем процент к текущему вкладу
    }

    // Удаляем старый график, если он есть
    const ctx = document.getElementById('depositChart').getContext('2d');
    if (window.barChart) {
        window.barChart.destroy();
    }

    // Создаем новый график
    window.barChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Array.from({length: years + 1}, (_, i) => `Year ${i}`),  // метки по оси X
            datasets: [{
                label: 'Deposit Growth ($)',
                data: deposits,
                backgroundColor: 'rgba(75, 192, 192, 0.5)',  // цвет столбцов
                borderColor: 'rgba(75, 192, 192, 1)',  // цвет границы столбцов
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true  // начало Y-оси с нуля
                }
            }
        }
    });
}
