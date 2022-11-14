function* fizzBuzzGenerator(max) {
  // Tu código acá:
  let i = 1;
  while(max ? i <= max : true){
    if(i % 3 === 0 && i % 5 === 0){
      yield 'Fizz Buzz';
    }else if (i % 3 === 0){
      yield 'Fizz';
    }else if (i % 5 === 0){
      yield 'Buzz';
    }else{
      yield i;
    }    
    i++;
  }
}

// const generatorObject = fizzBuzzGenerator();
// console.log(generatorObject.next());
// console.log(generatorObject.next());

module.exports = fizzBuzzGenerator;
