// AI WORKOUT RESPONSES DATABASE
const workoutResponses = {
    // WARMUP & RECOVERY
    warmup: "Always warm up before exercising! Spend 5-10 minutes doing light cardio or dynamic stretches. This increases your heart rate and prepares your muscles for intense work. 🔥",
    cooldown: "Don't skip cooldowns! Spend 5-10 minutes doing light stretches or walking. This helps lower your heart rate gradually and reduce muscle soreness.",
    recovery: "Recovery is when your muscles actually grow! Prioritize: sleep (7-9 hours), hydration, proper nutrition with protein, and active recovery days. Listen to your body! 😴",
    stretching: "Stretching improves flexibility and reduces soreness. Do static stretches after workouts (hold 20-30 seconds) and dynamic stretches before workouts.",
    
    // CARDIO
    cardio: "Cardio burns calories and builds endurance! Mix steady-state cardio (running, cycling) with HIIT workouts. Start with 20-30 minutes and gradually increase. 🏃",
    running: "Running is an excellent cardiovascular workout! Start slow to build endurance. Aim for 3-4 sessions per week with rest days. Focus on proper form to prevent injury.",
    hiit: "HIIT (High-Intensity Interval Training) is super effective! Alternate between intense bursts (30 sec) and rest (30 sec) for 15-20 minutes. Burns more calories in less time! ⚡",
    
    // STRENGTH
    strength: "Build strength with resistance training! Focus on compound movements (squats, deadlifts, bench press). Lift 3-4 times per week with adequate rest between sessions.",
    weights: "When lifting weights, prioritize form over weight! Start light, master the movement, then gradually increase. Rest 48 hours between working the same muscle groups.",
    squats: "Squats are the king of leg exercises! Keep your chest up, core tight, and knees aligned with your toes. Go down until thighs are parallel to the ground.",
    deadlifts: "Deadlifts build overall strength! Keep the bar close to your body and engage your core. Start light and focus on proper form. Your back should stay neutral.",
    
    // NUTRITION
    protein: "Protein is essential for muscle recovery! Aim for 0.7-1g per pound of body weight daily. Sources: chicken, fish, eggs, beans, Greek yogurt, and protein powder.",
    nutrition: "Nutrition fuels your workouts! Eat carbs for energy, protein for muscle repair, and healthy fats for hormones. Time meals 2-3 hours before intense exercise.",
    hydration: "Stay hydrated! Drink water throughout the day and during workouts. Aim for half your body weight (lbs) in ounces of water daily. More in hot weather!",
    
    // REST & SLEEP
    rest: "Rest days are crucial! Your muscles repair and grow during rest. Take 1-2 complete rest days per week. Active recovery like yoga or walking is fine.",
    sleep: "Sleep is where growth happens! Aim for 7-9 hours per night. Good sleep improves recovery, mood, and performance. Keep a consistent sleep schedule.",
    
    // MOTIVATION & GENERAL
    motivation: "You've got this! Remember: consistency beats intensity. Small progress over time leads to big results. Track your workouts and celebrate wins! 💪",
    form: "Proper form prevents injuries and maximizes results! Watch tutorials, use mirrors, start light, and consider working with a trainer for compound movements.",
    goal: "Set specific, measurable goals! Examples: 'Do 10 pullups', 'Deadlift 300lbs', 'Run a 5K in 30 min'. Break big goals into smaller milestones!",
    beginner: "Starting your fitness journey? Begin with 2-3 workouts per week, focus on consistency over intensity, and master basic movements before adding complexity.",
    female: "Females: strength training won't make you bulky! It builds lean muscle, boosts metabolism, and increases bone density. Train hard! 💪",
    muscle: "To build muscle: progressive overload (gradually increase weight), protein intake (0.7-1g per lb), and adequate rest (48 hrs between same muscle groups).",
    weight_loss: "To lose weight: combine strength training (builds metabolism) + cardio + nutrition (calorie deficit). Aim for 1-2 lbs per week. Be patient!",
    plateau: "Hit a plateau? Change your routine every 4-6 weeks! Try different exercises, rep ranges, tempo, or intensity. Your body adapts fast.",
    pain: "Never train through sharp pain! Soreness from workouts is normal, but pain is a warning sign. Rest, ice, or see a professional if needed.",
    default: "That's a great fitness question! Here's my advice: stay consistent, focus on form, eat enough protein, sleep well, and listen to your body. What specific aspect interests you? 🏋️"
};

// FUNCTION TO GET AI RESPONSE
function getAIResponse(userMessage) {
    const message = userMessage.toLowerCase();
    
    // Check for keyword matches
    const keywords = Object.keys(workoutResponses);
    for (let keyword of keywords) {
        if (message.includes(keyword)) {
            return workoutResponses[keyword];
        }
    }
    
    // If no keyword match, return default
    return workoutResponses.default;
}

// SEND MESSAGE FUNCTION
function sendMessage() {
    const input = document.getElementById('chatInput');
    const chatMessages = document.getElementById('chatMessages');
    const userMessage = input.value.trim();
    
    if (!userMessage) return;
    
    // Add user message to chat
    const userMsgDiv = document.createElement('div');
    userMsgDiv.className = 'message user-message';
    userMsgDiv.innerHTML = `<p>${userMessage}</p>`;
    chatMessages.appendChild(userMsgDiv);
    
    input.value = '';
    
    // Scroll to bottom
    setTimeout(() => {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 10);
    
    // Get AI response after a short delay (simulates thinking)
    setTimeout(() => {
        const aiResponse = getAIResponse(userMessage);
        const aiMsgDiv = document.createElement('div');
        aiMsgDiv.className = 'message ai-message';
        aiMsgDiv.innerHTML = `<p>${aiResponse}</p>`;
        chatMessages.appendChild(aiMsgDiv);
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 500);
}

function askQuestion(questionText) {
    document.getElementById('chatInput').value = questionText;
    sendMessage();
}

function toggleCoachPanel() {
    const panel = document.getElementById('aiCoachPanel');
    panel.classList.toggle('hidden');
}

function initializeChat() {
    const chatMessages = document.getElementById('chatMessages');
    const chatInput = document.getElementById('chatInput');

    if (chatMessages) {
        chatMessages.innerHTML = `<div class="message ai-message"><p>Hey! I'm your Workout AI Assistant. Ask me anything about training, exercise form, workout plans, recovery, or how to optimize your performance! 💪</p></div>`;
    }

    if (chatInput) {
        chatInput.value = '';
        chatInput.autocomplete = 'off';
    }
}

console.log('Welcome to LoadCheck');

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
initializeChat();
updateDashboard();
