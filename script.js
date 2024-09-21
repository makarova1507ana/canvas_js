function drawChart() {
    // Получаем значения с формы
    const initialDeposit = parseFloat(document.getElementById('initialDeposit').value);
    const rate = parseFloat(document.getElementById('rate').value) / 100;
    const years = parseInt(document.getElementById('years').value);

    // Проверка, что все значения корректны (не пусты, не равны нулю и больше нуля)
    if (isNaN(initialDeposit) || isNaN(rate) || isNaN(years) || initialDeposit <= 0 || rate <= 0 || years <= 0) {
        alert('Please enter valid values.');
        return;
    }

    // Рассчитываем данные для построения графика
    let deposits = [];
    let amount = initialDeposit;

    // Рассчитываем сумму вклада на каждый год
    for (let year = 0; year <= years; year++) {
        deposits.push(amount);  // сохраняем сумму вклада на текущий год
        amount += amount * rate;  // добавляем процент к текущему вкладу
    }

    // Очищаем холст перед отрисовкой нового графика
    const canvas = document.getElementById('depositChart');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Настройка параметров для графика
    const padding = 40;
    const graphWidth = canvas.width - padding * 2;
    const graphHeight = canvas.height - padding * 2;
    const maxAmount = Math.max(...deposits);  // находим максимальное значение вклада для масштабирования графика

    // Отрисовка осей
    ctx.beginPath();
    ctx.moveTo(padding, padding);  // верхняя точка оси Y
    ctx.lineTo(padding, canvas.height - padding);  // линия оси Y
    ctx.lineTo(canvas.width - padding, canvas.height - padding);  // линия оси X
    ctx.stroke();

    // Отрисовка графика
    ctx.beginPath();
    ctx.moveTo(padding, canvas.height - padding);  // начальная точка графика

    for (let year = 0; year <= years; year++) {
        const x = padding + (year / years) * graphWidth;  // расчет X координаты
        const y = canvas.height - padding - (deposits[year] / maxAmount) * graphHeight;  // расчет Y координаты
        ctx.lineTo(x, y);  // проводим линию до следующей точки
    }

    ctx.strokeStyle = 'blue';  // цвет линии графика
    ctx.lineWidth = 2;  // толщина линии
    ctx.stroke();  // рисуем линию

    // Подпись осей
    ctx.fillText('Years', canvas.width / 2, canvas.height - 10);  // подпись оси X
    ctx.save();  // сохраняем текущие координаты
    ctx.translate(10, canvas.height / 2);  // перемещаемся для подписи оси Y
    ctx.rotate(-Math.PI / 2);  // вращаем текст для оси Y
    ctx.fillText('Deposit ($)', 0, 0);  // подпись оси Y
    ctx.restore();  // восстанавливаем исходные координаты

    // Подписи значений на графике
    for (let year = 0; year <= years; year++) {
        const x = padding + (year / years) * graphWidth;
        const y = canvas.height - padding - (deposits[year] / maxAmount) * graphHeight;
        ctx.fillText(year, x - 5, canvas.height - padding + 15);  // подпись года
        ctx.fillText(deposits[year].toFixed(2), padding - 35, y + 5);  // подпись суммы вклада
    }
}
