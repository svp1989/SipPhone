/**
 * обрабатываем клик по иконке
 * (смена цвета иконки/регистрация сиптелефона)
 */
let currentBookmark = false;
let sipPhoneConnectData = {};

/**
 * Регистрация пользователя по клику на иконку сипфона и смена цвета сипфона
 */
browser.browserAction.onClicked.addListener(() => {

    let sipConnect = browser.storage.sync.get('sipPhoneConnectData');
    sipConnect.then(res => {
        sipPhoneConnectData = res.sipPhoneConnectData;
    });

    if (currentBookmark) {
        currentBookmark = false;
        sipPhone.sipUnRegister();
    } else {
        currentBookmark = true;
        sipPhone.register(
            sipPhoneConnectData.login,
            sipPhoneConnectData.password,
            sipPhoneConnectData.server,
            sipPhoneConnectData.realm
        );
    }

    browser.browserAction.setIcon({
        path: currentBookmark ? {
            19: "icons/phone_active.svg",
            38: "icons/phone_active.svg"
        } : {
            19: "icons/phone_deactive.svg",
            38: "icons/phone_deactive.svg"
        }
    });

    browser.browserAction.setTitle({
        title: currentBookmark ? 'Активен!' : 'Не активен!',
    });
});

/**
 * Нотифицируем все вкладки о событии
 * @param message
 */
function notifyAllTabs(message) {
    console.log(message);
    let querying = browser.tabs.query({});
    querying.then(tabs => {
        for (let id in tabs) {
            browser.tabs.sendMessage(
                tabs[id].id, message
            ).catch(e => {
                console.log(e + id)
            });
        }
    });
}

/**
 * Слушаем события от сипфона
 */
browser.runtime.onMessage.addListener(message => {
    notifyAllTabs(message);
    switch (message.action) {
        case "connect": {
            // sipPhone.setNumber(message.number);
            // sipPhone.startCall();
            break;
        }

        case "reject": {
            // sipPhone.hangUp();
            break;
        }
    }
});
