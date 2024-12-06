try{
    throw new Error('test error');
}catch(e){
    console.log('Log Error: ', e);
}