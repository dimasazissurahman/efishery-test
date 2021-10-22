import axios from "axios";

export const getDataList = (props) => {
    if (!props) props = '';
    try {
        const resp = axios.get(`https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4/${props}`);
        return resp;
    } catch (error) {
        console.log(error);
        return error;
    }
}