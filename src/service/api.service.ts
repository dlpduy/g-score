import axios from './custom.axios';

const getStudentById = (id: string) => {
    const URL_BACKEND = "api/v1/students/" + id;
    return axios.get(URL_BACKEND)
}

const getStudentByGroup = (group: string, count:number) => {
    const URL_BACKEND = `api/v1/students/${group}/${count}`;
    return axios.get(URL_BACKEND)
}

const getChartData = () => {
    const URL_BACKEND = "api/v1/scores/level-report";
    return axios.get(URL_BACKEND)
}

const getAllSubjects = () => {
    const URL_BACKEND = "api/v1/subjects";
    return axios.get(URL_BACKEND)
}
const getNumerStudent = () => {
    const URL_BACKEND = "api/v1/students/numbers";
    return axios.get(URL_BACKEND)
}

export {getStudentById, getStudentByGroup, getChartData, getAllSubjects, getNumerStudent}