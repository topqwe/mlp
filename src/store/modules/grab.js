export default {
    state: {
        grab: {},
        grab_status:false,
        grab_isShow:false,
        addre:{}
    },
    getters: {
        grab: state => state.grab,
        grab_status: state => state.grab_status,
        grab_isShow: state => state.grab_isShow,
        addre: state=> state.addre
    },
    mutations: {
        setGrab: (state, grab) => {
            console.log(1233)
            state.grab = grab
        },
        setGrab_status: (state, grab_status) => {
            state.grab_status = grab_status
        },
        setGrab_isShow: (state, grab_isShow) => {
            state.grab_isShow = grab_isShow
        },
        setAddre: (state, addre) => {
            state.addre = addre
        },
    }
}

