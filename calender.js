//Date 객체 생성
let date = new Date();
//getFullYear() 년도 출력
//getMonth() 0~11으로 월을 출력, +1을 해줘야 현재 월
//getDate() 날짜 출력
//getDay() 1~7로 요일 출력
let Ddays = [];


const renderCalendar = () => {
    let korDays = ['일','월','화','수','목','금','토'];
    const viewYear = date.getFullYear();
    const viewMonth = date.getMonth();

    // year-month 채우기
    document.querySelector('.year-month').textContent = `${viewYear}년 ${viewMonth + 1}월`;

    //지난 달 마지막 Date, 이번 달 마지막 Date
    const prevLast = new Date(viewYear, viewMonth, 0);
    const thisLast = new Date(viewYear, viewMonth + 1, 0);
    
    const PLDate = prevLast.getDate(); //지난달 마지막 날짜
    const PLDay = prevLast.getDay(); // 지난달 마지막 요일

    const TLDate = thisLast.getDate(); //이번달 마지막 날짜
    const TLDay = thisLast.getDay();  // 이번달 마지막 요일

    // Dates 기본 배열들
    const prevDates = [];
    const thisDates = [...Array(TLDate + 1).keys()].slice(1);
    //Array(n)길이가 n인 배열 생성 
    //모든 요소들이 empty값이기 때문에 key()로 0~n-1까지 채워줌
    //그래서 이번달 마지막 날짜 +1 해주고 0을 없애기 위해 slice사용
    const nextDates = [];

    // prevDates 계산
    if (PLDay !== 6) { //지난달 마지막 요일이 토요일이면 할 필요 없음
        for (let i = 0; i < PLDay + 1; i++) {
            prevDates.unshift(PLDate - i);
            //push() 배열의 맨 끝에 값 추가
            //unshift() 배열의 맨 앞에 값 추가
            //pop() 배열의 맨 끝값 제거
            //shift() 배열의 맨 앞의 값 제거
        }
    }

    // nextDates 계산
    for (let i = 1; i < 7 - TLDay; i++) {
        nextDates.push(i)
    }

    // Dates 합치기, concat()매소드로 세 열을 합침
    const dates = prevDates.concat(thisDates, nextDates);

    // Dates 정리
    const firstDateIndex = dates.indexOf(1);
    const lastDateIndex = dates.lastIndexOf(TLDate);
    dates.forEach((date, i) => {
        const condition = i >= firstDateIndex && i < lastDateIndex + 1
            ? 'this'
            : 'other';
        var day = korDays[i % 7]
        //dates[i] = `<div class="date"><span class="${condition}">${date}</span></div>`;
        //dates[i] = `<div class="date"><button class="button" onclick="shcedule()"><span class="${condition}">${date}</span></button></div>`;
        if(i >= firstDateIndex && i < lastDateIndex + 1){
            dates[i] = `<button class="date" onclick="shcedule(${viewYear},${viewMonth + 1},${dates[i]},${i % 7})"><span class="${condition}">${date}</span><br><span>ㅤ</span></button>`;
        } else if(i <= firstDateIndex){
            if(viewMonth == 0){
                dates[i] = `<button class="date" onclick="shcedule(${viewYear-1},${12},${dates[i]},${i % 7})"><span class="${condition}">${date}</span><br><span>ㅤ</span></button>`;
            } else {
                dates[i] = `<button class="date" onclick="shcedule(${viewYear},${viewMonth},${dates[i]},${i % 7})"><span class="${condition}">${date}</span><br><span>ㅤ</span></button>`;
            }
        } else {
            if(viewMonth + 2 == 13){
                dates[i] = `<button class="date" onclick="shcedule(${viewYear+1},${1},${dates[i]},${i % 7})"><span class="${condition}">${date}</span><br><span>ㅤ</span></button>`;
            } else {
                dates[i] = `<button class="date" onclick="shcedule(${viewYear},${viewMonth + 2},${dates[i]},${i % 7})"><span class="${condition}">${date}</span><br><span>ㅤ</span></button>`;
            }
            
        }
    })

    // Dates 그리기
    document.querySelector('.dates').innerHTML = dates.join('');
    
    //today 그리기
    const today = new Date();
    if (viewMonth === today.getMonth() && viewYear === today.getFullYear()) {
        for (let date of document.querySelectorAll('.this')) {
            if (+date.innerText === today.getDate()) {
                date.classList.add('today');
                break;
            }
        }
    }

    //D-day 그리기

};

renderCalendar();

const prevMonth = () => {
    date.setDate(1);
    date.setMonth(date.getMonth() - 1);
    renderCalendar();
};

const nextMonth = () => {
    date.setDate(1);
    date.setMonth(date.getMonth() + 1);
    renderCalendar();
};

const goToday = () => {
    date = new Date();
    renderCalendar();
};

function shcedule(year,month,date,day) {;
    var ar = [...Array(30+1).keys()].slice(1);
    alert(ar);
    alert(`${year}년 ${month}월 ${date}일 ${day}`);
    prompt("할 일 작성");
}

