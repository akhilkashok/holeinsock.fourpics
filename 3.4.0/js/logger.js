function l(){
 var $logger=$("#logger");
var args = Array.prototype.slice.call(arguments, 0);
console.error.apply(console,args);
 $logger.append($("<li>").text(args.join(", ")));
}