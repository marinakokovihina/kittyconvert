const apiKey = '7561b71ab2786e118fc948b4';


export async function getRateFromApi(baseCode: string, targetCode: string){

    const urlRate = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${baseCode}/${targetCode}`;
    const ratePair = await fetch(urlRate);

    const dataRatePair = await ratePair.json();
    return dataRatePair.conversion_rate
}

