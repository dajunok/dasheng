/*=====================日历计算========================*/
var date = new Date();   //获取当天日期
var year=date.getFullYear();   //计算当前年份
var month=date.getMonth();  //计算当前月份，注意这里的月是从0开始计数的。
var day=date.getDate();
var firstDay = new Date(year, month, 1);
console.log(`当前时间：${day}`);












/*

function init(year, month) {
      var date = new Date();
      //当前是哪一年
      var year = year ? year : date.getFullYear();
      //当前是哪个月，注意这里的月是从0开始计数的
      var month = month ? month - 1 : date.getMonth();
      console.log(year, month);
      let daysArr = [];

      //当前月的第一天的日期
      var firstDay = new Date(year, month, 1);
      //第一天是星期几
      var weekday = firstDay.getDay();

      //求当前月一共有多少天
      //new Date(year,month+1,0) ： month+1是下一个月，day为0代表的是上一个月的最后一天，即我们所需的当前月的最后一天。
      //getDate（）则返回这个日期对象是一个月中的第几天，我们由最后一天得知这个月一共有多少天
      var days = new Date(year, month + 1, 0).getDate();

      var res = "";
      let arr = [];
      //输出第一天之前的空格
      for (var i = 0; i < weekday; i++) {
        arr.push({
          currentMonth: false //是否当前月
        });
        if (arr.length == 7) {
          daysArr.push(arr);
          arr = [];
        }
      }

      for (var j = 1; j <= days; j++) {
        let date =
          year +
          "-" +
          (month + 1 < 10 ? "0" + (month + 1) : month + 1) +
          "-" +
          (j < 10 ? "0" + j : j);
        //返回当月今天之后（包含今天），有数据并且在售的日期

        arr.push({
          currentMonth: true, //是否当前月
          date: date, //年-月-日
          isRange: false, //入住-离店之间时间
          day: j,
          isStartDate: false,
          showName:
            new Date(date).valueOf() == new Date(this.currentdate).valueOf()
              ? "今天"
              : "",
          isEndDate: false,
          isToday:
            new Date(date).valueOf() == new Date(this.currentdate).valueOf(),
          isAfterToday:
            new Date(date).valueOf() >= new Date(this.currentdate).valueOf() //是否是今天之前包含今天
        });
        if (arr.length == 7) {
          daysArr.push(arr);
          arr = [];
        }
      }
      if (arr.length) {
        daysArr.push(arr);
      }
      return daysArr;
}

闰年 （历法中的名词） 编辑 讨论11
闰年是公历中的名词。闰年分为普通闰年和世纪闰年。
普通闰年:公历年份是4的倍数的，且不是100的倍数，为普通闰年。（如2004年就是闰年）；
世纪闰年:公历年份是整百数的，必须是400的倍数才是世纪闰年（如1900年不是世纪闰年，2000年是世纪闰年）；
闰年(Leap Year)是为了弥补因人为历法规定造成的年度天数与地球实际公转周期的时间差而设立的。补上时间差的年份为闰年。闰年共有366天（1-12月分别为31天，29天，31天，30天，31天，30天，31天，31天，30天，31天，30天，31天）。
凡阳历中有闰日（二月为二十九日）的年；闰余（岁余置闰。阴历每年与回归年相比所差的时日）；注意闰年（公历中名词）和闰月（农历中名词）并没有直接的关联，公历中只分闰年和平年，平年有365天，而闰年有366天（2月中多一天）；平年中也可能有闰月（如2017年是平年，农历有闰月，闰6月）。

*/
