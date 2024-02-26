interface UserData {
    id: number;
    login: string;
    avatar_url: string;
    location: string;
    url: string
}

async function fetcher<T> (url: string, options?: RequestInit): Promise<T> {
    const response= await fetch(url,  options);
    if(!response.ok){
        throw new Error(`${response.status}`);
    }
    const data = await response.json(); 
    // console.log(data);
    return data;

}

const showCard=(indi:UserData)=>{
    
}
function fetchUserData(url : string) {
    fetcher<UserData[]>(url, {}).then((userInfo)=>{
        for(const indi of userInfo){
            showCard(indi);

        }

    });
}

fetchUserData("https://api.github.com/users");