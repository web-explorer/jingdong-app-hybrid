import axios from 'axios'

export function getHomeData(){
    let url = '/mMain/homeData'

    return axios.get(url)
}
