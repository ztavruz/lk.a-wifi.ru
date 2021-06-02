module.exports.getErrorMessage = async (request) => {
    let message = await JSON.parse(request.responseText).message;
    return message;
}

module.exports.getDate_DD_MM_YYYY =  (timestamp) => {

    let date = new Date(timestamp);
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    day = day < 10 ? "0" + day : day;
    month = month < 10 ? "0" + month : month;
    let data = day + "." + month + "." + year + "г.";

    return data;
}

module.exports.getArrayNumbersFromTelephoneBD = (numberTelephone, whatTypeOfDataToReturn = "readyStringPhone" ) => {
    let number = "";
    if (numberTelephone) {
        number = String(numberTelephone);
    }else{
        return "Вы не ввели номер телефона";
    }
    let arrayNumbers = number.split("");
    if(whatTypeOfDataToReturn == "arrayNumbers"){
        let newArrayNumbers = arrayNumbers.map((item)=>{return Number(item)});
        return newArrayNumbers;
    }else if(whatTypeOfDataToReturn == "readyStringPhone"){
        let obj ={
            prefix: arrayNumbers[0],
            operator: arrayNumbers[1] + arrayNumbers[2] + arrayNumbers[3],
            count333: arrayNumbers[4] + arrayNumbers[5] + arrayNumbers[6],
            count22: arrayNumbers[7] + arrayNumbers[8],
            count11: arrayNumbers[9] + arrayNumbers[10],
        }
        if(obj.prefix == 8){
            obj.prefix = 7
        }
        let fullPhoneSrting = "+" + obj.prefix + " (" + obj.operator + ") " + obj.count333 + "-" +  obj.count22 +  "-" +obj.count11
        return fullPhoneSrting;
    }
}

module.exports.getTime_HH_MM_SS = (timestamp) => {

    let time = new Date(timestamp)
    let HH = time.getHours();
    let MM = time.getMinutes();
    let SS = time.getSeconds();

    HH = HH < 10 ? "0" + HH : HH;
    MM = MM < 10 ? "0" + MM : MM;
    SS = SS < 10 ? "0" + SS : SS;
    let data = HH + ":" + MM + ":" + SS;

    return data;
}

module.exports.getRequestData = (request) => {

    if (request.status <= 209) {

        let data = request.data ? request.data : JSON.parse(request.responseText);
        return data;

    } else if (request.status > 209) {

        let errorMessage = JSON.parse(request.responseText).message;
        // console.log(errorMessage)
        return errorMessage;
    }

}

module.exports.splitString = (stringToSplit, separator) => {

    let arrayOfStrings = stringToSplit.split(separator);
    return arrayOfStrings;
}
