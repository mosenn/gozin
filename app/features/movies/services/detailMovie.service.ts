export async function getDetailMovie(id:string):Promise<Title> {
try{
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/titles/${id}`)
    if(!res.ok) return;
    return res.json()
}
catch (error) {
        console.error(error);
        throw error;
    }
}