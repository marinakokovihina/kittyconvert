const apiKey = '7561b71ab2786e118fc948b4';

// type getRateFromApi = {
//     baseCode: string;
//     targetCode: string;
// }

//а надо ли типизировать это таким образом если мы используем это не как функциональную компоненту??????
export async function getRateFromApi(baseCode: string, targetCode: string){

    const urlRate = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${baseCode}/${targetCode}`;
    const ratePair = await fetch(urlRate);

    const dataRatePair = await ratePair.json();
    return dataRatePair.conversion_rate
    //добавить проверку на ошибки о том что нихуя не пришло и тд
} //получили число отношение из бейз кода к таргет коду и можем дальше с этой хуетой считать все

