import axios from "axios";

const dropDownServices = {
    genderDropdown (data, callback){
        axios.get("https://run.mocky.io/v3/9b393175-bef2-4318-89bc-c11f8661753d").then(
            (response) => {
                console.log(response)
                callback({
                    status: true,
                    data: response.data
                })
            }
        )
    }
} 

export default dropDownServices;