import EncryptedStorage from 'react-native-encrypted-storage';

export const setTokens = async (accessToken, refreshToken) => {

    try
    {
        await EncryptedStorage.setItem("accessToken", accessToken);
        await EncryptedStorage.setItem("refreshToken", refreshToken);
    }
    catch(err)
    {
        console.log(err);
    }
};

export const removeTokens = async () => {

    try
    {
        await EncryptedStorage.removeItem("accessToken");
        await EncryptedStorage.removeItem("refreshToken");
    }
    catch(err)
    {
        console.log(err);
    }
};

export const retrieveAccessToken = async () => {

    try
    {
        const accessToken = await EncryptedStorage.getItem("accessToken");
        
        if (!accessToken)
            return null;

        return accessToken;
    }
    catch(err)
    {
        console.log(err);
    }
};

export const retrieveRefreshToken = async () => {

    try
    {
        const refreshToken = await EncryptedStorage.getItem("refreshToken");
        
        if (!refreshToken)
            return null;

        return refreshToken;
    }
    catch(err)
    {
        console.log(err);
    }
};