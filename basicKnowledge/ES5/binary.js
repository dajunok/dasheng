/*二进制操作
  toString(2)     输出二进制字符数函数

  按位操作符
===============================================================================================
运算符         用法                                  描述
===============================================================================================
按位与         a & b              对于一个二进制数字，二者都为1时，结果为1，否则为0
----------------------------------------------------------------------------------------------
按位或         a | b              对于一个二进制数字，至少有一个为1时，结果为1，否则为0
----------------------------------------------------------------------------------------------
按位异或        a ^ b              对于一个二进制数字，有且只有一个为1时，结果为1，否则为0
----------------------------------------------------------------------------------------------
按位非         ~ a               翻转二进制数字，即0变成1，1变成0
----------------------------------------------------------------------------------------------
左移          a << b             将a的二进制形式向左移动b（<32）位，右边用0填充
----------------------------------------------------------------------------------------------
有符号右移     a >> b             将a的二进制表示向右移动b（<32）位，丢弃被移出的位
----------------------------------------------------------------------------------------------
无符号右移     a >>> b            将a的二进制表示向右移动b（<32）位，丢弃被移出的位，左边用0填充
----------------------------------------------------------------------------------------------
附：
  速判断某位是0还是1方法如下：
  N：待判断的二进制数
  B：待判断的位（右往左）
  (（N>>（B-1）)&1

*/

//1、将十进制数经转换输出二进制数
var a=(8).toString(2);    //=> 1000
var a=(-8).toString(2);   //=> -1000    
console.log(a);

//15====1111
var b=(15).toString(2); 
console.log(b);
b=(10>>>2&1).toString(2); //1010(BIN)===10(DEC)  判断二进制1010第3位是0还是1  
c=10>>>2
console.log(b);  //=> 0
console.log(c);  //=> 2

