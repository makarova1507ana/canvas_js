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
        deposits.push({ label: `Year ${year}`, y: amount });  // сохраняем сумму вклада на текущий год
        amount += amount * rate;  // добавляем процент к текущему вкладу
    }

    // Создаем график
    const chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        theme: "light2",
        title: {
            text: "Deposit Growth Over Years"
        },
        axisY: {
            title: "Deposit ($)",
            includeZero: true
        },
        data: [{
            type: "column",
            dataPoints: deposits  // используем массив deposits как источник данных
        }]
    });

    chart.render();  // отрисовка графика
}
