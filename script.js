const startBtn = document.querySelector('.start');
const pauseBtn = document.querySelector('.pause');
const stopBtn = document.querySelector('.stop');
const resetBtn = document.querySelector('.reset');
const archiveBtn = document.querySelector('.archive');
const stopwatch = document.querySelector('.stopwatch');
const time = document.querySelector('.time');
const timeList = document.querySelector('.time-list');

const infoBtn = document.querySelector('.info');
const closeModalBtn = document.querySelector('.close');
const modalShadow = document.querySelector('.modal-shadow');

let countTime = 0;
let minutes = 0;
let seconds = 0;

let timesArr = [];

const handleStart = () => {
	clearInterval(countTime);
	countTime = setInterval(() => {
		seconds++;
		setTime(stopwatch);
	}, 100);
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
