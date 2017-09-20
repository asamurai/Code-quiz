let wait = () => new Promise((resolve, reject) => {
    const ms = Math.random()*1000;
    setTimeout(()=>{
        return Math.random()*1000 + 200 > 500 ? resolve('Success') : reject('Failed');
    }, ms);
});

export default wait;
