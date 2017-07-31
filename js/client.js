/**
 * Create audio element for writing audio stream
 * @type {Element}
 */
let audioRemote = document.createElement("audio");
audioRemote.setAttribute('id', 'audio_remote');


//TODO ВНИМАНИЕ ОТКЛУЧЕНА ПРЕИНИЦИАЛИЗАЦИЯ ЕСТЬ ПОДОЗРЕНИЕ ЧТО ОНА НАХРЕН НЕ НУЖНА!!!!!

/**
 *
 * @class            sipPhone - for manipulation WebRtc library sipml5,
 * @property         audioRemote: Element - audio element for writing stream,
 * @property         number: null - public property stored number with which connected client,
 * @property         config: null - private property stored object config for create call,
 * @property         sipStack: null - private property stored sip stack configured client for connect to asterisk,
 * @property         sipSessionCall: boolean - private property stored call session,
 *
 * @method           register: sipPhone.register  {
 *      @param                  phone    - client phone and name,
 *      @param                  password - password,
 *      @param                  server   - connect server
 *                          } - register sip phone ,
 * @method                     sipUnRegister: sipPhone.sipUnRegister - close connect client with asterisk,
 // *                      postInit: sipPhone.postInit,
 // *                      preInit: sipPhone.preInit,
 // *                      getPVal: sipPhone.getPVal,
 * @method                    sipEventStack: sipPhone.sipEventStack,
 * @method                    sipEventSession: sipPhone.sipEventSession,
 * @method                    hangUp: sipPhone.hangUp,
 * @method                    startCall: sipPhone.startCall,
 * @method                    setNumber: sipPhone.setNumber
 *
 */
let sipPhone = {

    audioRemote: document.getElementById('audio_remote'),

    number: null,

    //конфиг для совершения звонка
    config: null,

    sipStack: null,

    sipSessionCall: false,

    //регистрация поьзователя
    register: function (phone, password, server, realm) {

        this.config = {
            audio_remote: this.audioRemote,
            video_local: null,
            video_remote: null,
            events_listener: {events: '*', listener: sipPhone.sipEventSession},
            sip_caps: [
                {name: '+g.oma.sip-im'},
                {name: 'language', value: '\"en,fr\"'}
            ]
        };

        this.sipStack = new SIPml.Stack({
            realm: realm,
            impi: phone,
            impu: 'sip:' + phone + '@' + realm,
            password: password,
            display_name: phone,
            websocket_proxy_url: server,
            outbound_proxy_url: null,
            ice_servers: [],
            enable_rtcweb_breaker: false,
            events_listener: {
                events: '*',
                listener: sipPhone.sipEventStack
            },
            enable_early_ims: true, // Must be true unless you're using a real IMS network
            enable_media_stream_cache: false,
            sip_headers: [
                {name: 'User-Agent', value: 'IM-client/OMA1.0 sipML5-v1.2016.03.04'},
                {name: 'Organization', value: 'Doubango Telecom'}
            ]
        });

        this.sipStack.start();

        // let readyStateTimer = setInterval(function () {
        //     if (document.readyState === "complete") {
        //         clearInterval(readyStateTimer);
        //         sipPhone.preInit();
        //     }
        // }, 500);

    },

    //выход из сипа
    sipUnRegister: function () {
        if (sipPhone.sipStack) {
            sipPhone.sipStack.stop(); // shutdown all sessions
        }
    },

    postInit: function () {
        // checks for WebSocket support
        if (!SIPml.isWebSocketSupported()) {
            if (confirm('Your browser don\'t support WebSockets.\nDo you want to download a WebSocket-capable browser?')) {
                window.location = 'https://www.google.com/intl/en/chrome/browser/';
            }
            else {
                window.location = "index.html";
            }
            return;
        }


        if (!SIPml.isWebRtcSupported()) {
            if (confirm('Your browser don\'t support WebRTC.\naudio/video calls will be disabled.\nDo you want to download a WebRTC-capable browser?')) {
                window.location = 'https://www.google.com/intl/en/chrome/browser/';
            }
        }

        oConfigCall = this.config;
    },

    preInit: function () {
        // set default webrtc type (before initialization)
        let s_webrtc_type = this.getPVal("wt");
        let s_fps = this.getPVal("fps");
        let s_mvs = this.getPVal("mvs"); // maxVideoSize
        let s_mbwu = this.getPVal("mbwu"); // maxBandwidthUp (kbps)
        let s_mbwd = this.getPVal("mbwd"); // maxBandwidthUp (kbps)
        let s_za = this.getPVal("za"); // ZeroArtifacts
        let s_ndb = this.getPVal("ndb"); // NativeDebug

        if (s_webrtc_type) SIPml.setWebRtcType(s_webrtc_type);

        // initialize SIPML5
        SIPml.init(this.postInit());

        // set other options after initialization
        if (s_fps) SIPml.setFps(parseFloat(s_fps));
        if (s_mvs) SIPml.setMaxVideoSize(s_mvs);
        if (s_mbwu) SIPml.setMaxBandwidthUp(parseFloat(s_mbwu));
        if (s_mbwd) SIPml.setMaxBandwidthDown(parseFloat(s_mbwd));
        if (s_za) SIPml.setZeroArtifacts(s_za === "true");
        if (s_ndb == "true") SIPml.startNativeDebug();

    },

    getPVal: function (PName) {
        let query = window.location.search.substring(1);
        let vars = query.split('&');
        for (let i = 0; i < vars.length; i++) {
            let pair = vars[i].split('=');
            if (decodeURIComponent(pair[0]) === PName) {
                return decodeURIComponent(pair[1]);
            }
        }
        return null;
    },

    //Регистрация телефона
    sipEventStack: function (event) {
        switch (event.type) {
            case 'started': {
                this.sipSession = this.newSession('register', {
                    expires: 200,
                    events_listener: {
                        events: '*',
                        listener: sipPhone.sipEventSession
                    },
                    sip_caps: [
                        {name: '+g.oma.sip-im', value: null},
                        {name: '+audio', value: null},
                        {name: 'language', value: '\"en,fr\"'}
                    ]
                });
                this.sipSession.register();
                break;
            }
            case 'stopping':
            case 'stopped':
            case 'failed_to_start':
            case 'failed_to_stop': {
                break;
            }

            case 'i_new_call': {
                if (sipPhone.sipSessionCall) {
                    event.newSession.hangup()
                } else {
                    sipPhone.sipSessionCall = event.newSession;
                    sipPhone.sipSessionCall.setConfiguration(sipPhone.config);
                }
                break;
            }

            case 'm_permission_requested': {
                break;
            }
            case 'm_permission_accepted':
            case 'm_permission_refused': {
                break;
            }

            case 'starting':
            default:
                break;

        }
    },
    //события внутри сессии
    sipEventSession: function (event) {
        tsk_utils_log_info('==session event = ' + event.type);
        switch (event.type) {
            case 'connecting':
            case 'connected': {
                console.log('connected');
                break;
            } // 'connecting' | 'connected'
            case 'terminating':
            case 'terminated': {
                console.log('terminated');
                break;
            }

            case 'm_stream_audio_local_added':
            case 'm_stream_audio_local_removed':
            case 'm_stream_audio_remote_added': {
                break;
            }

            case 'm_stream_audio_remote_removed': {
                break;
            }

            case 'i_ect_new_call': {
                console.log('i_ect_new_call');
                break;
            }

            case 'i_ao_request': {
                if (event.session == sipPhone.sipSessionCall) {
                    var sipResponseCode = event.getSipResponseCode();
                    if (sipResponseCode == 180 || sipResponseCode == 183) {
                        console.log('din din'); //TODO звук дозвона до клиента
                    }
                }
                break;
            }

            case 'm_early_media': {
                console.log('m_early_media');
                break;
            }

            case 'm_local_hold_ok': {
                console.log('m_local_hold_ok');
                break;
            }
            case 'm_local_hold_nok': {
                console.log('m_local_hold_ok');

                break;
            }
            case 'm_local_resume_nok': {
                console.log('m_local_resume_nok');

                break;
            }
            case 'm_remote_hold': {
                console.log('m_remote_hold');
                break;
            }
            case 'm_remote_resume': {
                console.log('m_remote_resume');
                break;
            }
            case 'm_bfcp_info': {
                console.log('m_bfcp_info');

                break;
            }

            case 'o_ect_trying': {
                console.log('o_ect_trying');

                break;
            }
            case 'o_ect_accepted': {
                console.log('o_ect_accepted');

                break;
            }
            case 'o_ect_completed':
            case 'i_ect_completed': {
                console.log('i_ect_completed');

                break;
            }
            case 'o_ect_failed':
            case 'i_ect_failed': {
                console.log('i_ect_failed');

                break;
            }
            case 'o_ect_notify':
            case 'i_ect_notify': {
                console.log('i_ect_notify');

                break;
            }
            case 'i_ect_requested': {
                console.log('i_ect_requested');

                break;
            }
        }
    },

    //Кладем трубу
    hangUp: function () {
        if (sipPhone.sipSessionCall) {
            sipPhone.sipSessionCall.hangup({
                events_listener: {
                    events: '*',
                    listener: sipPhone.sipEventSession
                }
            });
        }
    },

    //совершения звонка
    startCall: function () {
        if (sipPhone.sipStack && !sipPhone.sipSessionCall && !tsk_string_is_null_or_empty(sipPhone.number)) {
            sipPhone.sipSessionCall = sipPhone.sipStack.newSession('call-audio', sipPhone.config);
            sipPhone.sipSessionCall.call(sipPhone.number);
        } else if (sipPhone.sipSessionCall) {
            sipPhone.sipSessionCall.accept(sipPhone.config);
        }
    },

    //Устанавливаем номер
    setNumber: function (number) {
        sipPhone.number = number;
    }
};