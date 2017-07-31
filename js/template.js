let html = `
<style>
    #mainBlockSipPhoneWidget {
        position: fixed;
        bottom: 62px;
        right: 87px;
        font-family: sans-serif;
        font-size: 16px;

    }
    #mainBlockSipPhoneWidget button {
        border-radius: 3px;
        border: 1px solid;
    }
    #mainBlockSipPhoneWidget #phoneWidget {
        background: #172346;
        display: inline-block;
        border: 1px solid #172346;
        font-size: 17px;
        position: relative;
        text-align:left;
    }

    #mainBlockSipPhoneWidget #phoneWidget input#phoneNumber {
        display: block;
        margin: 6px;
        width: 300px;
        padding: 7px 14px;
        line-height: 1.42857143;
        color: #555;
        background-color: #fff;
        background-image: none;
        border: 1px solid #ccc;
        -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
        box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
        -webkit-transition: border-color ease-in-out .15s, -webkit-box-shadow ease-in-out .15s;
        -o-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
        transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
        font-family: sans-serif;
        font-size: 16px;
    }

    #mainBlockSipPhoneWidget #phoneWidget .buttonPhoneWidget#dialpad {
        border: 1px solid #2b4694;
        width: 155px;
        text-align: center;
        background: #000000;
        margin-left: 5px;
        padding: 3px 0;
        display: none;
    }

    #mainBlockSipPhoneWidget #phoneWidget #phoneBook {
        border: 1px solid #3350a2;
        display: none;
        vertical-align: top;
        width: 150px;
        margin-top: 5px;
        background: white;
        padding: 6px;
        height: 121px;
        color: #2f2f2f;
        overflow: auto;
    }

    #mainBlockSipPhoneWidget #phoneWidget #phoneBook span {
        display: block;
        cursor: pointer;
        border-bottom: 1px solid #b5b5b5;
        border-top: 1px solid #fff;
        font-size: 15px;
        padding: 5px;
    }

    #mainBlockSipPhoneWidget #phoneWidget .buttonPhoneWidget#dialpad button {
        width: 41px;
        padding: 4px;
        margin: 3px 2px;
    }

    #mainBlockSipPhoneWidget #phoneWidget .buttonPhoneWidget#dialpad button:hover {
        background: #172346;
    }

    #mainBlockSipPhoneWidget #phoneWidget .buttonPhoneWidget button {
        display: inline-block;
        font-size: 14px;
        background: #3e58a5;
        border: 1px solid #172346;
        color: #fff;
        cursor: pointer;
    }

    #mainBlockSipPhoneWidget #phoneWidget .buttonPhoneWidget button#connect {
        background: #4caf50;
        border: 1px solid #172346;
        padding: 5px 17px;
        color: #172346;
    }

    #mainBlockSipPhoneWidget #phoneWidget .buttonPhoneWidget button#reject {
        background: #F44336;
        border: 1px solid #172346;
        padding: 5px 17px;
        color: #172346;
    }

    #mainBlockSipPhoneWidget #phoneWidget .buttonPhoneWidget {
        width: 332px;
        margin: 6px;
        margin-top: 4px;
    }

    #mainBlockSipPhoneWidget #phoneWidget .myPhone {
        display: inline-block;
        position: absolute;
        bottom: 6px;
        color: #fbfbfb;
        left: 6px;
        background: #050f2b;
        padding: 3px 12px;
        border: 1px solid #2b4694;
        font-family: monospace;
        font-size: 17px;
    }

    #showWidget {
        display: inline-block;
        background: #3350a2;
        border: 1px solid #3e670e;
        cursor: pointer;
        padding: 12px 19px;
        font-size: 25px;
        color: #fff;
        font-family: sans-serif;
        opacity: 0.8;
        position: fixed;
        bottom: 68px;
        right: 15px;
        z-index:99999;
        position: fixed;
    }

    #mainBlockSipPhoneWidget #infoStatus span {
        color: #ffeb3b;
    }

    #mainBlockSipPhoneWidget #infoStatus {
        display: inline-block;
        border: 1px solid #0e0e0e;
        width: 95%;
        height: 15px;
        background: #050f2b;
        padding-bottom: 2px;
        color: #fff;
        margin: 4px;
        margin-bottom: 0;
        padding-left: 3px;
    }

    #mainBlockSipPhoneWidget #showMore {
        color: #172346;
        position: absolute;
        bottom: 7px;
        left: 70px;
        background: #ff9800;
        padding: 3px 15px;
        cursor: pointer;
    }

    #mainBlockSipPhoneWidget #showMore:hover {
        border: 1px solid #333
        background: #c57600;
    }

    #mainBlockSipPhoneWidget #inputNotice,
    #mainBlockSipPhoneWidget #inputNoticeAnswer {
        margin-bottom: 5px;
        width: 345px;
    }

    #mainBlockSipPhoneWidget #inputNoticeAnswer #infoIncomeCall,
    #mainBlockSipPhoneWidget #inputNotice #infoIncomeCall {
        background: #172346;
        color: #fff;
        text-align: center;
        padding: 5px;
    }

    #mainBlockSipPhoneWidget #inputNoticeAnswer #actionAnswerCall,
    #mainBlockSipPhoneWidget #inputNotice #actionIncomeCall {
        background: #050f2b;
        text-align: center;
        padding: 3px;
    }

    #mainBlockSipPhoneWidget #inputNoticeAnswer #actionAnswerCall button,
    #mainBlockSipPhoneWidget #inputNotice #actionIncomeCall button {
        border: 1px solid #172346;
        color: #000;
        padding: 5px 15px;
        cursor: pointer;
    }

    #mainBlockSipPhoneWidget #inputNotice #actionIncomeCall button#connectIncome {
        background: #4caf50;
    }

    /*#inputNotice #actionIncomeCall button#rejectIncome {*/
    /*background: #F44336;*/
    /*}*/

    #mainBlockSipPhoneWidget #inputNoticeAnswer #actionAnswerCall button#pause {
        background: #00BCD4;
    }

    #mainBlockSipPhoneWidget #inputNoticeAnswer #actionAnswerCall button#rejectAnswerCall {
        background: #F44336;
    }
</style>

<div id="showWidget">А</div>
<div id="mainBlockSipPhoneWidget">
    <div id="inputNotice" data-callId="1">
        <div id="infoIncomeCall">Num: <span id="numIncomeCall">799994564564</span></div>
        <div id="actionIncomeCall">
            <button id="connectIncome">ANSWER</button>
        </div>
    </div>
    <div id="inputNotice" data-callId="2">
        <div id="infoIncomeCall">Num: <span id="numIncomeCall">799994564564</span></div>
        <div id="actionIncomeCall">
            <button id="connectIncome">ANSWER</button>
        </div>
    </div>
    <div id="inputNoticeAnswer" data-callId="3">
        <div id="infoIncomeCall" >Num: <span id="numIncomeCall">799994564564</span></div>
        <div id="actionAnswerCall">
            <button id="pause">PAUSE</button>
            <button id="rejectAnswerCall" class="rejectButtons">REJECT</button>
        </div>
    </div>
    <div id="phoneWidget">
        <div id="infoStatus">
            СТАТУС: <span>НЕ АКТИВЕН</span>
        </div>
        <input name="phoneWidget" id="phoneNumber" value="" placeholder="Введите номер...">
        <div class="buttonPhoneWidget" id="dialpad">
            <button>1</button>
            <button>2</button>
            <button>3</button>
            <button>4</button>
            <button>5</button>
            <button>6</button>
            <button>7</button>
            <button>8</button>
            <button>9</button>
            <button>*</button>
            <button>0</button>
            <button>#</button>
        </div>

        <div id="phoneBook">
            <span id="210">Сервис Деск</span>
            <span id="101">Петров Петр Иванович</span>
            <span id="102">Иванов Иван Петрович</span>
            <span id="790375757121">Пушкин Иван Васильевич</span>
            <span id="210">Сервис Деск</span>
            <span id="101">Петров Петр Иванович</span>
            <span id="102">Иванов Иван Петрович</span>
            <span id="790375757121">Пушкин Иван Васильевич</span>
            <span id="210">Сервис Деск</span>
            <span id="101">Петров Петр Иванович</span>
            <span id="102">Иванов Иван Петрович</span>
            <span id="790375757121">Пушкин Иван Васильевич</span>
        </div>
        <div class="buttonPhoneWidget" style="text-align: right;">
            <button id="connect">
                CALL
            </button>

            <button id="reject" class="rejectButtons">
                REJECT
            </button>
        </div>
        <div class="myPhone">
            106
        </div>
        <button id="showMore">👁</button>

    </div>
</div>
`;
let pw = window.document.createElement("phoneWidgetMain");
pw.style.zIndex = "99999";
pw.style.position = "fixed";
pw.innerHTML = html;
window.document.body.appendChild(pw);

/**
 * Входящее сообзщение от расширения
 */
browser.runtime.onMessage.addListener(request => {
    switch (request.action) {
        case "reject": {
            let inputNoticeAnswer = window.document.querySelector("div#inputNoticeAnswer");
            console.log(inputNoticeAnswer);
            inputNoticeAnswer.innerHTML = "";
            break;
        }
        case "connect": {
            if (request.type == "income") {
                console.log("income");
            } else {
                phoneNumber.value = request.number;
            }
            break;
        }
    }
});
