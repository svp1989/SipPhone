/**
 * Поля которые необходимо валидировать на пустату
 * @type {[*]}
 */
const validData = ["login", "password", "server", "realm"];

/**
 * Берем данные из хранилища и устанавливаем в настройках по дефолту
 */
window.document.addEventListener('DOMContentLoaded', () => {
    let sipPhoneConnectData = browser.storage.sync.get('sipPhoneConnectData');
    sipPhoneConnectData.then(res => {
        for (let name in res.sipPhoneConnectData) {
            let input = window.document.getElementById(name);
            input.value = res.sipPhoneConnectData[name];
        }
    });
});

/**
 * Получаем данные из формы и созраняем в storage
 * @type {Element}
 */
let form = window.document.querySelector("form#settingSipPhone");
form.addEventListener("submit", event => {
    event.preventDefault();
    let data = window.document.getElementsByTagName("input");
    if (valid(data)) {
        browser.storage.sync.set({
            sipPhoneConnectData: dataToObject(data)
        });
    }
});

/**
 * Преобразуем инпуты в объект
 * @param data
 */
function dataToObject(data) {
    let jsonObj = {};
    for (let i = 0; i < data.length; i++) {
        jsonObj[data[i].name] = data[i].value;
    }
    return jsonObj;
}

/**
 * Проверяем все ли поля заполнены
 * @param data
 * @returns {boolean}
 */
function valid(data) {
    let arrData = [];

    for (let i = 0; i < data.length; i++) {
        if (data[i].value != "") {
            arrData.push(data[i].id);
        }
    }

    if (btoa(arrData) != btoa(validData)) {
        alert("Заполните все поля");
        return false;
    }

    return true;
}