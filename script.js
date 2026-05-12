let workouts = [
    200, 250, 300, 280, 320, 350, 400
];

const ctx = document.getElementById('loadChart');

const loadChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: workouts.map((_, index) => `Day ${index + 1}`),
        datasets: [{
            label: 'Training Load',
            data: workouts,
            borderColor: '#1d3557',
            backgroundColor: 'rgba(69,123,157,0.2)',
            fill: true,
            tension: 0.3
        }]
    },
    options: {
        responsive: true
    }
});

// CALCULATE AVERAGE
function average(arr) {
    if (arr.length === 0) return 0;

    let total = arr.reduce((a, b) => a + b, 0);
    return (total / arr.length).toFixed(1);
}

// UPDATE DASHBOARD
function updateDashboard() {

    let shortTerm = workouts.slice(-7);
    let longTerm = workouts.slice(-28);

    let shortAvg = average(shortTerm);
    let longAvg = average(longTerm);

    document.getElementById('shortAvg').innerText = shortAvg;
    document.getElementById('longAvg').innerText = longAvg;

    let ratio = shortAvg / longAvg;

    const circle = document.getElementById('statusCircle');
    const tipBox = document.getElementById('tipBox');

    // GREEN
    if (ratio < 1.1) {

        circle.className = 'status-circle green';
        circle.innerText = 'GREEN';

        tipBox.innerText =
            'You are recovering well and building strength safely.';
    }

    // YELLOW
    else if (ratio < 1.4) {

        circle.className = 'status-circle yellow';
        circle.innerText = 'YELLOW';

        tipBox.innerText =
            'You are pushing your limits. Make sure to rest and hydrate.';
    }

    // RED
    else {

        circle.className = 'status-circle red';
        circle.innerText = 'RED';

        tipBox.innerText =
            'High injury risk. Your training load is too high right now.';
    }

}

// ADD WORKOUT
function addWorkout() {

    let minutes = document.getElementById('minutes').value;
    let intensity = document.getElementById('intensity').value;

    if (minutes === '' || intensity === '') {
        alert('Please fill in both boxes.');
        return;
    }

    // LOAD FORMULA
    let load = minutes * intensity;

    workouts.push(load);

    // LIMIT TO 30 DAYS
    if (workouts.length > 30) {
        workouts.shift();
    }

    document.getElementById('todayLoad').innerText = load;

    // UPDATE CHART
    loadChart.data.labels = workouts.map((_, index) => `Day ${index + 1}`);

    loadChart.data.datasets[0].data = workouts;

    loadChart.update();

    // UPDATE SCORE
    updateDashboard();

    // CLEAR INPUTS
    document.getElementById('minutes').value = '';
    document.getElementById('intensity').value = '';

}

// INITIAL LOAD
updateDashboard();
