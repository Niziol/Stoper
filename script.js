const startBtn = document.querySelector('.start');
const pauseBtn = document.querySelector('.pause');
const stopBtn = document.querySelector('.stop');
const resetBtn = document.querySelector('.reset');
const archiveBtn = document.querySelector('.archive');
const stopwatch = document.querySelector('.stopwatch');
const time = document.querySelector('.time');
const timeList = document.querySelector('.time-list');
const closeModalBtn = document.querySelector('.close');
const modalShadow = document.querySelector('.modal-shadow');
const infoBtn = document.querySelector('.fa-question');
const brushBtn = document.querySelector('.fa-brush');
const colors = document.querySelector('.colors');
const redColorBtn = document.querySelector('.color-red');
const greenColorBtn = document.querySelector('.color-green');
const blueColorBtn = document.querySelector('.color-blue');

const redRGBColor = 'rgb(250, 20, 0)';
const greenRGBColor = 'rgb(0, 250, 20)';
const blueRGBColor = 'rgb(0, 150, 250)';

let countTime = 0;
let minutes = 0;
let seconds = 0;

let timesArr = [];

const handleStart = () => {
	clearInterval(countTime);
	countTime = setInterval(() => {
		seconds++;
		setTime(stopwatch);
	}, 1000);
};

const setTime = (input) => {
	if (seconds > 59) {
		minutes++;
		seconds = 0;
	}

	let text = minutes + ':';
	if (seconds < 10) {
		text += '0' + seconds;
	} else {
		text += seconds;
	}

	input.textContent = text;
};

const handlePause = () => {
	clearInterval(countTime);
};

const handleStop = () => {
	time.textContent = `Ostatni czas: ${stopwatch.textContent}`;

	if (stopwatch.textContent !== '0:00') {
		time.style.visibility = 'visible';
		timesArr.push(stopwatch.textContent);
	}
	clear();
};

const handleReset = () => {
	clear();
	timesArr = [];
	time.style.visibility = '';
	colors.classList.remove('show-colors');
};

const clear = () => {
	clearInterval(countTime);
	stopwatch.textContent = '0:00';
	timeList.textContent = '';
	minutes = 0;
	seconds = 0;
};

const handleArchive = () => {
	timeList.textContent = '';
	for (let i = 0; i < timesArr.length; i++) {
		const newTime = document.createElement('li');
		newTime.innerHTML = `Pomiar nr. ${i + 1}: <span>${timesArr[i]}<span>`;
		timeList.append(newTime);
	}
};

const showModal = () => {
	if (modalShadow.style.display !== 'block') {
		modalShadow.style.display = 'block';
	} else {
		modalShadow.style.display = '';
	}
	modalShadow.classList.toggle('modal-animation');
};

const showColors = () => {
	colors.classList.toggle('show-colors');
};

const changeColor = (color) => {
	document.documentElement.style.setProperty('--first-color', color);
};

brushBtn.addEventListener('click', showColors);
redColorBtn.addEventListener('click', () => changeColor(redRGBColor));
greenColorBtn.addEventListener('click', () => changeColor(greenRGBColor));
blueColorBtn.addEventListener('click', () => changeColor(blueRGBColor));

startBtn.addEventListener('click', handleStart);
pauseBtn.addEventListener('click', handlePause);
stopBtn.addEventListener('click', handleStop);
resetBtn.addEventListener('click', handleReset);
archiveBtn.addEventListener('click', handleArchive);
infoBtn.addEventListener('click', showModal);
closeModalBtn.addEventListener('click', showModal);
window.addEventListener('click', (e) =>
	e.target === modalShadow ? showModal() : false
);
