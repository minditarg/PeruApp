import * as ImageManipulator from 'expo-image-manipulator';


export async function getImageBase64(path) {
    const imgbase64 = await ImageManipulator.manipulateAsync(path, [], { base64: true })
    //console.log('base64res' + JSON.stringify(imgbase64));
    return imgbase64;
};
