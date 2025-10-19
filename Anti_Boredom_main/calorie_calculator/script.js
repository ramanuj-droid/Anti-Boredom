
const activities = {
    sleep: { rate: 0.95, type: "Sleeping" },
    walk: { rate: 4, type: "Walking" },
    workout: { rate: 8, type: "Workout" }
};

const sleep = document.getElementById("sleep");
const walk = document.getElementById("walk");
const workout = document.getElementById("workout");

const sleepVal = document.getElementById("sleepValue");
const walkVal = document.getElementById("walkValue");
const workoutVal = document.getElementById("workoutValue");

const totalCalories = document.getElementById("totalCalories");
const breakdown = document.getElementById("breakdown");

const toggleBtn = document.getElementById("modeToggle");
const body = document.body;

// Calculate and update calorie values
function update() {
    sleepVal.textContent = sleep.value;
    walkVal.textContent = walk.value;
    workoutVal.textContent = workout.value;

    const sleepCal = sleep.value * activities.sleep.rate * 60 / 60;
    const walkCal = walk.value * activities.walk.rate;
    const workoutCal = workout.value * activities.workout.rate;

    const total = (sleepCal + walkCal + workoutCal).toFixed(1);

    totalCalories.textContent = total;
    breakdown.innerHTML = `
    🛌 ${activities.sleep.type}: ${sleepCal.toFixed(1)} kcal<br>
    🚶‍♂️ ${activities.walk.type}: ${walkCal.toFixed(1)} kcal<br>
    💪 ${activities.workout.type}: ${workoutCal.toFixed(1)} kcal
    `;
}

// Toggle between dark and light mode
toggleBtn.addEventListener("click", () => {
    body.classList.toggle("light");
    toggleBtn.textContent = body.classList.contains("light")
    ? "🌞 Light Mode"
    : "🌙 Dark Mode";
});

[sleep, walk, workout].forEach(input => input.addEventListener("input", update));
update();
