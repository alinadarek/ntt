//curl -X POST -H "Content-Type: application/json" http://localhost:8080/library/test/function/t9/add -d '{"name": "t9","doc": "test fu nction","args": "","body": "function t8(msg) {console.log(msg);return msg}"}'
curl -X GET -H "Content-Type: application/json" http://localhost:8080/library/test/function/t9/get 
curl -X GET -H "Content-Type: application/json" http://localhost:8080/library/test/use
curl -X POST -H "Content-Type: application/json" http://localhost:8080/library/test/function/t9/run -d '{"args":"(\"lolo123\")"}'

