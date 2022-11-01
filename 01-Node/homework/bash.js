const commands = require('./commands')

const print = function(output){  
  process.stdout.write(output);
  process.stdout.write('\nprompt > ');
}
// Output un prompt
process.stdout.write('prompt > ');
// El evento stdin 'data' se dispara cuando el user escribe una línea
process.stdin.on('data', function (data) {
  let args = data.toString().trim().split(" ")
  var cmd = args.shift();
  if (commands[cmd]) {
    commands[cmd](args, print);
  }else{
    print('cmd not found');
  }
});