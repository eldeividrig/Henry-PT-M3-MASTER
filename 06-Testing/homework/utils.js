function sumArray(array, num) {
    
    if(!Array.isArray(array)) throw new TypeError('array');
    if(typeof num !== 'number') throw new TypeError('number');
    for (let i = 0; i < array.length; i++) {
        for (let j = i+1; j < array.length; j++) {
            let sum = array[i] + array[j];
            if(sum === num) return true;
        }        
    }
    return false;
}

function pluck(array, prop) {
    return array.map(p => p[prop]);
    
}

module.exports = {sumArray, pluck};

// let array = [2, 5, 7, 10, 11, 15, 20];
// let num = 15;

// let res = sumArray(array, num);

// console.log(res);