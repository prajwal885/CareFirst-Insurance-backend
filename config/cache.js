const cacheStore={}

export const setCache=(key, data, ttl=60000)=>{
    cacheStore[key]={
        data,
        expiry:Date.now()+ttl
    }
}

export const getCache=(key)=>{
    const cached=cacheStore[key]
    if(!cached) return null

    if(cached.expirey<Date.now()){
        delete cacheStore[key]
        return null
    }
    return cached.data
}

export const clearCache=(key)=>{
    delete cacheStore[key]
} 

export const clearByPrefix=(prefix)=>{
    Object.key(cacheStore).forach((key)=>{
        if (key.startsWith(prefix)) delete cacheStore[key]
    })
}

