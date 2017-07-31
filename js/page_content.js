/**
 * ответ или звонок в зависимоти от события полученного от астериска
 * @type {Element}
 */
const connect = window.document.getElementById("connect");
let connectIncome = window.document.querySelectorAll('button#connectIncome');

/**
 * кладем трубку (обрываем соединение)
 * @type {Element}
 */
const reject = window.document.getElementById("reject");
// let rejectIncome = window.document.querySelectorAll("button#rejectIncome");
const rejectAnswerCall = window.document.getElementById("rejectAnswerCall");

/**
 * Ставим разговор на холд
 * @type {Element}
 */
const pause = window.document.getElementById("pause");

/**
 * Отображение виджета
 * @type {Element}
 */
const showWidget = window.document.getElementById("showWidget");

/**
 * клик по кнопкам для набора номера
 * @type {Element}
 */
const dialpad = window.document.getElementById("dialpad");

/**
 * клик по телефонной книге
 * @type {Element}
 */
const phoneBook = window.document.getElementById("phoneBook");

/**
 * Кнопка отображения диалпада и телефонной книгиы
 * @type {Element}
 */
const showMore = window.document.getElementById("showMore");

/**
 * При клике нотифицируем расширение о событии CALL|ANSWER
 */

connect.addEventListener("click", event => {
    let phone = window.document.getElementById("phoneNumber");
    if (phone.value) {
        browser.runtime.sendMessage({"action": "connect", "type": "outcome", "number": phone.value});
    } else {
        console.log("Введите номер!!!");
    }
});
if (connectIncome.length > 0) {
    for (let i = 0; i < connectIncome.length; i++) {
        let callId = connectIncome[i].parentNode.parentNode.dataset;
        connectIncome[i].addEventListener("click", event => {
            browser.runtime.sendMessage({"action": "connect", "type": "income", "callId": callId.callid});
        });
    }
}


/**
 * При клике нотифицируем расширение о событии REJECT
 */
reject.addEventListener("click", event => {
    browser.runtime.sendMessage({"action": "reject"});
});


// for (let i = 0; i < connectIncome.length; i++) {
//     rejectIncome[i].addEventListener("click", event => {
//         browser.runtime.sendMessage({"action": "connect", "type": "income"});
//     });
// }


rejectAnswerCall.addEventListener("click", event => {
    browser.runtime.sendMessage({"action": "reject"});
});

/**
 * Ставим разговор на холд
 */
pause.addEventListener("click", e => {
    if (pause.innerHTML == "PAUSE") {
        browser.runtime.sendMessage({"action": "hold"});
        pause.innerHTML = "CONTINUE";
    } else {
        browser.runtime.sendMessage({"action": "unhold"});
        pause.innerHTML = "PAUSE";
    }

});

/**
 * показывае убираем блок при клике
 */
showWidget.addEventListener("click", event => {
    if (phoneWidget.style.display == "block") {
        phoneWidget.style.display = "none";
    } else {
        phoneWidget.style.display = "block";
    }
});


/**
 * Записываем номер в поле phoneNumber
 * @param e
 */
dialpad.addEventListener("click", event => {
    event.stopPropagation();
    if (event.target.getElementsByTagName("button").length == 0) {
        let phone = window.document.getElementById("phoneNumber").value;
        window.document.getElementById("phoneNumber").value = phone + e.target.innerText;
    }
});

/**
 * Номер телефона из телефонной книги
 * @param e
 */
phoneBook.addEventListener("click", event => {
    if (event.target.getElementsByTagName("span").length == 0) {
        window.document.getElementById("phoneNumber").value = event.target.id;
    }
});

/**
 * Отображаем при клике на кнопку showMore диалпад и телоефонннуб книгу
 */
showMore.addEventListener("click", event => {
    if (phoneBook.style.display == "inline-block") {
        phoneBook.style.display = "none";
        dialpad.style.display = "none";
    } else {
        phoneBook.style.display = "inline-block";
        dialpad.style.display = "inline-block";
    }
});
