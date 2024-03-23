import axios from "axios";
import baseUrl from "./baseUrl";


// registrar start
export const fetchData = async (type) => {
    const response = await axios.get(`${baseUrl}/registrar/v1/api/generic?type=${type}`)
    return response.data.body
}

export const createData = async (endPoint, data) => {
    const response = await axios.post(`${baseUrl}/registrar/v1/api${endPoint}`, data)
    return response;
}

export const updateData = async (endPoint, data) => {
    const response = await axios.post(`${baseUrl}/registrar/v1/api${endPoint}`, data);
    return response;
};

export const displaySelectedId = async(id) => {
    const response = await axios.get(`${baseUrl}/registrar/v1/api/display/${id}`);
    return response.data.body
}

// export const fetchAccountData = async (endpoint) => {
//     const response = await axios.get(`${baseUrl}/registrar/v1/api${endpoint}`)
//     return response.data
// }

export const fetchAccountData = async(endPoint) => {
    const response = await axios.get(`${baseUrl}/registrar/v1/api${endPoint}`)
    return response
}

// registrar end
// parent start

export const parentCreateAcc = async (endPoint, data) => {
    const response = await axios.post(`${baseUrl}/parent/v1/api${endPoint}`, data);
    return response;
}

export const selectName = async (endPoint) => {
    const response = await axios.get(`${baseUrl}/parent/v1/api${endPoint}`)
    return response
}

export const AcreateData = async (endPoint, data) => {
    const response = await axios.post(`${baseUrl}/academicRecords/v1/api${endPoint}`, data)
    return response;
}

export const postAttendance = async (endPoint, data) => {
    const response = await axios.post(`${baseUrl}/attendance/v1/api${endPoint}`, data)
    return response
} 

export const loginApi = async(endPoint, data) => {
    const response = await axios.post(`${baseUrl}/login/v1/api${endPoint}`, data)
    return response
}

export const fetchAttendance = async (endPoint) => {
    const response = await axios.get(`${baseUrl}/attendance/v1/api${endPoint}`)
    return response
} 

//announcement

export const Announcement = (endPoint, data) => {
    const result = axios.post(`${baseUrl}/announcement/api/v1${endPoint}`, data)
    return result;
}

export const fetchAnnouncement = (endPoint) => {
    const result = axios.get(`${baseUrl}/announcement/api/v1${endPoint}`)
    return result;
}

export const fetchAttendancePerCourse = (endPoint) => {
    const  result = axios.get(`${baseUrl}/dashboard/v1/api${endPoint}`)
    return result
}

export const fetchSection = (endPoint) => {
    const result = axios.get(`${baseUrl}/registrar/v1/api${endPoint}`)
    return result
}

export const add = (endPoint, data) => {
    const result = axios.post(`${baseUrl}/admin/v1/api${endPoint}`, data)
    return result
}

export const displayAdmin = (endPoint) => {
    const result = axios.get(`${baseUrl}/admin/v1/api${endPoint}`)
    return result
}

export const addClasses = (endPoint, data) => {
    const result = axios.post(`${baseUrl}/api/v1/classes${endPoint}`, data)
    return result;
}

export const displayClasses = (endPoint, data) => {
    const result = axios.get(`${baseUrl}/api/v1/classes${endPoint}`)
    return result;
}